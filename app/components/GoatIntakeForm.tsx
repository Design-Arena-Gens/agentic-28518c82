"use client";

import { useState } from "react";
import type { GoatPayload } from "@/lib/data-store";
import type { GoatSex } from "@/lib/types";

const INITIAL_STATE: GoatPayload = {
  name: "",
  sex: "Doe",
  breed: "Barbari",
  birthDate: "",
  rfid: "",
  microchip: "",
  nosePrintId: "",
  sireId: "",
  damId: ""
};

export default function GoatIntakeForm({
  onCreated
}: {
  onCreated?: (id: string) => void;
}) {
  const [formState, setFormState] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const updateField = (field: keyof GoatPayload, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/goats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState)
      });
      if (!response.ok) {
        throw new Error("Failed to register goat");
      }
      const goat = await response.json();
      setMessage(`Registered goat ${goat.name} (${goat.id}) successfully.`);
      setFormState(INITIAL_STATE);
      onCreated?.(goat.id);
    } catch (error) {
      console.error(error);
      setMessage("Failed to register goat. Please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <label>
          Goat Name
          <input
            required
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </label>
        <label>
          Sex
          <select
            value={formState.sex}
            onChange={(event) =>
              updateField("sex", event.target.value as GoatSex)
            }
          >
            <option value="Doe">Doe</option>
            <option value="Buck">Buck</option>
          </select>
        </label>
        <label>
          Breed
          <input
            required
            value={formState.breed}
            onChange={(event) => updateField("breed", event.target.value)}
            placeholder="Barbari, Jamunapari, Sirohi"
          />
        </label>
      </div>

      <div className="form__row">
        <label>
          Birth Date
          <input
            required
            type="date"
            value={formState.birthDate}
            onChange={(event) => updateField("birthDate", event.target.value)}
          />
        </label>
        <label>
          RFID
          <input
            required
            value={formState.rfid}
            onChange={(event) => updateField("rfid", event.target.value)}
            placeholder="RFID-xxxx"
          />
        </label>
        <label>
          Microchip
          <input
            required
            value={formState.microchip}
            onChange={(event) => updateField("microchip", event.target.value)}
            placeholder="MC-xxxxx"
          />
        </label>
      </div>

      <div className="form__row">
        <label>
          Nose Print ID
          <input
            required
            value={formState.nosePrintId}
            onChange={(event) => updateField("nosePrintId", event.target.value)}
          />
        </label>
        <label>
          Sire ID
          <input
            value={formState.sireId ?? ""}
            onChange={(event) => updateField("sireId", event.target.value)}
          />
        </label>
        <label>
          Dam ID
          <input
            value={formState.damId ?? ""}
            onChange={(event) => updateField("damId", event.target.value)}
          />
        </label>
      </div>

      <div className="split">
        <button className="button" type="submit" disabled={submitting}>
          {submitting ? "Registering..." : "Register New Goat"}
        </button>
        {message && <span className="panel__subtitle">{message}</span>}
      </div>
    </form>
  );
}
