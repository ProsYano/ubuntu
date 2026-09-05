import "server-only";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import { equipment as initialEquipment } from "./content";
import { getSupabaseConfig } from "./supabase/config";
import { slugify, type Equipment } from "./equipment-schema";

// Only used before a database is configured. An empty live catalogue stays empty.
export const initialCatalogue: Equipment[] = initialEquipment.map((item, i) => ({
  id: `00000000-0000-4000-8000-${String(i + 1).padStart(12, "0")}`,
  slug: slugify(item.name), name: item.name, category: item.name as Equipment["category"],
  summary: item.description, description: `${item.description}\nContactez Ubuntu Location BTP pour préciser les caractéristiques recherchées, la durée de location et les conditions d’intervention sur votre chantier.`,
  specifications: "", capacity_summary: ({
    "Pelles hydrauliques": "Excavation et fouille\nOuverture de tranchées\nTerrassement et chargement",
    "Chargeuses frontales": "Chargement de matériaux\nManutention de terre et de granulats\nPréparation et dégagement du chantier",
    "Bulldozers": "Décapage des sols\nPoussée et répartition des matériaux\nPréparation des plateformes",
    "Compacteurs": "Compactage des sols\nPréparation des couches de chaussée\nTravaux routiers et plateformes",
    "Camions bennes": "Transport de déblais\nAcheminement de terre et de granulats\nÉvacuation de matériaux de chantier",
    "Niveleuses": "Nivellement de précision\nProfilage des pistes et chaussées\nFinition des plateformes",
  } as Record<string,string>)[item.name] ?? "",
  daily_rate: null, weekly_rate: null,
  monthly_rate: null, rental_terms: "", image_alt: item.name, seo_title: "", seo_description: "",
  status: "published", availability: "on_request", image_path: item.image ? `/rentx-reference/asset-${item.image}.png` : null,
  created_at: "2026-09-05T00:00:00Z", updated_at: "2026-09-05T00:00:00Z", deleted_at: null,
}));

function publicClient() {
  const config = getSupabaseConfig();
  if (!config) throw new Error("Catalogue non configuré.");
  // No user cookies or privileged key in public catalogue queries.
  return createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 300, tags: ["equipment"] } }) },
  });
}
export const getPublishedEquipment = cache(async (): Promise<Equipment[]> => {
  if (!getSupabaseConfig()) return initialCatalogue;
  const supabase = publicClient();
  const records: Equipment[] = [];
  for (let offset = 0; ; offset += 500) {
    const { data, error } = await supabase.from("ubuntu_equipment").select("*").eq("status", "published").is("deleted_at", null).order("created_at").order("id").range(offset, offset + 499);
    if (error) throw new Error("Le catalogue est momentanément indisponible.");
    records.push(...data as Equipment[]);
    if (data.length < 500) return records;
  }
});
export async function getPublishedEquipmentPage(offset = 0, limit = 9): Promise<{items: Equipment[]; total: number}> {
  const safeOffset = Math.max(0, Math.min(100_000, Math.trunc(offset)));
  const safeLimit = Math.max(1, Math.min(24, Math.trunc(limit)));
  if (!getSupabaseConfig()) return {items: initialCatalogue.slice(safeOffset, safeOffset + safeLimit), total: initialCatalogue.length};
  const {data, count, error} = await publicClient().from("ubuntu_equipment").select("*", {count: "exact"}).eq("status", "published").is("deleted_at", null).order("created_at").order("id").range(safeOffset, safeOffset + safeLimit - 1);
  if (error) throw new Error("Le catalogue est momentanément indisponible.");
  return {items: data as Equipment[], total: count ?? 0};
}
export const getEquipmentBySlug = cache(async (slug: string): Promise<Equipment | null> => {
  if (!/^[a-z0-9-]{1,110}$/.test(slug)) return null;
  if (!getSupabaseConfig()) return initialCatalogue.find(item => item.slug === slug) ?? null;
  const { data, error } = await publicClient().from("ubuntu_equipment").select("*").eq("slug", slug).eq("status", "published").is("deleted_at", null).maybeSingle();
  if (error) throw new Error("Cette fiche est momentanément indisponible.");
  return data as Equipment | null;
});
