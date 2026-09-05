# Ubuntu Location BTP

Site Next.js en français avec catalogue d’engins, pages de location référencées et espace de gestion Supabase.

```bash
npm install
npm run dev
```

Ouvrir http://localhost:3000. L’espace professionnel se trouve sur `/connexion` et le catalogue d’administration sur `/gestion/engins`.

- [Activer Supabase et les comptes de gestion](docs/ACTIVATION.md)
- [Référencement et publication sur le domaine](docs/REFERENCEMENT.md)

## Vérification

```bash
npm run test
npm run typecheck
npm run lint
npm run build
```

`npm run build:webpack` fournit une alternative dans les environnements restreints où Turbopack ne peut pas ouvrir un port local.

Configurer les variables décrites dans `.env.example` avant activation. Les secrets restent dans `.env.local` ou dans l’environnement de l’hébergeur. En l’absence de Supabase, le site présente les six fiches initiales et indique que la connexion n’est pas encore activée.
