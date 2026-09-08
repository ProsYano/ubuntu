import { redirect } from "next/navigation";
import { requireAccess, homeFor } from "@/lib/auth";
export default async function Page() { const { user } = await requireAccess(["agent", "admin"]); redirect(homeFor(user)); }
