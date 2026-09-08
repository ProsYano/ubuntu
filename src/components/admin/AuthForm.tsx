"use client";
import { useActionState, useState } from "react";
import Link from "next/link";
import { login, register, changePassword, recoverPassword } from "@/app/connexion/actions";
import type { ActionState } from "@/lib/equipment-schema";
export function AuthForm({ mode = "login", token = "", next = "/compte" }: { mode?: "login" | "register" | "password" | "recovery"; token?: string; next?: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(mode === "register" ? register : mode === "password" ? changePassword : mode === "recovery" ? recoverPassword : login, {});
  const [visible, setVisible] = useState(false);
  const newPassword = mode !== "login";
  return <form action={action} className="admin-form">
    <input type="hidden" name="next" value={next}/>
    {mode === "recovery" && <input type="hidden" name="token" value={token}/>}
    {mode === "register" && <label>Nom et prénom<input name="name" autoComplete="name" required minLength={2} maxLength={120}/></label>}
    {(mode === "login" || mode === "register") && <label>Adresse e-mail<input type="email" name="email" autoComplete="email" required maxLength={254}/></label>}
    {mode === "password" && <label>Mot de passe actuel<input type="password" name="current_password" autoComplete="current-password" required maxLength={128}/></label>}
    <label>{newPassword ? "Nouveau mot de passe" : "Mot de passe"}<div className="password-field"><input type={visible ? "text" : "password"} name="password" autoComplete={newPassword ? "new-password" : "current-password"} required minLength={newPassword ? 12 : 1} maxLength={128}/><button type="button" onClick={() => setVisible(!visible)} aria-pressed={visible}>{visible ? "Masquer" : "Afficher"}</button></div></label>
    {newPassword && <label>Confirmer le mot de passe<input type="password" name="confirmation" autoComplete="new-password" required minLength={12} maxLength={128}/><small>Entre 12 et 128 caractères.</small></label>}
    {state.error && <p className="form-error" role="alert">{state.error}</p>}
    {state.success && <p className="form-success" role="status">{state.success}</p>}
    <button className="button" disabled={pending}>{pending ? "Veuillez patienter…" : mode === "login" ? "Se connecter ↗" : mode === "register" ? "Créer mon compte client ↗" : "Enregistrer mon mot de passe"}</button>
    {mode === "login" && <><Link href="/mot-de-passe-oublie">Mot de passe oublié ?</Link><Link className="text-link" href={`/inscription?next=${encodeURIComponent(next)}`}>Créer un compte client ↗</Link></>}
    {(mode === "register" || mode === "recovery") && <Link href={`/connexion?next=${encodeURIComponent(next)}`}>Retour à la connexion</Link>}
  </form>;
}
