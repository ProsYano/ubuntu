# Installation et exploitation — SQLite

## 1. Environnement

Utiliser Node.js 22.13+ (24 recommandé), `npm ci`, puis configurer `.env.local` selon `.env.example`. Les anciens paramètres `NEXT_PUBLIC_SUPABASE_*` ne sont plus utilisés. Aucun service distant n’est nécessaire.

Définir `RENTX_DATA_DIR` vers un dossier privé sur disque persistant, par exemple `/var/lib/rentx`. Le compte système de l’application doit pouvoir y lire et écrire. Ne pas utiliser `public/`, un partage réseau, un dossier de build ou un disque éphémère. Un seul serveur avec plusieurs processus sur le même disque local peut partager SQLite ; plusieurs serveurs indépendants nécessitent une autre architecture de stockage.

SQLite est initialisé automatiquement, avec schéma versionné, clés étrangères, journal WAL et délai d’attente pour les écritures concurrentes. Les six fiches de départ sont insérées une seule fois. Supprimer toutes les fiches ne les fait pas réapparaître.

## 2. Premier administrateur et agents

```bash
npm run account -- create-admin admin@exemple.fr "Administrateur Ubuntu"
npm run account -- create-agent agent@exemple.fr "Agent Ubuntu"
```

Le terminal demande un mot de passe de 12 à 128 caractères, sans l’afficher, puis sa confirmation. Ne pas mettre les mots de passe dans une commande, un fichier versionné ou la conversation. La commande refuse d’écraser un compte existant.

Les clients s’inscrivent sur `/inscription`. Un administrateur peut ensuite attribuer le rôle agent à un compte existant depuis `/gestion/utilisateurs`. Il peut aussi révoquer ce rôle ou suspendre un compte. Ces changements révoquent toutes les sessions du compte. Les comptes administrateurs sont créés exclusivement par l’exploitant du serveur. Il n’existe aucune inscription publique privilégiée.

Les rôles sont exclusifs : le catalogue appartient aux agents, les commandes et réponses aux administrateurs, les demandes aux clients. Pour exercer plusieurs fonctions, utiliser des comptes distincts. Un changement de rôle n’efface pas les anciennes données ; elles restent conservées et accessibles à l’administration.

## 3. Commandes et messages

Un client sélectionne un engin publié, des dates (début et fin inclus), son téléphone, son chantier et son besoin. Les engins marqués indisponibles ne peuvent pas être demandés. Le nom et le tarif journalier sont copiés dans la commande afin de préserver son historique.

Parcours des statuts :

- En attente → acceptée, refusée ou annulée.
- Acceptée → terminée ou annulée par l’administration.
- Refusée, terminée et annulée : états finaux.

Le client peut annuler uniquement une demande en attente. Pour annuler une commande acceptée, il contacte l’admin. Un refus ou une annulation par l’admin exige un motif visible par le client. Chaque changement est historisé. Les versions de formulaire évitent d’écraser un traitement simultané. L’acceptation vérifie atomiquement la disponibilité et les réservations acceptées qui se chevauchent : une fiche représente un engin réservable, pas un stock de plusieurs exemplaires. Créer une fiche par engin physique pour réserver plusieurs unités.

Chaque commande possède une conversation. Le client peut également ouvrir une conversation générale. Seuls le client concerné et les admins ont accès au fil ; les agents n’y accèdent pas. Les fils affichent les messages non lus, les dates et les accusés de lecture. L’actualisation se fait toutes les 30 secondes lorsque la page est visible et qu’aucun message n’est en cours de saisie. Les listes et messages sont paginés. Un admin peut fermer puis rouvrir un fil ; sa fermeture conserve l’historique.

Le site ne réalise pas de paiement et n’émet pas de devis financier contractuel. Il n’envoie pas d’e-mails ou de SMS automatiques. Les réponses et changements de statut sont consultables dans le compte.

## 4. Récupération des mots de passe

Le titulaire contacte l’administration depuis `/mot-de-passe-oublie`. Après vérification d’identité, l’admin peut créer un lien de récupération depuis la fiche utilisateur, puis le remettre en privé au titulaire. Ce lien expire après 30 minutes et n’est utilisable qu’une seule fois. Aucun e-mail n’est prétendument envoyé par l’application.

Pour un administrateur, ou depuis le serveur :

```bash
npm run account -- reset admin@exemple.fr
```

La commande affiche le lien confidentiel une seule fois. Sa consommation révoque toutes les sessions et tous les autres liens de récupération de ce compte. Le changement de mot de passe depuis un compte exige le mot de passe actuel et déconnecte les autres sessions.

## 5. Sécurité d’exploitation

Utiliser HTTPS en production : les cookies de session sont `HttpOnly`, `Secure` en production, `SameSite=Lax`, avec expiration de sept jours. Les jetons de session et de récupération sont hachés en base ; les mots de passe utilisent scrypt avec un sel aléatoire. Les droits sont relus côté serveur pour les opérations privées ; masquer un bouton n’est pas le contrôle d’accès.

Les formulaires utilisent les Server Actions Next.js et leur protection d’origine. Ne pas élargir `allowedOrigins` sans besoin. Les tentatives de connexion et créations sont limitées globalement et par adresse e-mail ; les mutations connectées le sont par compte. Si un reverse proxy de confiance écrase `X-Forwarded-For`, activer `RENTX_TRUST_PROXY=true` pour ajouter les limites par IP. Ne pas l’activer si les visiteurs peuvent fournir eux-mêmes ce header. Adapter les seuils au trafic réel et ajouter une protection en amont pour un site très exposé.

Les photos (JPG, PNG, WebP, 5 Mo maximum) sont décodées, validées, redimensionnées et converties en WebP. Leurs métadonnées sont retirées. Elles sont servies par `/api/media/UUID.webp` ; les photos de brouillons ou de fiches supprimées sont réservées aux agents. L’optimiseur Next.js n’accepte pas ces URLs afin d’éviter un cache public après retrait. Les anciens fichiers devenus inutilisés restent sur disque pour faciliter la récupération ; surveiller l’espace disque.

Ne pas servir le dossier de données ni les sauvegardes depuis le reverse proxy. Ne pas journaliser les mots de passe, cookies ou paramètres `token` des liens de récupération. Le journal `audit_log` conserve les opérations principales sans les secrets. Aucune vérification d’adresse e-mail automatique n’est mise en place : l’admin doit vérifier l’identité avant de donner des droits ou un lien de récupération.

## 6. Sauvegarde et restauration

```bash
npm run db:backup
# Ou destination personnalisée :
npm run db:backup -- /chemin/prive/sauvegardes
```

La commande utilise l’API de sauvegarde SQLite, puis copie les photos dans un dossier horodaté. Elle peut fonctionner pendant que l’application est active. Les photos ne sont pas supprimées automatiquement, ce qui permet de copier toutes les photos référencées par la sauvegarde. Programmer cette commande, conserver plusieurs versions et copier les sauvegardes sur un autre support privé. Le script seul ne met pas en place cette planification.

Pour restaurer : arrêter tous les processus de l’application ; conserver une copie du dossier de données actuel ; remplacer le dossier par `rentx.db` et `uploads/` de la sauvegarde ; vérifier propriétaire et droits ; redémarrer. Ne pas conserver les anciens fichiers `rentx.db-wal` et `rentx.db-shm` à côté d’une base restaurée. Invalider les sessions et liens récupérés d’une ancienne sauvegarde avant remise en service : exécuter `DELETE FROM sessions; DELETE FROM password_resets;` sur la base restaurée via un outil SQLite privé. Tester régulièrement une restauration sur une copie.

## 7. Données de l’ancienne version

Le code ne modifie aucun projet Supabase distant. L’ancienne migration SQL dans `supabase/migrations/` est conservée comme historique, elle ne s’exécute plus. Les anciens comptes, mots de passe, photos et fiches distants ne sont pas transférés automatiquement.

Pour des fiches supplémentaires, exporter un tableau JSON avec les champs `Equipment` (voir `src/lib/equipment-schema.ts`), dont `id`, `slug`, `created_at`, `updated_at` et `deleted_at`, puis :

```bash
npm run db:import -- /chemin/catalogue.json
```

L’import valide toutes les fiches et se déroule en une transaction. Il refuse un ID ou slug existant, sans écraser aucune fiche ; pour les six fiches déjà initialisées, mettre à jour leurs informations dans l’espace agent. Les champs d’auteur historiques ne sont pas repris. Pour les anciennes photos, les convertir en WebP, les copier dans `RENTX_DATA_DIR/uploads/` sous un nom UUID et utiliser `/api/media/UUID.webp` dans le JSON ; sinon mettre `image_path` à `null`. Les utilisateurs doivent recréer leurs comptes et recevoir leurs droits localement.

Faire l’import avec l’application arrêtée, puis reconstruire (`npm run build`) afin de ne pas conserver un catalogue prérendu antérieur.

## 8. Mise en ligne

Configurer le domaine HTTPS, `NEXT_PUBLIC_SITE_URL`, le volume persistant et les comptes. Exécuter les tests, `npm run build` puis `npm start`. Prévoir un gestionnaire de processus et des sauvegardes régulières. Le build utilise webpack par défaut, car Turbopack rencontre une restriction de création de processus/ports dans cet environnement. `npm run build:turbopack` reste disponible sur un hébergement compatible.

Vercel Functions n’est pas compatible avec cette base locale modifiable. Choisir un serveur/VPS ou un hébergeur Node.js avec volume persistant ; une adaptation du stockage est nécessaire avant tout déploiement serverless.
