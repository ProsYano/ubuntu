"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Role } from "@/lib/workflow-schema";

export function WorkspaceNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const links = role === "agent"
    ? [["/gestion/engins", "Catalogue"]]
    : role === "admin"
      ? [["/gestion/engins", "Catalogue"], ["/gestion/commandes", "Commandes"], ["/gestion/messages", "Messages"], ["/gestion/utilisateurs", "Utilisateurs"]]
      : [["/compte", "Vue d’ensemble"], ["/compte/commandes", "Mes commandes"], ["/compte/messages", "Mes messages"]];
  return <nav className="admin-tabs workspace-nav" aria-label="Navigation de votre espace">
    {[...links, ["/compte/mot-de-passe", "Mot de passe"], ["/equipments", "Voir les engins"]].map(([href, label]) => {
      const active = pathname === href || (href !== "/compte" && pathname.startsWith(`${href}/`));
      return <Link key={href} href={href} aria-current={active ? "page" : undefined}>{label}</Link>;
    })}
  </nav>;
}
