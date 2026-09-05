# Référencement Ubuntu Location BTP

## Éléments intégrés

- HTML en français rendu côté serveur ; navigation accessible aux moteurs sans exécuter les interactions du navigateur.
- Titres et descriptions propres à chaque page, URL canonique, Open Graph et Twitter Cards.
- Image de partage de marque générée par Next.js et icône SVG du site.
- Données structurées `LocalBusiness`, `WebSite`, `BreadcrumbList`, `ItemList` et `Service` pour les locations. Les horaires, l’adresse et les téléphones viennent des informations de l’entreprise. Aucun prix, avis, classement, stock ou partenariat fictif n’est ajouté.
- Page individuelle `/equipments/[slug]` pour chaque engin publié, avec photographie, texte alternatif, présentation, description et caractéristiques. Les titres et descriptions SEO peuvent être personnalisés dans l’espace de gestion.
- Les capacités et informations financières confirmées sont visibles sur chaque fiche. Les tarifs renseignés en FCFA alimentent également les offres structurées ; aucun montant n’est inventé lorsque le tarif reste sur devis.
- Le catalogue `/equipments` charge neuf fiches puis poursuit automatiquement au défilement, avec reprise manuelle en cas d’erreur. Le contenu initial et la liste structurée restent rendus côté serveur pour le référencement.
- Sitemap comprenant les pages publiques et les engins publiés, avec dates de modification des fiches issues de la base.
- Brouillons et fiches supprimées absents des lectures publiques et du sitemap ; leur URL renvoie une page introuvable.
- Pages de compte en `noindex`, espace de gestion protégé, routes privées écartées de l’exploration.
- Images optimisées et dimensionnées, priorité de chargement sur le visuel principal, catalogue mis en cache cinq minutes et invalidé après une mutation.
- Suppression de l’ancien cache global d’un an sur toutes les images publiques. Les fichiers de stockage utilisent des noms uniques et les ressources Next.js conservent leur politique de cache native.

## Activation sur le vrai domaine

Définir `NEXT_PUBLIC_SITE_URL` avec l’origine HTTPS finale et sans chemin. Une seule variante du domaine doit servir le site ; configurer la redirection permanente des autres variantes chez l’hébergeur. La variable ne connecte pas le domaine à elle seule.

Créer ou vérifier la propriété du domaine dans Google Search Console. Pour la méthode HTML, renseigner `GOOGLE_SITE_VERIFICATION` avec le jeton fourni puis reconstruire le site. Pour la méthode DNS, ajouter l’enregistrement demandé chez le fournisseur DNS. Ces opérations nécessitent l’accès au domaine ou à la propriété Search Console.

Après publication, soumettre `https://www.ubuntulocationbtp.com/sitemap.xml`, inspecter l’accueil et une fiche d’engin, puis surveiller l’indexation, les erreurs d’exploration et les performances sur données réelles.

Vérifier les données structurées avec le Rich Results Test et Schema Markup Validator. Le balisage `Service` décrit correctement une location sans inventer un prix de vente ; il ne garantit pas un résultat enrichi Google.

## Améliorations éditoriales à poursuivre

Renseigner les modèles exacts, capacités, applications et photos réelles des engins. Éviter les copies de descriptions génériques, les listes de mots-clés et les pages de villes où l’entreprise ne propose pas de service confirmé.

Tenir les coordonnées à jour sur le site et les annuaires professionnels. Une fiche Google Business Profile peut soutenir la visibilité locale si l’établissement est éligible ; sa création et sa validation se font avec le propriétaire de l’entreprise.

Le code prépare l’exploration et la compréhension du site. L’indexation et le classement dépendent ensuite des moteurs, de la publication effective, de la qualité du contenu et de la notoriété du site ; aucune première place n’est garantie.

## Références

- Google Search Central : https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Métadonnées Next.js : documentation locale `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`
- Supabase SSR : https://supabase.com/docs/guides/auth/server-side/creating-a-client
