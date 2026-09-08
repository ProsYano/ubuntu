"use server";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { requireEditor } from "@/lib/auth";
import { store } from "@/lib/server";
import { dataDirectory } from "@/lib/server/database";
import { actionError } from "@/lib/server/action-error";
import { equipmentSchema, type ActionState } from "@/lib/equipment-schema";
import { prepareEquipmentImage } from "@/lib/equipment-image";

function refreshCatalogue(slug: string) {
  ["/", "/equipments", "/contact", "/gestion/engins", "/sitemap.xml", `/equipments/${slug}`].forEach(path => revalidatePath(path));
}
export async function saveEquipment(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireEditor();
  let uploaded: string | null = null;
  let slug: string;
  try {
    store().limit(`equipment:${user.id}`, 60, 60000);
    const parsed = equipmentSchema.parse(Object.fromEntries(form));
    const id = form.get("id") ? z.uuid().parse(form.get("id")) : null;
    const existing = id ? store().equipment(user.id, id) : null;
    const version = z.string().max(50).parse(form.get("version") ?? "");
    if (id && (!existing || existing.updated_at !== version)) return { error: "Cette fiche a changé. Rechargez la page." };
    let imagePath = form.get("remove_image") === "on" ? null : existing?.image_path ?? null;
    const file = form.get("image");
    if (file instanceof File && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) return { error: "Choisissez une image de 5 Mo maximum." };
      let bytes: Buffer;
      try { bytes = await prepareEquipmentImage(new Uint8Array(await file.arrayBuffer()), file.type); }
      catch (error) { return { error: error instanceof Error ? error.message : "Image invalide." }; }
      const filename = `${randomUUID()}.webp`;
      const directory = join(dataDirectory(), "uploads");
      await mkdir(directory, { recursive: true, mode: 0o700 });
      uploaded = join(directory, filename);
      await writeFile(uploaded, bytes, { flag: "wx", mode: 0o600 });
      imagePath = `/api/media/${filename}`;
    }
    slug = store().saveEquipment(user.id, parsed, id, version, imagePath);
  } catch (error) {
    if (uploaded) await unlink(uploaded).catch(() => {});
    return actionError(error);
  }
  refreshCatalogue(slug);
  redirect("/gestion/engins?message=enregistre");
}
export async function trashEquipment(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireEditor();
  let slug: string;
  try { slug = store().trashEquipment(user.id, z.uuid().parse(form.get("id")), z.string().max(50).parse(form.get("version"))); }
  catch (error) { return actionError(error); }
  refreshCatalogue(slug);
  redirect("/gestion/engins?message=supprime");
}
export async function restoreEquipment(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireEditor();
  let slug: string;
  try { slug = store().trashEquipment(user.id, z.uuid().parse(form.get("id")), z.string().max(50).parse(form.get("version")), true); }
  catch (error) { return actionError(error); }
  refreshCatalogue(slug);
  redirect("/gestion/engins?message=restaure");
}
