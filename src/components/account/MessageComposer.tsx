"use client";
import { useActionState, useEffect, useRef } from "react";
import { sendMessage } from "@/app/compte/actions";
export function MessageComposer({ id, requestKey }: { id: string; requestKey: string }) {
  const [state, action, pending] = useActionState(sendMessage, {});
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state.success) form.current?.reset(); }, [state]);
  return <form ref={form} action={action} className="admin-form"><input type="hidden" name="id" value={id}/><input type="hidden" name="request_key" value={requestKey}/><label>Votre message<textarea name="body" required minLength={1} maxLength={4000} rows={5}/></label>{state.error && <p className="form-error" role="alert">{state.error}</p>}{state.success && <p className="form-success" role="status">{state.success}</p>}<button className="button" disabled={pending}>{pending ? "Envoi…" : "Envoyer le message ↗"}</button></form>;
}
