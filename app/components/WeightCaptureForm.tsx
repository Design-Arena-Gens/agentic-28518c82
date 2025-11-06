"use client";

import { useState } from "react";
import type { GoatIdentity } from "@/lib/types";

interface WeightCaptureFormProps {
  goats: GoatIdentity[];
  onRecorded?: () => void;
}

export default function WeightCaptureForm({
  goats,
  onRecorded
}: WeightCaptureFormProps) {
  const [goatId, setGoatId] = useState(goats[0]?.id ?? "");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/weights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goatId,
          weightKg: Number(weight),
          date
        })
      });
      if (!response.ok) {
        throw new Error("Failed to record weight");
      }
      setMessage("Weight recorded successfully.");
      setWeight("");
      onRecorded?.();
    } catch (error) {
      console.error(error);
      setMessage("Unable to record weight. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label>
          Goat
          <select value={goatId} onChange={(event) => setGoatId(event.target.value)}>
            {goats.map((goat) => (
              <option key={goat.id} value={goat.id}>
                {goat.name} ({goat.id})
              </option>
            ))}
          </select>
        </label>
        <label>
          Weight (kg)
          <input
            required
            type="number"
            step="0.1"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          />
        </label>
        <label>
          Date
          <input
            required
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </label>
      </div>
      <div className="split">
        <button className="button button--ghost" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Log Weight"}
        </button>
        {message && <span className="panel__subtitle">{message}</span>}
      </div>
    </form>
  );
}
