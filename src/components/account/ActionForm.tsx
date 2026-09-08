"use client";
import { useActionState } from "react";
import type { ActionState } from "@/lib/equipment-schema";
export function ActionForm({ action, children, label, className = "admin-form" }: { action: (state: ActionState, form: FormData) => Promise<ActionState>; children: React.ReactNode; label: string; className?: string }) {
  const [state, submit, pending] = useActionState(action, {});
  return <form action={submit} className={className}><fieldset disabled={pending}>{children}</fieldset>{state.error && <p role="alert" className="form-error">{state.error}</p>}{state.fields && <ul className="field-error">{Object.entries(state.fields).flatMap(([field, errors]) => errors?.map((error, index) => <li key={`${field}-${index}`}>{error}</li>) ?? [])}</ul>}{state.success && <p role="status" className="form-success">{state.success}</p>}<button className="button" disabled={pending}>{pending ? "Enregistrement…" : label}</button></form>;
}
