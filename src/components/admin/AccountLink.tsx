"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
export function AccountLink() {
  const pathname = usePathname();
  const [access, setAccess] = useState({ connected: false, href: "/connexion" });
  useEffect(() => {
    const controller = new AbortController();
    const check = () => { fetch("/api/auth/status", { cache: "no-store", signal: controller.signal }).then(r => r.json()).then(data => setAccess({ connected: data.connected === true, href: ["/compte", "/gestion/engins", "/gestion/commandes"].includes(data.href) ? data.href : "/connexion" })).catch(() => {}); };
    check(); window.addEventListener("focus", check);
    return () => { controller.abort(); window.removeEventListener("focus", check); };
  }, [pathname]);
  return <Link href={access.href} className="account-link">{access.connected ? "Mon espace ↗" : "Connexion"}</Link>;
}
