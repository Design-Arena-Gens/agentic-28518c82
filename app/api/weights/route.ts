import { NextResponse } from "next/server";
import { getDashboardSnapshot, recordWeight } from "@/lib/data-store";

export async function GET() {
  const snapshot = await getDashboardSnapshot();
  return NextResponse.json(snapshot.weightRecords);
}

export async function POST(request: Request) {
  try {
    const { goatId, weightKg, date } = await request.json();
    if (!goatId || !weightKg || !date) {
      return NextResponse.json(
        { error: "Missing weight payload" },
        { status: 400 }
      );
    }
    const record = await recordWeight(goatId, Number(weightKg), date);
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to record weight" },
      { status: 400 }
    );
  }
}
