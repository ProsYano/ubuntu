"use client";
import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
export function RefreshMessages() {
  const router = useRouter();
  const [pending, start] = useTransition();
  useEffect(() => {
    const check = () => { if (document.visibilityState === "visible" && !document.querySelector("textarea:focus")) router.refresh(); };
    const timer = setInterval(check, 30000);
    window.addEventListener("focus", check);
    return () => { clearInterval(timer); window.removeEventListener("focus", check); };
  }, [router]);
  return <button className="button button-neutral" type="button" disabled={pending} onClick={() => start(() => router.refresh())}>{pending ? "Actualisation…" : "Actualiser"}</button>;
}
