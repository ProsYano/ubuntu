"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { login, resetPassword, changePassword } from "@/app/connexion/actions";
import type { ActionState } from "@/lib/equipment-schema";

export function AuthForm({ mode = "login", configured = true }: { mode?: "login" | "reset" | "password"; configured?: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(mode === "reset" ? resetPassword : mode === "password" ? changePassword : login, {});
  const [visible, setVisible] = useState(false);
  return <form action={action} className="admin-form">
    {mode !== "password" && <label>Adresse e-mail<input type="email" name="email" autoComplete="email" required maxLength={254} placeholder="vous@entreprise.com" /></label>}
    {mode !== "reset" && <label>{mode === "password" ? "Nouveau mot de passe" : "Mot de passe"}<div className="password-field"><input type={visible ? "text" : "password"} name="password" autoComplete={mode === "password" ? "new-password" : "current-password"} required minLength={mode === "password" ? 12 : 1} maxLength={128} /><button type="button" onClick={() => setVisible(!visible)} aria-pressed={visible}>{visible ? "Masquer" : "Afficher"}</button></div></label>}
    {mode === "password" && <label>Confirmer le mot de passe<input type="password" name="confirmation" autoComplete="new-password" required minLength={12} maxLength={128} /><small>Au moins 12 caractères.</small></label>}
    {mode === "login" && <Link href="/mot-de-passe-oublie" className="auth-forgot">Mot de passe oublié ?</Link>}
    {!configured && <p className="form-notice">L’espace de gestion est en cours d’activation. Contactez l’administrateur pour obtenir un accès.</p>}
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    {state.success && <p className="form-success" role="status">{state.success}</p>}
    <button className="button" disabled={pending || !configured}>{pending ? "Veuillez patienter…" : mode === "reset" ? "Recevoir un lien" : mode === "password" ? "Enregistrer mon mot de passe" : "Se connecter ↗"}</button>
    {mode === "password" && state.success && <Link className="text-link" href="/gestion/engins">Accéder à mon espace ↗</Link>}
  </form>;
}
