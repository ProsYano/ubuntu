import { z } from "zod";

export const roles = ["client", "agent", "admin"] as const;
export type Role = typeof roles[number];
export const roleLabels: Record<Role, string> = { client: "Client", agent: "Agent", admin: "Administrateur" };
export const orderStatuses = ["pending", "accepted", "rejected", "completed", "cancelled"] as const;
export type OrderStatus = typeof orderStatuses[number];
export const orderLabels: Record<OrderStatus, string> = { pending: "En attente", accepted: "Acceptée", rejected: "Refusée", completed: "Terminée", cancelled: "Annulée" };
export const transitions: Record<OrderStatus, OrderStatus[]> = {
  pending: ["accepted", "rejected", "cancelled"], accepted: ["completed", "cancelled"], rejected: [], completed: [], cancelled: [],
};
export const emailSchema = z.string().trim().max(254).pipe(z.email()).transform(value => value.toLowerCase());
export const passwordSchema = z.string().min(12, "Le mot de passe doit comporter au moins 12 caractères.").max(128);
export const registrationSchema = z.object({ name: z.string().trim().min(2).max(120), email: emailSchema, password: passwordSchema });
const dateSchema = z.iso.date();
export function today() { return new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Brazzaville", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date()); }
export const orderSchema = z.object({
  equipment_id: z.uuid(), start_date: dateSchema, end_date: dateSchema,
  phone: z.string().trim().min(6).max(40), company: z.string().trim().max(160),
  location: z.string().trim().min(3).max(300), notes: z.string().trim().min(10).max(3000), request_key: z.uuid(),
}).refine(value => value.start_date >= today(), { message: "La date de début ne peut pas être passée.", path: ["start_date"] })
  .refine(value => value.end_date >= value.start_date, { message: "La date de fin doit être postérieure ou égale à la date de début.", path: ["end_date"] })
  .refine(value => Date.parse(value.end_date) - Date.parse(value.start_date) <= 366 * 86400000, { message: "La durée maximale est d’un an.", path: ["end_date"] });
export const publicQuoteSchema = z.object({
  name: z.string().trim().min(2).max(120), email: emailSchema, equipment_id: z.uuid(), start_date: dateSchema, end_date: dateSchema,
  phone: z.string().trim().min(6).max(40), company: z.string().trim().max(160), location: z.string().trim().min(3).max(300), notes: z.string().trim().min(10).max(3000), request_key: z.uuid(),
}).refine(value => value.start_date >= today(), { message: "La date de début ne peut pas être passée.", path: ["start_date"] })
  .refine(value => value.end_date >= value.start_date, { message: "La date de fin doit être postérieure ou égale à la date de début.", path: ["end_date"] });
export const conversationSchema = z.object({ subject: z.string().trim().min(3).max(160), body: z.string().trim().min(1).max(4000), request_key: z.uuid() });
export const messageSchema = z.object({ body: z.string().trim().min(1).max(4000), request_key: z.uuid() });
export type User = { id: string; name: string; email: string; role: Role; active: number; created_at: string };
export type Order = {
  id: string; user_id: string; equipment_id: string; equipment_name: string; daily_rate: number | null;
  start_date: string; end_date: string; phone: string; company: string; location: string; notes: string;
  status: OrderStatus; admin_note: string; version: number; created_at: string; updated_at: string;
  client_name: string; client_email: string;
};
export type Conversation = { id: string; user_id: string; order_id: string | null; subject: string; closed: number; version: number; created_at: string; updated_at: string; client_name: string; unread: number };
export type Message = { id: number; conversation_id: string; sender_id: string; body: string; created_at: string; sender_name: string; sender_role: Role; read_at: string | null };
export type OrderEvent = { id: number; status: OrderStatus; note: string; created_at: string; actor_name: string };
export type PublicQuoteRequest = { status: OrderStatus; admin_note: string; version: number; updated_at: string; id: string; name: string; email: string; equipment_id: string; equipment_name: string; start_date: string; end_date: string; phone: string; company: string; location: string; notes: string; created_at: string };
export const pageNumber = (value?: string) => Math.max(1, Math.min(10000, Number.parseInt(value ?? "1", 10) || 1));
export function displayDate(value: string) { return new Date(value.length === 10 ? `${value}T12:00:00Z` : value).toLocaleDateString("fr-FR", { timeZone: "Africa/Brazzaville" }); }
