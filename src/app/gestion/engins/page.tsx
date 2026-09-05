import Image from "next/image";
import Link from "next/link";
import { requireEditor } from "@/lib/auth";
import { imageUrl, type Equipment } from "@/lib/equipment-schema";
import { DeleteEquipment } from "@/components/admin/DeleteEquipment";
const messages: Record<string, string> = { enregistre: "La fiche a été enregistrée.", supprime: "L’engin a été retiré du site et déplacé dans la corbeille.", restaure: "L’engin a été restauré en brouillon." };
export default async function Page({searchParams}: {searchParams: Promise<{page?: string; vue?: string; message?: string}>}) {
  const {supabase} = await requireEditor();
  const params = await searchParams;
  const view = ["draft","published","trash"].includes(params.vue ?? "") ? params.vue! : "all";
  const page = Math.max(1, Math.min(10000, Number.parseInt(params.page ?? "1",10) || 1));
  let query = supabase.from("ubuntu_equipment").select("*", { count: "exact" }).order("updated_at", {ascending: false}).order("id");
  query = view === "trash" ? query.not("deleted_at", "is", null) : query.is("deleted_at", null);
  if (view === "draft" || view === "published") query = query.eq("status", view);
  const {data, count, error} = await query.range((page - 1) * 24, page * 24 - 1);
  if (error) throw new Error("Impossible de charger les engins.");
  const items = data as Equipment[];
  const pageCount = Math.max(1, Math.ceil((count ?? 0) / 24));
  return <section className="section"><div className="wrap"><div className="section-heading"><div><span className="eyebrow">Votre catalogue</span><h1>Gérer les engins</h1><p>{count ?? 0} fiche{count === 1 ? "" : "s"} · Créez, mettez à jour et publiez vos équipements.</p></div><Link className="button" href="/gestion/engins/nouveau">+ Ajouter un engin</Link></div>
    {params.message && messages[params.message] && <p className="form-success" role="status">{messages[params.message]}</p>}
    <nav className="admin-tabs" aria-label="Filtrer les engins">{[["all","Tous les engins"],["published","Publiés"],["draft","Brouillons"],["trash","Corbeille"]].map(([value,label]) => <Link key={value} aria-current={view === value ? "page" : undefined} href={`/gestion/engins?vue=${value}`}>{label}</Link>)}</nav>
    {items.length === 0 ? <div className="admin-empty"><h2>{view === "trash" ? "La corbeille est vide." : "Aucun engin dans cette vue."}</h2><p>Ajoutez un équipement ou choisissez un autre filtre.</p><Link className="text-link" href="/gestion/engins/nouveau">Créer une fiche ↗</Link></div> : <div className="admin-catalogue">{items.map(item => {const source = imageUrl(item.image_path); return <article className="admin-equipment-row" key={item.id}><div className="admin-equipment-image">{source ? <Image src={source} alt={item.image_alt || item.name} width={180} height={140}/> : <span>Sans photo</span>}</div><div className="admin-equipment-info"><span className={`status-badge ${item.deleted_at ? "" : item.status}`}>{item.deleted_at ? "Corbeille" : item.status === "published" ? "Publié" : "Brouillon"}</span><h2>{item.name}</h2><p>{item.category}</p><small>Mis à jour le {new Date(item.updated_at).toLocaleDateString("fr-FR",{timeZone:"Africa/Brazzaville"})}</small></div><div className="admin-row-actions">{!item.deleted_at && <><Link className="button button-neutral" href={`/gestion/engins/${item.id}`}>Modifier</Link>{item.status === "published" && <Link className="text-link" href={`/equipments/${item.slug}`}>Voir la fiche ↗</Link>}</>}<DeleteEquipment id={item.id} name={item.name} version={item.updated_at} deleted={Boolean(item.deleted_at)}/></div></article>;})}</div>}
    {pageCount > 1 && <nav className="pagination" aria-label="Pages du catalogue">{page > 1 && <Link href={`/gestion/engins?vue=${view}&page=${page-1}`}>← Précédent</Link>}<span>Page {page} sur {pageCount}</span>{page < pageCount && <Link href={`/gestion/engins?vue=${view}&page=${page+1}`}>Suivant →</Link>}</nav>}
  </div></section>;
}
