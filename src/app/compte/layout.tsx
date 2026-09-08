import { requireAccess } from "@/lib/auth";
import { Workspace } from "@/components/account/Workspace";
import { buildMetadata } from "@/lib/seo";
export const metadata = buildMetadata({ title: "Mon compte", path: "/compte", noIndex: true });
export default async function Layout({ children }: { children: React.ReactNode }) { const { user } = await requireAccess(); return <Workspace user={user}>{children}</Workspace>; }
