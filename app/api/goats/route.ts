import { NextResponse } from "next/server";
import { addGoat, getDashboardSnapshot } from "@/lib/data-store";

export async function GET() {
  const snapshot = await getDashboardSnapshot();
  return NextResponse.json(snapshot.goats);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const goat = await addGoat(payload);
    return NextResponse.json(goat, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to register goat" },
      { status: 400 }
    );
  }
}
