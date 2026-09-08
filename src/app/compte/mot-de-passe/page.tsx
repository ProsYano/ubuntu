import { AuthForm } from "@/components/admin/AuthForm";
import { requireAccess } from "@/lib/auth";
export default async function Page() { await requireAccess(); return <section className="section"><div className="auth-single"><h1>Changer mon mot de passe</h1><AuthForm mode="password"/></div></section>; }
