import { equipment as initialEquipment } from "./content";
import { slugify, type Equipment } from "./equipment-schema";

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

