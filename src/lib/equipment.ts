import "server-only";
import { cache } from "react";
import { store } from "./server";
import type { Equipment } from "./equipment-schema";
export const getPublishedEquipment = cache(async (): Promise<Equipment[]> => {
  const items: Equipment[] = [];
  for (let offset = 0; ; offset += 500) {
    const page = store().published(offset, 500);
    items.push(...page.items);
    if (items.length >= page.total) return items;
  }
});
export async function getPublishedEquipmentPage(offset = 0, limit = 9) { return store().published(offset, limit); }
export const getEquipmentBySlug = cache(async (slug: string): Promise<Equipment | null> => /^[a-z0-9-]{1,110}$/.test(slug) ? store().publishedBySlug(slug) ?? null : null);
