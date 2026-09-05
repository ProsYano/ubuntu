"use server";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath, updateTag } from "next/cache";
import { requireEditor } from "@/lib/auth";
import { equipmentSchema, slugify, type ActionState } from "@/lib/equipment-schema";
import { prepareEquipmentImage } from "@/lib/equipment-image";

function refreshCatalogue(slug?: string) {
  updateTag("equipment");
  ["/", "/equipments", "/contact", "/gestion/engins", "/sitemap.xml"].forEach(path => revalidatePath(path));
  if (slug) revalidatePath(`/equipments/${slug}`);
}
export async function saveEquipment(_state: ActionState, form: FormData): Promise<ActionState> {
  const { supabase, user } = await requireEditor();
  const parsed = equipmentSchema.safeParse(Object.fromEntries(form));
  if (!parsed.success) return { error: "Vérifiez les champs du formulaire.", fields: parsed.error.flatten().fieldErrors };
  const idValue = form.get("id");
  const id = typeof idValue === "string" && idValue ? idValue : null;
  if (id && !z.uuid().safeParse(id).success) return { error: "La référence de cet engin est invalide." };
  let existing: { slug: string; image_path: string | null; updated_at: string } | null = null;
  if (id) {
    const { data, error } = await supabase.from("ubuntu_equipment").select("slug,image_path,updated_at").eq("id", id).is("deleted_at", null).maybeSingle();
    if (error || !data) return { error: "Cette fiche n’est plus accessible. Revenez au catalogue." };
    if (data.updated_at !== form.get("version")) return { error: "Cette fiche a été modifiée depuis son ouverture. Rechargez la page avant de réessayer." };
    existing = data;
  }
  let imagePath = form.get("remove_image") === "on" ? null : existing?.image_path ?? null;
  let uploaded: string | null = null;
  const file = form.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      const bytes = await prepareEquipmentImage(new Uint8Array(await file.arrayBuffer()), file.type);
      uploaded = `${user.id}/${randomUUID()}.webp`;
      const { error } = await supabase.storage.from("ubuntu-equipment").upload(uploaded, bytes, { contentType: "image/webp", upsert: false, cacheControl: "31536000" });
      if (error) return { error: "Le téléversement de l’image a échoué. Vérifiez votre connexion et réessayez." };
      imagePath = uploaded;
    } catch (error) { return { error: error instanceof Error ? error.message : "Impossible de traiter l’image." }; }
  }
  const slug = existing?.slug ?? `${slugify(parsed.data.name)}-${randomUUID().slice(0, 8)}`;
  const payload = { ...parsed.data, image_path: imagePath, updated_by: user.id };
  const result = id
    ? await supabase.from("ubuntu_equipment").update(payload).eq("id", id).eq("updated_at", existing!.updated_at).is("deleted_at", null).select("id").maybeSingle()
    : await supabase.from("ubuntu_equipment").insert({ ...payload, slug, created_by: user.id }).select("id").single();
  if (result.error || !result.data) {
    if (uploaded) await supabase.storage.from("ubuntu-equipment").remove([uploaded]);
    return { error: "Enregistrement impossible : la fiche a peut-être été modifiée. Rechargez la page et réessayez." };
  }
  refreshCatalogue(slug);
  redirect("/gestion/engins?message=enregistre");
}
export async function trashEquipment(_state: ActionState, form: FormData): Promise<ActionState> {
  const { supabase, user } = await requireEditor();
  const id = z.uuid().safeParse(form.get("id"));
  const version = z.string().min(1).max(50).safeParse(form.get("version"));
  if (!id.success || !version.success) return { error: "La référence est invalide." };
  const { data, error } = await supabase.from("ubuntu_equipment").update({ deleted_at: new Date().toISOString(), updated_by: user.id }).eq("id", id.data).eq("updated_at", version.data).is("deleted_at", null).select("slug").maybeSingle();
  if (error || !data) return { error: "Suppression impossible. La fiche a peut-être changé ; rechargez la page." };
  refreshCatalogue(data.slug);
  redirect("/gestion/engins?message=supprime");
}
export async function restoreEquipment(_state: ActionState, form: FormData): Promise<ActionState> {
  const { supabase, user } = await requireEditor();
  const id = z.uuid().safeParse(form.get("id"));
  if (!id.success) return { error: "La référence est invalide." };
  const { data, error } = await supabase.from("ubuntu_equipment").update({ deleted_at: null, status: "draft", updated_by: user.id }).eq("id", id.data).not("deleted_at", "is", null).select("slug").maybeSingle();
  if (error || !data) return { error: "La restauration a échoué. Rechargez la page et réessayez." };
  refreshCatalogue(data.slug);
  redirect("/gestion/engins?message=restaure");
}
