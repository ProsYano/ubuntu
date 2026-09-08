import { randomUUID } from "node:crypto";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAccess } from "@/lib/auth";
import { store } from "@/lib/server";
import { displayDate, pageNumber, type Role } from "@/lib/workflow-schema";
import { closeConversation } from "@/app/compte/actions";
import { ActionForm } from "./ActionForm";
import { Pagination } from "./Pagination";
import { MessageComposer } from "./MessageComposer";
import { ReadMessages } from "./ReadMessages";
import { RefreshMessages } from "./RefreshMessages";
export async function MessagesView({ role, searchParams }: { role: Role; searchParams: Promise<{ page?: string }> }) {
  const { user } = await requireAccess([role]);
  const page = pageNumber((await searchParams).page), { items, total } = store().conversations(user.id, page);
  const base = role === "admin" ? "/gestion/messages" : "/compte/messages";
  return <section className="section"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">À votre écoute</span><h1>{role === "admin" ? "Messages des clients" : "Mes messages"}</h1><p>{total} conversation{total === 1 ? "" : "s"} · Actualisation toutes les 30 secondes.</p></div><div className="actions"><RefreshMessages/>{role === "client" && <Link className="button" href="/compte/messages/nouveau">+ Nouveau message</Link>}</div></div>{items.length ? <div className="workspace-list">{items.map(thread => <Link className="editor-panel workspace-list-row" key={thread.id} href={`${base}/${thread.id}`}><div><span className="status-badge">{thread.closed ? "Fermée" : "Ouverte"}</span>{thread.unread > 0 && <span className="status-badge unread">{thread.unread} non lu{thread.unread > 1 ? "s" : ""}</span>}<h2>{thread.subject}</h2>{role === "admin" && <p>{thread.client_name}</p>}<small>Dernière activité le {displayDate(thread.updated_at)}</small></div><span>Lire ↗</span></Link>)}</div> : <div className="admin-empty"><h2>Aucune conversation pour le moment.</h2><p>Vos échanges avec {role === "admin" ? "les clients" : "l’administration"} apparaîtront ici.</p></div>}<Pagination page={page} total={total} base={base}/></div></section>;
}
export async function MessageDetail({ role, params, searchParams }: { role: Role; params: Promise<{ id: string }>; searchParams: Promise<{ page?: string }> }) {
  const { user } = await requireAccess([role]);
  const { id } = await params, thread = store().conversation(user.id, id);
  if (!thread) notFound();
  const page = pageNumber((await searchParams).page), messages = store().messages(user.id, id, page);
  const base = role === "admin" ? "/gestion" : "/compte";
  const unread = messages.items.filter(message => !message.read_at && (role === "admin" ? message.sender_id === thread.user_id : message.sender_role === "admin"));
  return <section className="section"><div className="wrap workspace-narrow"><Link className="text-link" href={`${base}/messages`}>← Toutes les conversations</Link><div className="section-heading"><div><span className="eyebrow">{thread.closed ? "Conversation fermée" : "Conversation ouverte"}</span><h1>{thread.subject}</h1>{role === "admin" && <p>{thread.client_name}</p>}</div><RefreshMessages/></div>{thread.order_id && <p><Link className="text-link" href={`${base}/commandes/${thread.order_id}`}>Consulter la commande associée ↗</Link></p>}<div className="message-thread">{messages.items.length ? [...messages.items].reverse().map(message => <article key={message.id} className={`message-bubble ${message.sender_id === user.id ? "own" : ""}`}><div><strong>{message.sender_name}{message.sender_role === "admin" ? " · Administration" : ""}</strong><small>{new Date(message.created_at).toLocaleString("fr-FR", { timeZone: "Africa/Brazzaville" })}</small></div><p className="preserve-lines">{message.body}</p>{message.sender_id === user.id && <small>{message.read_at ? "Lu" : "Envoyé"}</small>}</article>) : <div className="admin-empty"><p>Posez votre question dans cette conversation.</p></div>}</div>{unread.length > 0 && <ReadMessages id={id} from={Math.min(...messages.items.map(message => message.id))} through={Math.max(...unread.map(message => message.id))}/>}<Pagination page={page} total={messages.total} base={`${base}/messages/${id}`}/>{page > 1 && <p>Vous consultez les messages précédents. <Link href={`${base}/messages/${id}`}>Voir les plus récents ↗</Link></p>}{thread.closed ? <p className="form-notice">Cette conversation a été fermée par l’administration.{role === "client" && <> Vous pouvez <Link href="/compte/messages/nouveau">ouvrir une nouvelle conversation</Link>.</>}</p> : <section className="editor-panel"><h2>{role === "admin" ? "Répondre au client" : "Écrire à l’administration"}</h2><MessageComposer id={id} requestKey={randomUUID()}/></section>}{role === "admin" && <section className="editor-panel"><ActionForm key={thread.version} action={closeConversation} label={thread.closed ? "Rouvrir la conversation" : "Fermer la conversation"}><input type="hidden" name="id" value={id}/><input type="hidden" name="version" value={thread.version}/><input type="hidden" name="closed" value={thread.closed ? "0" : "1"}/><p>Une conversation fermée reste consultable, mais ne reçoit plus de messages.</p></ActionForm></section>}</div></section>;
}
