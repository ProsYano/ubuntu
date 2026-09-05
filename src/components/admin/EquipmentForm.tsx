"use client";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { saveEquipment } from "@/app/gestion/engins/actions";
import { categories, imageUrl, type Equipment, type ActionState } from "@/lib/equipment-schema";

export function EquipmentForm({ equipment }: { equipment?: Equipment }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(saveEquipment, {});
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [remove, setRemove] = useState(false);
  const [fileError, setFileError] = useState("");
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    // Object URL lifetime follows the selected file; cleanup releases the browser buffer.
    const timer = setTimeout(() => setPreview(url), 0);
    return () => { clearTimeout(timer); URL.revokeObjectURL(url); };
  }, [file]);
  const source = file ? preview : remove ? null : imageUrl(equipment?.image_path ?? null);
  const errorFor = (field: string) => state.fields?.[field] ? <small className="field-error" id={`${field}-error`}>{state.fields[field]?.join(" ")}</small> : null;
  return <form action={action} className="admin-form equipment-editor">
    <input type="hidden" name="id" value={equipment?.id ?? ""} /><input type="hidden" name="version" value={equipment?.updated_at ?? ""} />
    <fieldset disabled={pending}>
      <div className="editor-columns"><div><section className="editor-panel"><span className="eyebrow">01 · Présentation</span><h2>Les informations de l’engin</h2>
        <label>Nom de l’engin *<input name="name" required minLength={3} maxLength={100} defaultValue={equipment?.name} placeholder="Ex. : Pelle hydraulique sur chenilles" aria-describedby={state.fields?.name ? "name-error" : undefined}/>{errorFor("name")}</label>
        <label>Catégorie *<select name="category" defaultValue={equipment?.category ?? categories[0]}>{categories.map(c => <option key={c}>{c}</option>)}</select>{errorFor("category")}</label>
        <label>Présentation courte *<textarea name="summary" required minLength={30} maxLength={300} rows={3} defaultValue={equipment?.summary} placeholder="Les usages et les principaux atouts de cet engin."/>{errorFor("summary")}<small>Entre 30 et 300 caractères. Affichée dans le catalogue.</small></label>
        <label>Description détaillée *<textarea name="description" required minLength={50} maxLength={10000} rows={8} defaultValue={equipment?.description} placeholder="Applications, conditions d’utilisation, avantages et modalités de location…"/>{errorFor("description")}</label>
        <label>Caractéristiques techniques<textarea name="specifications" maxLength={4000} rows={5} defaultValue={equipment?.specifications} placeholder={"Poids : …\nPuissance : …\nCapacité : …"}/><small>Une caractéristique par ligne. Indiquez uniquement les données confirmées.</small>{errorFor("specifications")}</label>
        <label>Capacités générales<textarea name="capacity_summary" maxLength={2000} rows={5} defaultValue={equipment?.capacity_summary} placeholder={"Capacité du godet : …\nProfondeur de fouille : …\nCharge utile : …"}/><small>Une capacité confirmée par ligne. Ce bloc sera mis en valeur sur la fiche publique.</small>{errorFor("capacity_summary")}</label>
      </section><section className="editor-panel"><span className="eyebrow">02 · Informations financières</span><h2>Tarifs et conditions</h2><p>Laissez un tarif vide s’il doit être communiqué uniquement sur devis. Tous les montants sont exprimés en FCFA.</p>
        <div className="form-grid"><label>Tarif journalier<input name="daily_rate" type="number" min="0" max="2000000000" step="1" defaultValue={equipment?.daily_rate ?? ""}/>{errorFor("daily_rate")}</label><label>Tarif hebdomadaire<input name="weekly_rate" type="number" min="0" max="2000000000" step="1" defaultValue={equipment?.weekly_rate ?? ""}/>{errorFor("weekly_rate")}</label></div>
        <label>Tarif mensuel<input name="monthly_rate" type="number" min="0" max="2000000000" step="1" defaultValue={equipment?.monthly_rate ?? ""}/>{errorFor("monthly_rate")}</label>
        <label>Conditions financières<textarea name="rental_terms" maxLength={2000} rows={5} defaultValue={equipment?.rental_terms} placeholder="Transport, opérateur, carburant, caution, durée minimale…"/><small>Précisez uniquement les conditions confirmées. Les informations publiées restent indicatives jusqu’à validation du devis.</small>{errorFor("rental_terms")}</label>
      </section><section className="editor-panel"><span className="eyebrow">03 · Référencement</span><h2>La présentation dans les recherches</h2><p>Ces champs sont facultatifs. Le nom et la présentation courte sont utilisés automatiquement si vous les laissez vides.</p>
        <label>Titre SEO<input name="seo_title" maxLength={70} defaultValue={equipment?.seo_title}/>{errorFor("seo_title")}</label>
        <label>Description SEO<textarea name="seo_description" maxLength={170} rows={3} defaultValue={equipment?.seo_description}/>{errorFor("seo_description")}</label>
        {equipment && <p className="editor-url">Adresse permanente : /equipments/{equipment.slug}</p>}
      </section></div><aside><section className="editor-panel"><span className="eyebrow">03 · Photographie</span><h2>L’image de présentation</h2><div className="upload-preview">{source ? <Image src={source} alt="Aperçu de l’engin" width={600} height={420} unoptimized={source.startsWith("blob:")} /> : <span>Ajoutez une photo de votre engin</span>}</div>
        <label>Choisir une image<input name="image" type="file" accept="image/jpeg,image/png,image/webp" onChange={event => {const selected = event.target.files?.[0] ?? null; if(selected && (selected.size > 5 * 1024 * 1024 || !["image/jpeg","image/png","image/webp"].includes(selected.type))) {setFileError("Choisissez une image JPG, PNG ou WebP de 5 Mo maximum.");event.target.value="";setFile(null);setPreview(null);return;}setFileError("");setFile(selected);setPreview(null);}}/><small>JPG, PNG ou WebP · 5 Mo maximum. L’image est optimisée automatiquement. Utilisez une photographie destinée à être publique.</small></label>
        {fileError && <p className="form-error" role="alert">{fileError}</p>}
        {equipment?.image_path && <label className="checkbox-label"><input type="checkbox" name="remove_image" checked={remove} onChange={e => setRemove(e.target.checked)}/>Retirer l’image actuelle</label>}
        <label>Description de l’image<input name="image_alt" maxLength={180} defaultValue={equipment?.image_alt} placeholder="Ex. : Pelle hydraulique vue de profil"/>{errorFor("image_alt")}<small>Une description utile aux personnes utilisant un lecteur d’écran.</small></label>
      </section><section className="editor-panel"><span className="eyebrow">04 · Publication</span><h2>Visibilité et disponibilité</h2><label>Statut<select name="status" defaultValue={equipment?.status ?? "draft"}><option value="draft">Brouillon — visible par l’équipe</option><option value="published">Publié — visible sur le site</option></select></label><label>Disponibilité<select name="availability" defaultValue={equipment?.availability ?? "on_request"}><option value="on_request">Sur demande</option><option value="available">Disponible</option><option value="unavailable">Indisponible</option></select></label><p>Une fiche publiée apparaît automatiquement dans le catalogue et le sitemap.</p></section></aside></div>
    </fieldset>
    <div className="editor-save">{state.error && <p className="form-error" role="alert">{state.error}</p>}<div className="actions"><button className="button" disabled={pending || Boolean(fileError)}>{pending ? "Enregistrement en cours…" : equipment ? "Enregistrer les modifications" : "Enregistrer l’engin"}</button><Link className="button button-neutral" href="/gestion/engins">Annuler</Link></div></div>
  </form>;
}
