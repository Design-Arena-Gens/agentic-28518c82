import { NextResponse } from "next/server";
import { refreshWeather } from "@/lib/data-store";

const SITAMARHI_COORDS = { latitude: 26.595, longitude: 85.493 };

export async function GET() {
  try {
    const url = new URL("https://api.open-meteo.com/v1/forecast");
    url.searchParams.set("latitude", SITAMARHI_COORDS.latitude.toString());
    url.searchParams.set("longitude", SITAMARHI_COORDS.longitude.toString());
    url.searchParams.set("current_weather", "true");
    url.searchParams.set("hourly", "relativehumidity_2m,precipitation_probability");

    const response = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!response.ok) {
      throw new Error("Weather API error");
    }
    const data = await response.json();

    const temp = data.current_weather?.temperature ?? 31;
    const humidity =
      data.hourly?.relativehumidity_2m?.[0] ?? data.current_weather?.relativehumidity_2m ?? 70;
    const rainfallChance =
      data.hourly?.precipitation_probability?.[0] ?? 45;

    const advisory =
      rainfallChance > 60
        ? "High rainfall chance — shift herd to elevated paddocks and inspect drainage."
        : humidity > 70
        ? "Humid conditions — enhance ventilation and monitor for PPR stress."
        : "Weather stable — maintain current grazing rotation.";

    const payload = await refreshWeather({
      temperatureC: temp,
      humidity,
      rainfallChance,
      advisory
    });

    return NextResponse.json(payload);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to refresh weather" },
      { status: 502 }
    );
  }
}
