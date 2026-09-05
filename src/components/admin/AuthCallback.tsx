"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserAuthClient } from "@/lib/supabase/browser";
export function AuthCallback() {
  const router = useRouter();
  const [error,setError] = useState(false);
  const task = useRef<Promise<boolean> | null>(null);
  useEffect(() => {
    let active = true;
    if (!task.current) {
      const query = new URLSearchParams(window.location.search);
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const code = query.get("code");
      const access = fragment.get("access_token");
      const refresh = fragment.get("refresh_token");
      window.history.replaceState(null,"","/auth/callback");
      task.current = (async () => {
        const supabase = createBrowserAuthClient();
        if (code) { const result = await supabase.auth.exchangeCodeForSession(code); return !result.error; }
        if (access && refresh) { const result = await supabase.auth.setSession({access_token:access,refresh_token:refresh}); return !result.error; }
        return false;
      })().catch(() => false);
    }
    task.current.then(ok => { if (!active) return; if (ok) {router.replace("/compte/mot-de-passe"); router.refresh();} else setError(true); });
    return () => {active = false;};
  },[router]);
  return error ? <><p className="form-error" role="alert">Ce lien est invalide, a expiré ou a été ouvert dans un autre navigateur.</p><Link className="button" href="/mot-de-passe-oublie">Demander un nouveau lien</Link></> : <p role="status">Vérification de votre lien sécurisé…</p>;
}
