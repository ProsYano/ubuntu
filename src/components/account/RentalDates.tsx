"use client";

import { useState } from "react";

export function RentalDates({ minimumDate }: { minimumDate?: string }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const invalidPeriod = Boolean(start && end && start > end);

  return <>
    <label>Début de location *<input name="start_date" type="date" required min={minimumDate} max={end || undefined} value={start} onChange={event => setStart(event.target.value)}/></label>
    <label>Fin de location *<input name="end_date" type="date" required min={start || minimumDate} value={end} onChange={event => setEnd(event.target.value)}/></label>
    {invalidPeriod && <p className="form-error" role="alert">La date de début doit être antérieure ou égale à la date de fin.</p>}
  </>;
}
