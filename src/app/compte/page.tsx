import Link from "next/link";
import { requireAccess } from "@/lib/auth";
import { store } from "@/lib/server";
export default async function Page() {
  const { user } = await requireAccess(["client"]);
  const orders = store().orders(user.id), pending = store().orders(user.id, 1, "pending"), messages = store().conversations(user.id);
  return <section className="section"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">Votre espace client</span><h1>Bonjour {user.name}.</h1><p>Retrouvez vos locations et vos échanges avec notre équipe.</p></div><Link className="button" href="/compte/commandes/nouvelle">+ Demander une location</Link></div><div className="workspace-cards"><Link className="editor-panel" href="/compte/commandes"><strong>{orders.total}</strong><h2>Commandes</h2><p>Consulter mes demandes et leur historique ↗</p></Link><Link className="editor-panel" href="/compte/commandes?statut=pending"><strong>{pending.total}</strong><h2>En attente</h2><p>Demandes en cours d’étude ↗</p></Link><Link className="editor-panel" href="/compte/messages"><strong>{messages.total}</strong><h2>Conversations</h2><p>Lire les réponses de l’administration ↗</p></Link></div></div></section>;
}
