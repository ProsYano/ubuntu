"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export function AccountLink() {
  const pathname = usePathname();
  const [editor, setEditor] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const check = () => { fetch("/api/auth/status", { cache: "no-store", signal: controller.signal }).then(r => r.json()).then(data => setEditor(data.editor === true)).catch(() => {}); };
    check();
    window.addEventListener("focus", check);
    return () => { controller.abort(); window.removeEventListener("focus", check); };
  }, [pathname]);
  return <Link href={editor ? "/gestion/engins" : "/connexion"} className="account-link">{editor ? "Gérer les engins ↗" : "Connexion"}</Link>;
}
