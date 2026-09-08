import Link from "next/link";
import { logout } from "@/app/connexion/actions";
import { homeFor } from "@/lib/auth";
import { roleLabels, type User } from "@/lib/workflow-schema";
export function Workspace({ user, children }: { user: User; children: React.ReactNode }) {
  const links = user.role === "agent" ? [["/gestion/engins", "Catalogue"]] : user.role === "admin" ? [["/gestion/commandes", "Commandes"], ["/gestion/messages", "Messages"], ["/gestion/utilisateurs", "Utilisateurs"]] : [["/compte", "Vue d’ensemble"], ["/compte/commandes", "Mes commandes"], ["/compte/messages", "Mes messages"]];
  return <div className="admin-area"><div className="admin-top"><div className="wrap"><Link href={homeFor(user)}>Mon espace <span>{user.name} · {roleLabels[user.role]}</span></Link><form action={logout}><button>Se déconnecter ↗</button></form></div></div><div className="wrap"><nav className="admin-tabs workspace-nav" aria-label="Navigation de votre espace">{links.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}<Link href="/compte/mot-de-passe">Mot de passe</Link><Link href="/equipments">Voir les engins ↗</Link></nav></div>{children}</div>;
}
