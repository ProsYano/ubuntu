"use client";
import { useActionState, useState } from "react";
import { issueRecovery, updateUser } from "@/app/compte/actions";
import { ActionForm } from "./ActionForm";
import type { User } from "@/lib/workflow-schema";
import type { ActionState } from "@/lib/equipment-schema";
export function UserControls({ user }: { user: User }) {
  const [state, action, pending] = useActionState<ActionState & { recoveryPath?: string }, FormData>(issueRecovery, {});
  const [copied, setCopied] = useState(false);
  return <><ActionForm key={`${user.role}-${user.active}`} action={updateUser} label="Enregistrer les accès"><input type="hidden" name="id" value={user.id}/><label>Rôle<select name="role" defaultValue={user.role}><option value="client">Client</option><option value="agent">Agent — gestion des engins</option></select></label><label className="checkbox-label"><input type="checkbox" name="active" defaultChecked={Boolean(user.active)}/>Compte actif</label><small>Une modification déconnecte toutes les sessions de ce compte.</small></ActionForm><details className="recovery-control"><summary>Récupération du compte</summary><form action={action} className="admin-form"><input type="hidden" name="id" value={user.id}/><label className="checkbox-label"><input type="checkbox" name="verified" required/>J’ai vérifié l’identité du titulaire.</label><button className="button button-neutral" disabled={pending || !user.active}>{pending ? "Création…" : "Créer un lien de récupération"}</button>{state.error && <p className="form-error" role="alert">{state.error}</p>}{state.success && <p className="form-success" role="status">{state.success}</p>}{state.recoveryPath && <><a className="recovery-link" href={state.recoveryPath}>Lien de récupération personnel</a><button type="button" className="button button-neutral" onClick={async () => { try { await navigator.clipboard.writeText(new URL(state.recoveryPath!, window.location.origin).href); setCopied(true); } catch { setCopied(false); } }}>{copied ? "Lien copié" : "Copier le lien"}</button></>}</form></details></>;
}
