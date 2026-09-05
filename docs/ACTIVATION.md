# Activation du catalogue Ubuntu Location BTP

Le site dispose d’un catalogue persistant via Supabase, d’une authentification par e-mail et mot de passe, d’un espace de gestion réservé aux comptes autorisés et de photographies stockées dans Supabase Storage. Aucune clé privilégiée n’est utilisée dans l’application.

## 1. Choisir le projet Supabase

Utiliser un projet dédié ou un projet explicitement choisi pour Ubuntu. Ne pas appliquer cette migration à un autre projet sans en vérifier la destination. La migration crée uniquement `ubuntu_editors`, `ubuntu_equipment`, leurs règles et le bucket `ubuntu-equipment` ; elle conserve les six catégories existantes sous forme de fiches initiales.

Appliquer `supabase/migrations/20260905110833_ubuntu_equipment_catalogue.sql` via le SQL Editor du projet choisi ou le mécanisme habituel de migration Supabase. Le SQL Editor n’enregistre pas l’historique CLI : choisir une seule méthode, sans exécuter deux fois la migration.

Les tables sont protégées par RLS et leurs droits SQL sont explicites. Seuls les comptes figurant dans `ubuntu_editors` peuvent publier ou modifier le catalogue. Aucun formulaire d’inscription publique n’est proposé. Même si une inscription a lieu directement via l’API Auth, elle ne donne aucun droit de gestion.

## 2. Configurer l’application

Renseigner `.env.local` en développement et les variables d’environnement du fournisseur d’hébergement en production :

```dotenv
NEXT_PUBLIC_SITE_URL=https://www.ubuntulocationbtp.com
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_PROJET.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=VOTRE_CLE_PUBLIABLE
GOOGLE_SITE_VERIFICATION=
```

Utiliser uniquement la clé **publishable**. Aucune clé `service_role`, clé secrète ou mot de passe de base de données n’est nécessaire. Ne jamais transmettre un mot de passe dans le code ou le dépôt.

Avant activation, le site présente les six fiches initiales et la connexion affiche son état de configuration. Une fois les variables renseignées, le catalogue provient exclusivement de la base : un catalogue vide reste vide et une panne n’est pas masquée par des données de démonstration. Reconstruire et redémarrer l’application après tout changement de configuration.

## 3. Créer les accès de l’équipe

Dans Supabase Auth, créer ou inviter le compte de chaque personne autorisée. Les mots de passe se définissent dans le parcours sécurisé de l’utilisateur ; ne pas les stocker dans des scripts.

Dans le SQL Editor, inscrire le compte concerné dans la table d’autorisation, en remplaçant l’adresse d’exemple :

```sql
insert into public.ubuntu_editors (user_id)
select id from auth.users where lower(email) = lower('adresse-du-gestionnaire@example.com')
on conflict (user_id) do nothing;
```

Vérifier qu’une ligne a bien été ajoutée. La simple présence d’un compte Auth ne suffit pas.

Pour retirer l’accès, supprimer uniquement son entrée dans `ubuntu_editors`. La vérification de rôle est refaite pour chaque mutation ; une session encore valide ne conserve pas les droits révoqués.

## 4. Configurer les liens d’authentification

Dans Auth → URL Configuration, définir l’URL de production du site. Autoriser exactement :

- `https://www.ubuntulocationbtp.com/auth/callback`
- `https://www.ubuntulocationbtp.com/auth/confirm`
- Les équivalents `http://localhost:3000` ou `http://127.0.0.1:3000` uniquement pour le développement.

Le formulaire « Mot de passe oublié » utilise le callback PKCE. Ouvrir son lien dans le même navigateur que celui utilisé pour la demande. Le callback gère également les liens d’invitation contenant une session dans le fragment de l’URL, la vérifie via Supabase puis retire les jetons de l’adresse du navigateur.

Lors d’une invitation, utiliser `/auth/callback` comme destination. Si les modèles d’e-mail sont personnalisables, les liens suivants permettent la vérification serveur par `token_hash` :

```html
<!-- Réinitialisation -->
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">Définir mon mot de passe</a>
<!-- Invitation -->
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite">Activer mon accès</a>
```

Configurer un fournisseur SMTP de production et un expéditeur vérifié. Depuis le 3 juin 2026, les nouveaux projets gratuits utilisant le fournisseur d’e-mail Supabase par défaut ne peuvent plus personnaliser les modèles ; le callback standard fonctionne sans personnalisation. Les limites d’envoi et les limitations de tentatives sont gérées par Supabase Auth. Vérifier leurs réglages et la réception des e-mails avant l’ouverture de l’espace à l’équipe.

## 5. Utiliser le catalogue

1. Ouvrir `/connexion` et se connecter avec un compte autorisé.
2. Le lien « Gérer les engins » apparaît dans l’en-tête.
3. Cliquer sur « Ajouter un engin », renseigner nom, catégorie, présentation, description, capacités générales, caractéristiques, tarifs éventuels et photographie.
4. Choisir « Brouillon » ou « Publié », puis enregistrer.
5. Les fiches publiées alimentent l’accueil, le catalogue à défilement infini, la liste de demande de devis, leur page individuelle et le sitemap.
6. « Modifier » permet de remplacer ou retirer la photo et d’actualiser le texte, le SEO et la disponibilité.
7. « Supprimer » demande confirmation et déplace la fiche dans la corbeille. La restauration remet la fiche en brouillon.

Les photographies doivent être destinées à être publiques, même celles de brouillons : le bucket est public. Le serveur accepte JPG, PNG et WebP jusqu’à 5 Mo, vérifie le contenu, refuse les SVG et les images invalides, retire les métadonnées et produit un WebP de 1 920 × 1 440 pixels maximum. Chaque remplacement crée une nouvelle URL. Les images des anciennes versions sont conservées ; une purge administrative ultérieure peut retirer les objets qui ne sont référencés par aucune fiche, y compris en corbeille. Sauvegarder séparément la base et le stockage selon les besoins de l’entreprise.

Les URL des fiches restent stables lors d’un changement de nom. Les modifications concurrentes sont détectées pour éviter d’écraser silencieusement le travail d’un collègue.

## 6. Validation

```bash
npm run test
npm run typecheck
npm run lint
npm run build
# Alternative si Turbopack ne peut pas ouvrir ses ports locaux dans un environnement restreint :
npm run build:webpack
```

Les tests exécutent la migration avec PostgreSQL embarqué (PGlite), en simulant uniquement les schémas Supabase `auth` et `storage`. Ils contrôlent les véritables règles RLS, les permissions, la publication, la corbeille, la révocation et la protection des objets. Ils vérifient aussi la validation des champs et le traitement réel des images avec Sharp. Ils ne remplacent pas le test de connexion, la livraison d’e-mails et le téléversement sur le projet Supabase choisi.

Après activation, effectuer un cycle complet avec un engin de vérification : création d’un brouillon, ajout d’une photo, publication, modification, suppression et restauration ; contrôler simultanément la fiche publique et le sitemap. Vérifier aussi un compte sans rôle de gestion et un visiteur anonyme. Exécuter les conseillers de sécurité Supabase sur le projet avant mise en production.
