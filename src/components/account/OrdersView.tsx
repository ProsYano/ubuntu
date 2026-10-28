import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/auth";
import { store } from "@/lib/server";
import { orderLabels, orderStatuses, transitions, displayDate, pageNumber, type Role } from "@/lib/workflow-schema";
import { formatRate } from "@/lib/equipment-schema";
import { updateOrder } from "@/app/compte/actions";
import { ActionForm } from "./ActionForm";
import { PublicQuoteDetail } from "./PublicQuoteDetail";
import { Pagination } from "./Pagination";
export async function OrdersView({ role, searchParams }: { role: Role; searchParams: Promise<{ page?: string; statut?: string }> }) {
  const { user } = await requireAccess([role]);
  const params = await searchParams, page = pageNumber(params.page);
  const { items, total } = role === "admin" ? store().rentalRequests(user.id, page, params.statut) : store().orders(user.id, page, params.statut);
  const base = role === "admin" ? "/gestion/commandes" : "/compte/commandes";
  return <section className="section"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">Locations</span><h1>{role === "admin" ? "Les demandes de location" : "Mes commandes"}</h1><p>{total} demande{total === 1 ? "" : "s"}</p></div>{role === "client" && <Link className="button" href="/compte/commandes/nouvelle">+ Demander une location</Link>}</div><nav className="admin-tabs" aria-label="Filtrer les commandes"><Link href={base} aria-current={!params.statut ? "page" : undefined}>Toutes</Link>{orderStatuses.map(status => <Link key={status} href={`${base}?statut=${status}`} aria-current={params.statut === status ? "page" : undefined}>{orderLabels[status]}</Link>)}</nav>{items.length ? <div className="workspace-list">{items.map(order => <Link className="editor-panel workspace-list-row" key={order.id} href={`${base}/${order.id}`}><div><span className={`status-badge order-${order.status}`}>{orderLabels[order.status]}</span><h2>{order.equipment_name}</h2><p>Du {displayDate(order.start_date)} au {displayDate(order.end_date)} · Chantier : {order.location}</p>{role === "admin" && <><p><strong>Contact :</strong> {order.client_name} · {order.client_email}</p><p><strong>Entreprise :</strong> {order.company || "Non renseignée"} · {"source" in order && order.source === "public" ? "Sans compte" : "Compte client"}</p></>}<small>Réf. {order.id.slice(0, 8).toUpperCase()} · Déposée le {displayDate(order.created_at)}</small></div><span>Consulter la demande</span></Link>)}</div> : <div className="admin-empty"><h2>Aucune commande dans cette vue.</h2><p>Les nouvelles demandes apparaîtront ici.</p></div>}<Pagination page={page} total={total} base={`${base}?statut=${encodeURIComponent(params.statut ?? "")}`}/></div></section>;
}
export async function OrderDetail({ role, params }: { role: Role; params: Promise<{ id: string }> }) {
  const { user } = await requireAccess([role]);
  const { id } = await params, order = store().order(user.id, id);
  if (!order) {
    if (role === "admin") {
      const quote = store().publicQuote(user.id, id);
      if (quote) return <PublicQuoteDetail quote={quote} events={store().publicQuoteEvents(user.id, id)}/>;
    }
    notFound();
  }
  const events = store().orderEvents(user.id, id), thread = store().orderConversation(user.id, id);
  const base = role === "admin" ? "/gestion" : "/compte";
  const options = role === "admin" ? transitions[order.status] : order.status === "pending" ? ["cancelled" as const] : [];
  return <section className="section"><div className="wrap"><Link className="text-link" href={`${base}/commandes`}>← Toutes les commandes</Link><div className="editor-heading"><span className="eyebrow">Commande {order.id.slice(0, 8).toUpperCase()}</span><h1>{order.equipment_name}</h1><span className={`status-badge order-${order.status}`}>{orderLabels[order.status]}</span></div><div className="workspace-detail"><div><article className="editor-panel"><h2>La demande de location</h2><dl className="workspace-facts"><div><dt>Client</dt><dd>{order.client_name}<br/>{order.client_email}</dd></div><div><dt>Période</dt><dd>Du {displayDate(order.start_date)} au {displayDate(order.end_date)}</dd></div><div><dt>Chantier</dt><dd>{order.location}</dd></div><div><dt>Téléphone</dt><dd>{order.phone}</dd></div><div><dt>Entreprise</dt><dd>{order.company || "Non renseignée"}</dd></div><div><dt>Tarif journalier au dépôt</dt><dd>{formatRate(order.daily_rate) ?? "Sur devis"}</dd></div></dl><h3>Besoin exprimé</h3><p className="preserve-lines">{order.notes}</p><p><small>Le tarif affiché est indicatif. Le devis final précise les prestations et les conditions de location.</small></p>{order.admin_note && <><h3>Réponse de l’administration</h3><p className="preserve-lines">{order.admin_note}</p></>}</article><article className="editor-panel"><h2>Historique</h2><ol className="order-history">{events.map(event => <li key={event.id}><strong>{orderLabels[event.status]}</strong><span>{displayDate(event.created_at)} · {event.actor_name}</span>{event.note && <p className="preserve-lines">{event.note}</p>}</li>)}</ol></article></div><aside><section className="editor-panel"><h2>Échanger sur cette commande</h2><p>Les messages restent accessibles dans votre espace.</p><Link className="button" href={`${base}/messages/${thread}`}>Ouvrir la conversation</Link></section>{options.length > 0 && <section className="editor-panel"><h2>{role === "admin" ? "Traiter la commande" : "Annuler ma demande"}</h2>{role === "client" && <p>Vous pouvez annuler une demande en attente. Pour une location déjà acceptée, contactez l’administration.</p>}<ActionForm key={order.version} action={updateOrder} label={role === "admin" ? "Enregistrer le statut" : "Confirmer l’annulation"}><input type="hidden" name="id" value={id}/><input type="hidden" name="version" value={order.version}/>{role === "admin" ? <label>Nouveau statut<select name="status">{options.map(status => <option key={status} value={status}>{orderLabels[status]}</option>)}</select></label> : <input type="hidden" name="status" value="cancelled"/>}<label>{role === "admin" ? "Commentaire visible par le client" : "Motif (facultatif)"}<textarea name="note" maxLength={2000} rows={4}/>{role === "admin" && <small>Obligatoire pour un refus ou une annulation.</small>}</label></ActionForm></section>}</aside></div></div></section>;
}
