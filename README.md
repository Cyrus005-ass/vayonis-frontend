# VAYONIS Frontend

Application Next.js pour [VAYONIS](https://github.com/Cyrus005-ass/vayonis-frontend) — la plateforme qui permet de publier une fois et de rayonner partout sur Facebook, Instagram et LinkedIn.

## Stack technique

- [Next.js 16.3.1](https://nextjs.org/) — App Router, Turbopack, rendering statique + client components
- [React 19.2.8](https://react.dev/)
- [TypeScript 5](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/postcss`
- Polices Google : Bricolage Grotesque, Inter, IBM Plex Mono
- Authentification Google via Google Identity Services

## Fonctionnalités

### Pages publiques
- **Page d'accueil** (`/`) — présentation du produit, principe, couverture actuelle, avancement, CTA
- **Politique de confidentialité** (`/privacy-policy`) — données collectées, usage, sécurité, droits
- **Suppression des données** (`/data-deletion`) — processus et délais de suppression de compte

### Authentification
- **Inscription** (`/signup`) — onboarding 5 étapes (profil, âge, objectif, plateformes, création de compte)
- **Connexion** (`/login`) — email/mot de passe + bouton "Continuer avec Google"
- Tokens JWT stockés dans `localStorage`

### Dashboard (`/dashboard`)
- **Comptes connectés** — visualisation et connexion de comptes Facebook, Instagram, LinkedIn
- **Création de publication** — texte, upload multiple d'images/vidéos, choix des plateformes cibles
- **Programmation** — choix d'une date/heure de publication ultérieure
- **Résultats** — statut de publication par plateforme (`published` / `failed`)
- **Déconnexion** — suppression du token et redirection vers `/login`

### UX / UI
- Thème sombre avec design tokens CSS (`globals.css`)
- Interface responsive
- Gestion des erreurs API avec messages lisibles (y compris erreurs de validation Pydantic)
- Linting ESLint + vérification TypeScript

## Démarrage rapide

```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.local.exemple .env.local

# Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — la page redirige automatiquement vers `/login`.

## Scripts disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement (Turbopack) |
| `npm run build` | Build de production |
| `npm run start` | Lancer le serveur de production |
| `npm run lint` | Linter ESLint |

## Variables d'environnement

Le fichier `.env.local` doit contenir :

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=ton-client-id-google
```

> **Note :** `.env.local` est ignoré par git. Utilise `.env.local.exemple` comme modèle.

## Structure du projet

```
app/
  layout.tsx               # Layout racine, polices Google, metadata
  page.tsx                 # Landing page publique + style global inline
  globals.css              # Design tokens CSS, reset, variables (--bg, --accent, etc.)
  login/
    page.tsx               # Formulaire de connexion + Google OAuth
  signup/
    page.tsx               # Onboarding 5 étapes + création de compte
  dashboard/
    page.tsx               # Tableau de bord : comptes, publications, résultats
  privacy-policy/
    page.tsx               # Page légale politique de confidentialité
  data-deletion/
    page.tsx               # Page légale suppression des données
lib/
  api.ts                   # Client API REST, helpers auth, types TypeScript
public/
  logo-on-dark.png          # Logo VAYONIS sur fond sombre
  logo-on-light.png         # Logo VAYONIS sur fond clair
```

## Points d'attention

### Google OAuth
Le composant `GoogleButton` utilise le script Google Identity Services (`accounts.google.com/gsi/client`).  
Le `NEXT_PUBLIC_GOOGLE_CLIENT_ID` doit être configuré dans `.env.local`.  
En local, si le client ID est manquant, une alerte s'affiche.  
En production, configurez l'URL de redirection autorisée dans Google Cloud Console.

### API backend
Le frontend attend une API compatible sur `NEXT_PUBLIC_API_URL` avec les endpoints :

- `POST /api/v1/auth/login` (form-urlencoded)
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/google`
- `GET /api/v1/social-accounts`
- `POST /api/v1/social-accounts/{platform}/connect`
- `POST /api/v1/posts`
- `POST /api/v1/posts/{id}/media`
- `POST /api/v1/posts/{id}/targets`
- `POST /api/v1/posts/{id}/publish`

### CI / Vercel
Le build est configuré pour autoriser le script `postinstall` de `unrs-resolver` via le champ `allowScripts` dans `package.json`.  
Si vous déployez sur Vercel, ajoutez les variables d'environnement dans les paramètres du projet.

## Licence

Propriétaire — © 2026 VAYONIS. Construit depuis le Bénin.
