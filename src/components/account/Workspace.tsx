import Link from "next/link";
import { logout } from "@/app/connexion/actions";
import { homeFor } from "@/lib/auth";
import { roleLabels, type User } from "@/lib/workflow-schema";
import { WorkspaceNav } from "./WorkspaceNav";
export function Workspace({ user, children }: { user: User; children: React.ReactNode }) {
  return <div className="admin-area"><div className="admin-top"><div className="wrap"><Link href={homeFor(user)}>Mon espace <span>{user.name} · {roleLabels[user.role]}</span></Link><form action={logout}><button>Se déconnecter</button></form></div></div><div className="wrap"><WorkspaceNav role={user.role}/></div>{children}</div>;
}
