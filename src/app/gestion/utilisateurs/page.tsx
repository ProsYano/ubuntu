import { requireAccess } from "@/lib/auth";
import { store } from "@/lib/server";
import { pageNumber, roleLabels } from "@/lib/workflow-schema";
import { UserControls } from "@/components/account/UserControls";
import { Pagination } from "@/components/account/Pagination";
export default async function Page({ searchParams }: { searchParams: Promise<{ page?: string; q?: string }> }) {
  const { user } = await requireAccess(["admin"]);
  const params = await searchParams, page = pageNumber(params.page), query = (params.q ?? "").slice(0, 120);
  const { items, total } = store().users(user.id, page, query);
  return <section className="section"><div className="wrap"><div className="editor-heading"><span className="eyebrow">Administration</span><h1>Utilisateurs et agents</h1><p>Les inscriptions créent des comptes clients. Attribuez le rôle agent aux membres autorisés à gérer les engins.</p></div><form className="admin-form user-search" method="get"><label>Rechercher un nom ou un e-mail<input name="q" defaultValue={query} maxLength={120}/></label><button className="button">Rechercher</button></form><p>{total} compte{total === 1 ? "" : "s"}</p><div className="user-grid">{items.map(item => <article className="editor-panel" key={item.id}><span className="status-badge">{roleLabels[item.role]} · {item.active ? "Actif" : "Suspendu"}</span><h2>{item.name}</h2><p className="user-email">{item.email}</p>{item.role === "admin" ? <p>Les accès administrateurs sont gérés par l’exploitant du serveur.</p> : <UserControls user={item}/>}</article>)}</div>{!items.length && <div className="admin-empty"><p>Aucun compte trouvé.</p></div>}<Pagination page={page} total={total} base={`/gestion/utilisateurs?q=${encodeURIComponent(query)}`}/></div></section>;
}
