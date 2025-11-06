import { NextResponse } from "next/server";
import { acknowledgeAlert, getDashboardSnapshot } from "@/lib/data-store";

export async function GET() {
  const snapshot = await getDashboardSnapshot();
  return NextResponse.json(snapshot.alerts);
}

export async function PATCH(request: Request) {
  try {
    const { alertId } = await request.json();
    if (!alertId) {
      return NextResponse.json(
        { error: "alertId is required" },
        { status: 400 }
      );
    }
    const alert = await acknowledgeAlert(alertId);
    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }
    return NextResponse.json(alert);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to acknowledge alert" },
      { status: 400 }
    );
  }
}
