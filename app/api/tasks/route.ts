import { NextResponse } from "next/server";
import { getDashboardSnapshot, updateTaskStatus } from "@/lib/data-store";

export async function GET() {
  const snapshot = await getDashboardSnapshot();
  return NextResponse.json(snapshot.tasks);
}

export async function PATCH(request: Request) {
  try {
    const { taskId, status } = await request.json();
    if (!taskId || !status) {
      return NextResponse.json(
        { error: "Task ID and status are required" },
        { status: 400 }
      );
    }
    const task = await updateTaskStatus(taskId, status);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update task" },
      { status: 400 }
    );
  }
}
