"use client";

import { useState, useTransition } from "react";
import type { AlertEvent } from "@/lib/types";

export default function AlertList({ alerts }: { alerts: AlertEvent[] }) {
  const [localAlerts, setLocalAlerts] = useState(alerts);
  const [isPending, startTransition] = useTransition();

  const acknowledge = (alertId: string) => {
    startTransition(async () => {
      setLocalAlerts((prev) =>
        prev.map((alert) =>
          alert.id === alertId ? { ...alert, acknowledged: true } : alert
        )
      );

      try {
        await fetch("/api/alerts", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ alertId })
        });
      } catch (error) {
        console.error("Failed to acknowledge alert", error);
      }
    });
  };

  return (
    <div className="list">
      {localAlerts.map((alert) => (
        <div key={alert.id} className="card">
          <div className="panel__header">
            <div className="panel__title">
              <span className={`chip ${chipClass(alert.severity)}`}>
                {alert.severity}
              </span>
              <span>{alert.channel.join(" • ")}</span>
            </div>
            <span className="panel__subtitle">{alert.timestamp}</span>
          </div>
          <p>{alert.message}</p>
          <div className="split">
            <span className="panel__subtitle">
              {alert.acknowledged ? "Acknowledged" : "Pending acknowledgement"}
            </span>
            {!alert.acknowledged && (
              <button
                className="button button--ghost"
                onClick={() => acknowledge(alert.id)}
                disabled={isPending}
              >
                Mark as acknowledged
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function chipClass(severity: AlertEvent["severity"]) {
  switch (severity) {
    case "Critical":
      return "chip chip--danger";
    case "Warning":
      return "chip chip--warning";
    default:
      return "chip chip--info";
  }
}
