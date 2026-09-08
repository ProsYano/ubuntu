import { randomUUID } from "node:crypto";
import Link from "next/link";
import { requireAccess } from "@/lib/auth";
import { createConversation } from "@/app/compte/actions";
import { ActionForm } from "@/components/account/ActionForm";
export default async function Page() {
  await requireAccess(["client"]);
  return <section className="section"><div className="wrap workspace-narrow"><Link className="text-link" href="/compte/messages">← Mes messages</Link><div className="editor-heading"><h1>Écrire à l’administration</h1><p>Pour une commande existante, utilisez de préférence sa conversation dédiée.</p></div><div className="editor-panel"><ActionForm action={createConversation} label="Envoyer mon message ↗"><input type="hidden" name="request_key" value={randomUUID()}/><label>Sujet<input name="subject" required minLength={3} maxLength={160}/></label><label>Votre message<textarea name="body" required minLength={1} maxLength={4000} rows={6}/></label></ActionForm></div></div></section>;
}
