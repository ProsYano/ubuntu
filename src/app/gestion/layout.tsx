import { requireAccess } from "@/lib/auth";
import { Workspace } from "@/components/account/Workspace";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Gestion", path: "/gestion", noIndex: true });
export default async function Layout({ children }: { children: React.ReactNode }) { const { user } = await requireAccess(["agent", "admin"]); return <Workspace user={user}>{children}</Workspace>; }
