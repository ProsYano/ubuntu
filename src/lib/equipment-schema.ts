import { z } from "zod";

export const categories = ["Pelles hydrauliques", "Chargeuses frontales", "Bulldozers", "Compacteurs", "Camions bennes", "Niveleuses", "Autres équipements"] as const;
const optionalRate = z.preprocess(
  (value) => value === "" || value === null || value === undefined ? null : Number(value),
  z.number().int().min(0).max(2_000_000_000).nullable(),
);
export const equipmentSchema = z.object({
  name: z.string().trim().min(3, "Le nom doit comporter au moins 3 caractères.").max(100),
  category: z.enum(categories),
  summary: z.string().trim().min(30, "Ajoutez une présentation d’au moins 30 caractères.").max(300),
  description: z.string().trim().min(50, "La description doit comporter au moins 50 caractères.").max(10000),
  specifications: z.string().trim().max(4000),
  capacity_summary: z.string().trim().max(2000),
  daily_rate: optionalRate,
  weekly_rate: optionalRate,
  monthly_rate: optionalRate,
  rental_terms: z.string().trim().max(2000),
  image_alt: z.string().trim().max(180),
  seo_title: z.string().trim().max(70),
  seo_description: z.string().trim().max(170),
  status: z.enum(["draft", "published"]),
  availability: z.enum(["on_request", "available", "unavailable"]),
});
export type EquipmentInput = z.infer<typeof equipmentSchema>;
export type Equipment = EquipmentInput & {
  id: string; slug: string; image_path: string | null;
  created_at: string; updated_at: string; deleted_at: string | null;
};
export type ActionState = { error?: string; success?: string; fields?: Record<string, string[] | undefined> };
export function slugify(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 90);
}
export const availabilityLabels = { on_request: "Disponibilité sur demande", available: "Disponible à la location", unavailable: "Actuellement indisponible" } as const;
export function formatRate(value: number | null) {
  return value === null ? null : `${new Intl.NumberFormat("fr-FR").format(value)} FCFA`;
}
export function imageUrl(path: string | null) {
  if (!path) return null;
  if (/^\/rentx-reference\/asset-[a-f0-9]+\.png$/.test(path)) return path;
  if (!/^[a-f0-9-]{36}\/[a-f0-9-]{36}\.webp$/.test(path)) return null;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return base ? `${base}/storage/v1/object/public/ubuntu-equipment/${path}` : null;
}
