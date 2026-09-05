import Link from "next/link";
import { requireEditor } from "@/lib/auth";
import { logout } from "@/app/connexion/actions";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({title: "Gestion du catalogue", path: "/gestion", noIndex: true});
export default async function Layout({children}: {children: React.ReactNode}) {
  await requireEditor();
  return <div className="admin-area"><div className="admin-top"><div className="wrap"><Link href="/gestion/engins">Espace de gestion <span>Ubuntu Location BTP</span></Link><form action={logout}><button type="submit">Se déconnecter ↗</button></form></div></div>{children}</div>;
}
