"use client";

import { useState, useTransition } from "react";

interface WeatherWidgetProps {
  weather: {
    provider: string;
    updatedAt: string;
    data: {
      temperatureC: number;
      humidity: number;
      rainfallChance: number;
      advisory: string;
    };
  };
}

export default function WeatherWidget({ weather }: WeatherWidgetProps) {
  const [localWeather, setLocalWeather] = useState(weather);
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(async () => {
      try {
        const response = await fetch("/api/integrations/weather");
        const data = await response.json();
        setLocalWeather(data);
      } catch (error) {
        console.error("Unable to refresh weather", error);
      }
    });
  };

  return (
    <div className="panel">
      <div className="panel__header">
        <div>
          <h3>Weather Intelligence</h3>
          <p className="panel__subtitle">
            {localWeather.provider} • Updated {new Date(localWeather.updatedAt).toLocaleString("en-IN")}
          </p>
        </div>
        <button className="button button--ghost" onClick={refresh} disabled={isPending}>
          {isPending ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <div className="split">
        <div className="card">
          <h3>Temperature</h3>
          <p>{localWeather.data.temperatureC}°C</p>
        </div>
        <div className="card">
          <h3>Relative Humidity</h3>
          <p>{localWeather.data.humidity}%</p>
        </div>
        <div className="card">
          <h3>Rainfall Chance</h3>
          <p>{localWeather.data.rainfallChance}%</p>
        </div>
      </div>
      <p>{localWeather.data.advisory}</p>
    </div>
  );
}
