"use client";

import { useState, useTransition } from "react";
import type { FarmTask } from "@/lib/types";

const STATUS_OPTIONS: FarmTask["status"][] = [
  "Pending",
  "In Progress",
  "Completed",
  "Overdue"
];

export default function TaskBoard({ tasks }: { tasks: FarmTask[] }) {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (taskId: string, status: FarmTask["status"]) => {
    startTransition(async () => {
      setLocalTasks((prev) =>
        prev.map((task) => (task.id === taskId ? { ...task, status } : task))
      );

      try {
        await fetch("/api/tasks", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskId, status })
        });
      } catch (error) {
        console.error("Failed to update task", error);
      }
    });
  };

  return (
    <div className="list">
      {localTasks.map((task) => (
        <div key={task.id} className="card">
          <div className="panel__header">
            <div>
              <h3>{task.title}</h3>
              <p className="panel__subtitle">{task.description}</p>
            </div>
            <span className={`chip ${chipClass(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          <div className="split">
            <div>
              <p className="panel__subtitle">Assigned To</p>
              <strong>{task.assignedTo}</strong>
              <p className="panel__subtitle">{task.role}</p>
            </div>
            <div>
              <p className="panel__subtitle">Due</p>
              <strong>{task.dueDate}</strong>
              <p className="panel__subtitle">Source: {task.source}</p>
            </div>
            <div>
              <label htmlFor={`status-${task.id}`} className="panel__subtitle">
                Status
              </label>
              <select
                id={`status-${task.id}`}
                value={task.status}
                onChange={(event) =>
                  handleStatusChange(task.id, event.target.value as FarmTask["status"])
                }
                disabled={isPending}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function chipClass(priority: FarmTask["priority"]) {
  switch (priority) {
    case "High":
      return "chip chip--danger";
    case "Medium":
      return "chip chip--warning";
    default:
      return "chip chip--info";
  }
}
