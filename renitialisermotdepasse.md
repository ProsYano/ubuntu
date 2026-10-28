J'ai retrouvé la trace. Voici où tout se trouve :
📍 Où sont stockés les identifiants
Fichier de base de données : data/rentx.db (SQLite)
Les comptes y sont enregistrés dans la table users, créés via le script scripts/accounts.ts (commande npm run account -- create-admin ...).
👤 Ton compte admin
Champ	Valeur
Nom	Administrateur
Email	admin@komiena.org
Rôle	admin
Actif	✅ oui
Créé le	7 septembre 2026
C'est le seul compte dans la base — connexion sur /connexion.
🔑 Mot de passe
⚠️ Le mot de passe n'est stocké nulle part en clair — uniquement son hash (colonne password_hash). Il est donc impossible de le « relire ». C'est voulu par l'architecture du projet (voir docs/ACTIVATION.md) : aucun mot de passe par défaut n'existe.
🔄 Solution si tu as oublié le mot de passe
Depuis le serveur, lance :
npm run account -- reset admin@komiena.org
Cela génère un lien confidentiel valable 30 min (une seule utilisation) vers /reinitialiser-mot-de-passe — il s'affiche dans le terminal, tu n'as plus qu'à l'ouvrir dans ton navigateur pour définir un nouveau mot de passe.
(Alternative : supprimer le compte et le recréer avec npm run account -- create-admin admin@komiena.org "Administrateur", mais le reset est plus propre car il conserve toutes les données associées.)
Build · GLM-5.3-Flash Free · 56.0s · 41.3 tok/s
alors je fais quoi avec ce lien : yano-dev@Mac rentx-next % npm run account -- reset admin@komiena.org

> rentx-next@0.1.0 account
> node --import tsx scripts/accounts.ts reset admin@komiena.org

Lien confidentiel valable 30 minutes. Remettez-le uniquement au titulaire après vérification de son identité :
https://www.ubuntulocationbtp.com/reinitialiser-mot-de-passe?token=988eb04b5299393d54ee84f9f9f9af1a67c2f059d7b4bac3b67c9e503b1c19cb
yano-dev@Mac rentx-next % 
+Thought · 1.7s
Le lien est généré avec le domaine de production (https://www.ubuntulocationbtp.com) car ta variable NEXT_PUBLIC_SITE_URL est configurée ainsi. Comme tu es en local, remplace juste le début de l'URL par ton serveur local :
http://localhost:3000/reinitialiser-mot-de-passe?token=988eb04b5299393d54ee84f9f9f9af1a67c2f059d7b4bac3b67c9e503b1c19cb
Étapes
1. Vérifie que ton serveur tourne — dans un autre terminal :
npm run dev
2. Colle l'URL ci-dessus dans ton navigateur (avec localhost:3000).
3. Entre ton nouveau mot de passe (12 caractères minimum).
4. Reconnecte-toi sur http://localhost:3000/connexion avec admin@komiena.org.
⚠️ Points importants
- Le token expire dans 30 minutes et n'est utilisable qu'une seule fois. Si c'est trop tard, relance simplement la commande npm run account -- reset admin@komiena.org.
- Assure-toi que le dev server tourne bien sur le port 3000 ; si tu vois le site en production s'afficher, c'est que tu as laissé le domaine ubuntulocationbtp.com dans l'URL — utilise bien la version localhost.
- Ça invalidera automatiquement toutes les sessions existantes du compte, ce qui est normal.
Build · GLM-5.3-Flash Free · 3.1s · 139.0 tok/s