"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAccess, throttlePublic } from "@/lib/auth";
import { store } from "@/lib/server";
import { actionError } from "@/lib/server/action-error";
import { orderStatuses } from "@/lib/workflow-schema";
import type { ActionState } from "@/lib/equipment-schema";
function refresh() { revalidatePath("/compte", "layout"); revalidatePath("/gestion", "layout"); }
export async function createOrder(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["client"]);
  let id: string;
  try { store().limit(`orders:${user.id}`, 20, 3600000); id = store().createOrder(user.id, Object.fromEntries(form)); }
  catch (error) { return actionError(error); }
  refresh(); redirect(`/compte/commandes/${id}`);
}
export async function createPublicQuote(_state: ActionState, form: FormData): Promise<ActionState> {
  try {
    const raw = Object.fromEntries(form);
    await throttlePublic("quote", String(raw.email ?? "").trim().toLowerCase());
    store().createPublicQuoteRequest(raw);
  } catch (error) { return actionError(error); }
  revalidatePath("/gestion/commandes");
  redirect("/contact?demande=envoyee#devis");
}
export async function updateOrder(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["client", "admin"]);
  try {
    store().updateOrder(user.id, z.uuid().parse(form.get("id")), z.enum(orderStatuses).parse(form.get("status")), z.coerce.number().int().positive().parse(form.get("version")), z.string().trim().max(2000).parse(form.get("note") ?? ""));
  } catch (error) { return actionError(error); }
  refresh(); return { success: "Le statut de la commande a été enregistré." };
}
export async function createConversation(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["client"]);
  let id: string;
  try { store().limit(`conversations:${user.id}`, 10, 3600000); id = store().createConversation(user.id, Object.fromEntries(form)); }
  catch (error) { return actionError(error); }
  refresh(); redirect(`/compte/messages/${id}`);
}
export async function sendMessage(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["client", "admin"]);
  try { store().limit(`messages:${user.id}`, 30, 60000); store().sendMessage(user.id, z.uuid().parse(form.get("id")), Object.fromEntries(form)); }
  catch (error) { return actionError(error); }
  refresh(); return { success: "Message envoyé." };
}
export async function markRead(form: FormData) {
  const { user } = await requireAccess(["client", "admin"]);
  const id = z.uuid().parse(form.get("id"));
  store().markRead(user.id, id, z.coerce.number().int().nonnegative().parse(form.get("through")), z.coerce.number().int().nonnegative().parse(form.get("from")));
  refresh();
}
export async function closeConversation(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["admin"]);
  try { store().closeConversation(user.id, z.uuid().parse(form.get("id")), z.enum(["0", "1"]).parse(form.get("closed")) === "1", z.coerce.number().int().positive().parse(form.get("version"))); }
  catch (error) { return actionError(error); }
  refresh(); return { success: "Conversation mise à jour." };
}
export async function updateUser(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["admin"]);
  try { store().updateUser(user.id, z.uuid().parse(form.get("id")), z.enum(["client", "agent"]).parse(form.get("role")), form.get("active") === "on"); }
  catch (error) { return actionError(error); }
  refresh(); return { success: "Compte mis à jour. Ses sessions ont été révoquées." };
}
export async function issueRecovery(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["admin"]);
  try {
    const id = z.uuid().parse(form.get("id"));
    const target = store().user(id);
    if (!target || target.role === "admin") return { error: "La récupération des comptes administrateurs se fait sur le serveur." };
    if (form.get("verified") !== "on") return { error: "Vérifiez d’abord l’identité du titulaire du compte." };
    store().limit(`recover-admin:${user.id}`, 10, 3600000);
    const token = store().issueReset(id);
    store().audit(user.id, "user.recovery-issued", id);
    return { success: "Lien valable 30 minutes, à transmettre uniquement au titulaire du compte après vérification de son identité.", recoveryPath: `/reinitialiser-mot-de-passe?token=${token}` };
  } catch (error) { return actionError(error); }
}

export async function updatePublicQuote(_state: ActionState, form: FormData): Promise<ActionState> {
  const { user } = await requireAccess(["admin"]);
  try {
    store().updatePublicQuote(user.id, z.uuid().parse(form.get("id")), z.enum(orderStatuses).parse(form.get("status")), z.coerce.number().int().positive().parse(form.get("version")), z.string().trim().max(2000).parse(form.get("note") ?? ""));
  } catch (error) { return actionError(error); }
  refresh(); return { success: "Le statut de la demande a été enregistré." };
}
