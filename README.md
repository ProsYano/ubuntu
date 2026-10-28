# Ubuntu Location BTP

Application Next.js avec catalogue d’engins, comptes clients, commandes et messagerie. Les données sont enregistrées dans SQLite via `better-sqlite3`, sans MySQL, MongoDB ni service Supabase. Les photos optimisées sont conservées sur le disque du serveur.

## Démarrage

Node.js 22.13 ou supérieur (Node.js 24 recommandé).

```bash
npm ci
cp .env.example .env.local
npm run account -- create-admin admin@votre-entreprise.fr "Administrateur Ubuntu"
npm run account -- create-agent agent@votre-entreprise.fr "Agent Ubuntu"
npm run dev
```

Les commandes demandent un mot de passe dans le terminal avec saisie masquée. Aucun compte administrateur ni mot de passe par défaut n’est créé. Si `.env.local` existe déjà, adaptez-le sans l’écraser.

Ouvrir http://localhost:3000. Un client peut s’inscrire sur `/inscription`. La connexion `/connexion` dirige chacun vers son espace :

| Rôle | Accès |
| --- | --- |
| Client | Demandes de location, suivi et annulation en attente, conversations avec l’admin |
| Agent | Création, modification, publication, disponibilité et corbeille du catalogue partagé |
| Admin | Traitement des commandes, réponses aux messages, fermeture des conversations, attribution et suspension des accès agents/clients |

**Seul l’agent modifie les engins.** L’admin utilise un compte agent distinct s’il doit également intervenir sur le catalogue. Les demandes ne comportent ni paiement en ligne ni facturation : le tarif reste indicatif et le devis final est convenu avec l’équipe.

## Données et hébergement

`RENTX_DATA_DIR` contient `rentx.db`, ses journaux SQLite et `uploads/`. Le catalogue initial est inséré une seule fois. Les fichiers de données sont exclus de Git et ne doivent jamais être placés dans `public/`.

Héberger avec `npm run build` puis `npm start` sur **un serveur Node.js avec disque persistant et HTTPS**. Le backend local ne convient pas aux fonctions Vercel ni à des instances réparties sur plusieurs disques. Une configuration Vercel provoque une erreur explicite plutôt qu’une perte silencieuse des données.

- [Installation, comptes, migration et sauvegardes](docs/ACTIVATION.md)
- [Référencement](docs/REFERENCEMENT.md)
- [Génération des apps natives Android/iOS et du logiciel desktop](docs/CAPACITOR.md)

## Vérification

```bash
npm test
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

Le build utilise webpack, comme le serveur de développement. `npm run build:turbopack` permet de tester Turbopack sur un environnement qui autorise ses sous-processus.

Les tests SQLite vérifient les droits, les réservations concurrentes, l’isolation des conversations, les sessions, la récupération et la persistance. Le test navigateur utilise un dossier temporaire distinct et le port 3101. Sur macOS, il utilise Chrome ; ailleurs, installer Chromium avec `npx playwright install chromium`. `PLAYWRIGHT_CHANNEL` permet de choisir un autre canal installé. Les captures et traces sont placées dans `test-results/`.

## Sauvegarde

```bash
npm run db:backup
```

Cette commande sauvegarde SQLite de manière cohérente et copie les photos dans un sous-dossier horodaté de `backups/`. Les détails de restauration et de récupération des comptes se trouvent dans le guide d’activation.
