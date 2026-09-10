"use client";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { AccountLink } from "@/components/admin/AccountLink";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE, phoneHref } from "@/lib/constants";
const links = [["/", "Accueil"], ["/about", "L’entreprise"], ["/equipments", "Nos engins"], ["/services", "Services"], ["/faq", "Questions fréquentes"]];
export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="topbar"><div className="wrap"><span>Brazzaville · République du Congo</span><div className="topbar-links"><AccountLink/><a href={phoneHref(SITE.phones[0])}>{SITE.phones[0]}</a></div></div></div><div className="wrap nav-row"><Link href="/" className="brand" aria-label="Ubuntu Location BTP — Accueil"><BrandLogo preload /></Link><button className="menu-button" aria-expanded={open} aria-controls="navigation" onClick={() => setOpen(!open)}>{open ? "Fermer ✕" : "Menu ☰"}</button><nav id="navigation" aria-label="Navigation principale" className={open ? "navigation is-open" : "navigation"}>{links.map(([url, name]) => <Link key={url} href={url} aria-current={pathname === url ? "page" : undefined} onClick={() => setOpen(false)}>{name}</Link>)}<Link href="/contact" className="button" onClick={() => setOpen(false)}>Demander un devis <span aria-hidden="true">↗</span></Link></nav></div></header>;
}
