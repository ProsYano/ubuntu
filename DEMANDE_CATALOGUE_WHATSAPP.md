# Demande catalogue & prix — Ubuntu Location BTP (rentx-next)

> Document prêt à envoyer par WhatsApp à ton partenaire terrain / gestionnaire du parc.
> Généré le 2026-09-14 — à partir de l'analyse complète du projet.

---

## 1) Résumé ultra-rapide à lui donner

> **Projet :** `rentx-next` — Site vitrine + catalogue + commandes de location d'engins BTP (`src/app/page.tsx:1`, `src/lib/constants.ts:51`)
> **Entreprise :** Ubuntu Location BTP — Brazzaville, N°1305 rue Bangou, Plateau des 15 ans (`src/lib/constants.ts:59`)
> **État actuel : 6 engins génériques publiés, mais AUCUN prix renseigné** — tout s'affiche "Sur devis" sur le site (`src/app/equipments/[slug]/page.tsx:22`, `src/lib/equipment-schema.ts:35-37`)

**Conséquence :** Un client ne peut pas se projeter. Il faut que tu récupères TOUT le catalogue détaillé + la grille tarifaire pour remplir la base.

---

## 2) Ce qui existe déjà en base (SQLite `data/rentx.db`)

Source technique : `src/lib/server/database.ts:35-44` (table `equipment`) + `src/lib/initial-catalogue.ts:4-20` + `src/lib/content.ts:1-8`

| # | Engin (catégorie = nom) | Slug | daily_rate | weekly_rate | monthly_rate | Disponibilité | Statut | Capacités actuelles |
|---|---|---|---|---|---|---|---|---|
| 1 | **Pelles hydrauliques** | `pelles-hydrauliques` | `NULL` | `NULL` | `NULL` | `on_request` (Sur demande) | `published` | Excavation et fouille / Ouverture de tranchées / Terrassement et chargement |
| 2 | **Chargeuses frontales** | `chargeuses-frontales` | `NULL` | `NULL` | `NULL` | `on_request` | `published` | Chargement de matériaux / Manutention terre et granulats / Préparation chantier |
| 3 | **Bulldozers** | `bulldozers` | `NULL` | `NULL` | `NULL` | `on_request` | `published` | Décapage des sols / Poussée et répartition / Préparation plateformes |
| 4 | **Compacteurs** | `compacteurs` | `NULL` | `NULL` | `NULL` | `on_request` | `published` | Compactage des sols / Préparation couches chaussée / Travaux routiers |
| 5 | **Camions bennes** | `camions-bennes` | `NULL` | `NULL` | `NULL` | `on_request` | `published` | Transport de déblais / Acheminement terre et granulats / Évacuation matériaux |
| 6 | **Niveleuses** | `niveleuses` | `NULL` | `NULL` | `NULL` | `on_request` | `published` | Nivellement de précision / Profilage pistes et chaussées / Finition plateformes |

**Catégorie bonus prévue par le code mais vide :** `Autres équipements` (`src/lib/equipment-schema.ts:3`)

> **Schema prix dans le code :** `daily_rate`, `weekly_rate`, `monthly_rate` = `INTEGER` en **FCFA**, entiers, 0 à 2 000 000 000, nullable (`src/lib/equipment-schema.ts:4-7`, `src/lib/server/database.ts:39`). Affichage : `formatRate()` → `150 000 FCFA` ou `Sur devis` si `null` (`src/lib/equipment-schema.ts:35`).

**Autres champs vides pour les 6 engins (à faire remplir) :**
- `specifications` (max 4000 car.) — vide
- `rental_terms` (max 2000 car.) — vide
- `capacity_summary` — seulement 3 lignes génériques, pas de fiche technique
- `image_path` — 3/6 sans photo (`null`), 3 avec placeholder `/rentx-reference/asset-*.png`
- `seo_title` / `seo_description` — vides

---

## 3) CE QU'IL FAUT LUI DEMANDER — Checklist complète

### A. Pour CHAQUE engin (les 6 + "Autres équipements" s'il en a)

Coche quand reçu :

- [ ] **Modèles précis disponibles** (ex: Pelle 20T / 30T, Chargeuse 2m³ / 3m³, Camion 10m³ / 20m³, etc.)
- [ ] **Prix JOUR le plus bas / le plus haut** (en FCFA, avec et sans opérateur/chauffeur)
- [ ] **Prix SEMAINE le plus bas / le plus haut** (en FCFA)
- [ ] **Prix MOIS le plus bas / le plus haut** (en FCFA)
- [ ] **Ce qui fait varier le prix** (tonnage, godet, puissance, année, avec/sans chauffeur, carburant inclus ou non)
- [ ] **Caution / dépôt de garantie**
- [ ] **Transport / livraison sur chantier** (inclus ? prix au km ?)
- [ ] **Carburant** (inclus ? à la charge du client ?)
- [ ] **Opérateur / chauffeur** (inclus ? supplément/jour ?)
- [ ] **Durée minimum de location**
- [ ] **Disponibilité réelle** (`available` / `on_request` / `unavailable`) + délai de mise à disposition
- [ ] **Photos réelles** de chaque modèle (pas de placeholder)
- [ ] **Fiche technique** (spécifications : poids, puissance, capacité godet/benne, dimensions)
- [ ] **Conditions de location** (`rental_terms` — texte qui s'affiche sous les prix)

### B. Questions transverses (une fois pour tout le parc)

- [ ] Y a-t-il des **packs / remises** semaine vs jour, mois vs semaine ?
- [ ] **Tarif week-end / jour férié** différent ?
- [ ] **Assurance** incluse ?
- [ ] **Entretien / panne** : qui paye, délai remplacement ?
- [ ] **Zone d'intervention** (Brazzaville uniquement ? intérieur du pays ? supplément ?)
- [ ] **Facturation** : HT / TTC, TVA, mode de paiement, acompte ?

---

## 4) Tableau à lui envoyer à remplir (copier-coller tel quel)

> Dis-lui : "Tu peux me le remplir directement dans WhatsApp ou me renvoyer un Excel/ photo du tableau"

```
CATALOGUE UBUNTU LOCATION BTP - À REMPLIR

| Engin | Modèle / Capacité | Prix JOUR min (FCFA) | Prix JOUR max (FCFA) | Prix SEMAINE min | Prix SEMAINE max | Prix MOIS min | Prix MOIS max | Avec chauffeur ? | Carburant inclus ? | Transport inclus ? | Dispo | Photo ? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Pelles hydrauliques | ex: 20 tonnes |  |  |  |  |  |  | Oui/Non/+XX FCFA | Oui/Non | Oui/Non/+XX FCFA |  | Oui/Non |
| Chargeuses frontales | ex: 3m³ |  |  |  |  |  |  |  |  |  |  |  |
| Bulldozers | ex: D6 |  |  |  |  |  |  |  |  |  |  |  |
| Compacteurs |  |  |  |  |  |  |  |  |  |  |  |  |
| Camions bennes | ex: 15m³ |  |  |  |  |  |  |  |  |  |  |  |
| Niveleuses |  |  |  |  |  |  |  |  |  |  |  |  |
| Autres équipements |  |  |  |  |  |  |  |  |  |  |  |  |

+ Pour chaque ligne, précise ce qui fait varier min/max (ex: "min = petite pelle sans chauffeur, max = grosse pelle 30T avec chauffeur + carburant")
```

---

## 5) MESSAGES WHATSAPP PRÊTS À COPIER-COLLER

### Message 0 — Introduction globale (à envoyer en premier)

```
Salut 👋 Pour finaliser le site Ubuntu Location BTP (rentx-next), j'ai besoin de ton aide pour compléter le catalogue.

Actuellement on a 6 engins en ligne mais SANS prix — tout s'affiche "Sur devis". Les clients ne peuvent pas se projeter.

J'ai besoin pour CHAQUE engin :
• la liste exacte des modèles qu'on a en parc
• le prix le plus BAS et le plus HAUT à la journée / semaine / mois (en FCFA)
• ce qui fait varier le prix (taille, avec/sans chauffeur, carburant, transport...)
• + photos réelles + fiche technique

Je t'envoie les messages engin par engin juste après, tu peux me répondre au fur et à mesure. Merci 🙏

Le site tourne sur 6 catégories : Pelles hydrauliques, Chargeuses frontales, Bulldozers, Compacteurs, Camions bennes, Niveleuses.
```

### Message 1 — Pelles hydrauliques

```
📋 PELLES HYDRAULIQUES — besoin catalogue + prix

Actuellement sur le site on a juste "Pelles hydrauliques" générique, sans modèle ni prix.

Peux-tu me donner :
1️⃣ Modèles exacts dispo (ex: 20T, 30T, chenilles/pneus, godet XX m³ ?)
2️⃣ Prix JOUR : le moins cher = ? FCFA / le plus cher = ? FCFA
3️⃣ Prix SEMAINE : min ? / max ?
4️⃣ Prix MOIS : min ? / max ?
5️⃣ Avec chauffeur inclus ou supplément ? Combien par jour ?
6️⃣ Carburant + transport chantier inclus ou en plus ?
7️⃣ Photos réelles + fiche technique (poids, puissance, capacité)

Si tu as un catalogue PDF ou une liste, envoie-le moi direct 👍
```

### Message 2 — Chargeuses frontales

```
📋 CHARGEUSES FRONTALES

Pareil, on a juste le nom générique en ligne sans prix.

Peux-tu me donner :
1️⃣ Modèles / capacités godet (ex: 2m³, 3m³ ?)
2️⃣ Prix JOUR min / max en FCFA
3️⃣ Prix SEMAINE min / max
4️⃣ Prix MOIS min / max
5️⃣ Avec/sans opérateur ? Supplément ?
6️⃣ Carburant + livraison inclus ?
7️⃣ Photo + specs (charge utile, puissance)
```

### Message 3 — Bulldozers

```
📋 BULLDOZERS

Besoin :
1️⃣ Modèles dispo (ex: D6, D7, puissance ?)
2️⃣ Prix JOUR min / max
3️⃣ Prix SEMAINE min / max
4️⃣ Prix MOIS min / max
5️⃣ Avec chauffeur ? Carburant ? Transport ?
6️⃣ Fiche technique + photo
```

### Message 4 — Compacteurs

```
📋 COMPACTEURS

1️⃣ Types dispo (vibrant, pneu, tandem ? Tonnage ?)
2️⃣ Prix JOUR min / max (FCFA)
3️⃣ Prix SEMAINE min / max
4️⃣ Prix MOIS min / max
5️⃣ Avec opérateur ou non ? Carburant ?
6️⃣ Photo + specs
```

### Message 5 — Camions bennes

```
📋 CAMIONS BENNES

1️⃣ Capacités dispo (ex: 10m³, 15m³, 20m³, 6x4 / 8x4 ?)
2️⃣ Prix JOUR min / max
3️⃣ Prix SEMAINE min / max
4️⃣ Prix MOIS min / max
5️⃣ Avec chauffeur inclus ? Carburant inclus ? Prix au km si transport ?
6️⃣ Photo + fiche (PTAC, volume benne)
```

### Message 6 — Niveleuses

```
📋 NIVELEUSES

1️⃣ Modèles dispo (puissance, largeur lame ?)
2️⃣ Prix JOUR min / max
3️⃣ Prix SEMAINE min / max
4️⃣ Prix MOIS min / max
5️⃣ Avec opérateur ? Carburant / transport ?
6️⃣ Photo + specs
```

### Message 7 — Autres équipements + conditions générales

```
📋 AUTRES ÉQUIPEMENTS + CONDITIONS GÉNÉRALES

1️⃣ Est-ce qu'on a d'autres engins que les 6 listés ? (groupes électrogènes, citernes, grues, pelles sur pneus, etc. ?) Si oui, même infos : modèles + prix jour/semaine/mois min/max + photos.

2️⃣ Pour tout le parc :
   • Remise si location longue (semaine/mois vs jour) ?
   • Caution / dépôt de garantie = combien ?
   • Durée mini de location ?
   • Délai pour mettre l'engin sur chantier ?
   • Zone : Brazzaville uniquement ou partout au Congo ? Supplément hors Brazza ?
   • Assurance incluse ?
   • En cas de panne, remplacement en combien de temps ?
   • Facturation : prix HT ou TTC ? Acompte demandé ?

Tu peux me faire un vocal si plus simple, je retranscris 👍
```

### Message 8 — Relance / format attendu

```
Pour que je puisse remplir le site rapidement, l'idéal c'est un tableau comme ça par engin :

Exemple pour Pelles :
- Petite pelle 20T sans chauffeur : 150 000 FCFA / jour
- Grosse pelle 30T avec chauffeur + carburant : 350 000 FCFA / jour
- Semaine : 800 000 à 1 800 000 FCFA
- Mois : 2 500 000 à 6 000 000 FCFA

Si tu as déjà un fichier Excel / PDF catalogue ou une liste de prix, envoie-le tel quel, je m'occupe de tout mettre en forme.

Merci d'avance 🙏 Dès que j'ai ça je peux passer les prix de "Sur devis" à vrais prix sur le site.
```

---

## 6) Comment j'intègre sa réponse dans le site (pour toi, pas à lui envoyer)

1. **Remplir la base SQLite** : `data/rentx.db` table `equipment` (`src/lib/server/database.ts:35`)
   - Soit via back-office Agent : `/gestion/engins` → Modifier chaque fiche (`src/app/gestion/engins/page.tsx:1`)
   - Soit via import JSON : `npm run db:import -- catalogue.json` (`scripts/import-catalogue.ts:6-12`) — format = `equipmentSchema` (`src/lib/equipment-schema.ts:8-24`)

2. **Champs à remplir par engin :**
   ```ts
   daily_rate: 150000,      // prix jour le plus représentatif (ou prix de base)
   weekly_rate: 800000,     // si prix variable, mettre le prix d'appel + détailler min/max dans rental_terms
   monthly_rate: 2500000,
   rental_terms: "Pelle 20T : 150k/j sans chauffeur, 350k/j avec chauffeur + carburant. Semaine 800k-1.8M, Mois 2.5M-6M. Transport 50k en ville, carburant à charge client au-delà de 8h. Caution 500k.", // max 2000 car.
   specifications: "Poids 20T, Puissance 150ch, Godet 0.9m³, Profondeur fouille 6m...", // max 4000 car.
   capacity_summary: "Excavation et fouille\nOuverture de tranchées\nTerrassement..." // 1 ligne = 1 puce
   ```

3. **Si plusieurs modèles avec écarts de prix énormes :** créer plusieurs fiches distinctes (ex: `Pelle hydraulique 20T` et `Pelle hydraulique 30T`) — le code supporte jusqu'à 10 000 fiches (`scripts/import-catalogue.ts:11`). Chaque fiche a son propre `slug` (`src/lib/equipment-schema.ts:31`).

4. **Prix min/max :** Le site n'affiche qu'UN prix par période (`src/app/equipments/[slug]/page.tsx:22`). Pour afficher min/max, mets le prix d'appel dans `daily_rate` et détaille la fourchette dans `rental_terms` + `description`.

---

## 7) Pièces jointes à lui demander en plus

- [ ] Catalogue PDF existant (même ancien / non à jour)
- [ ] Liste de prix interne / grille tarifaire Excel
- [ ] Photos de chaque engin **sur chantier** (pas photos catalogue internet)
- [ ] Logo / plaquette Ubuntu Location BTP si dispo
- [ ] Conditions générales de location (si document existe)

---

## 8) Infos à ne pas oublier de lui confirmer

- Tous les prix sont bien en **FCFA** ? (le site affiche `150 000 FCFA` via `formatRate()` — `src/lib/equipment-schema.ts:35`)
- Prix **HT ou TTC** ?
- Devis final reste "à convenir avec l'équipe" — le site le précise déjà (`src/lib/initial-catalogue.ts:7`, `README.md:27` : "le tarif reste indicatif et le devis final est convenu avec l’équipe") — donc tu peux mettre des prix indicatifs sans t'engager.

---

*Fichier généré pour WhatsApp — copie/colle les blocs `Message 0 à 8` un par un. Garde le tableau §4 pour qu'il te le renvoie rempli.*
