# VAYONIS Frontend

Frontend Next.js pour VAYONIS — la plateforme qui te permet de publier une fois et de rayonner partout.

## Stack technique

- [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- Polices: Bricolage Grotesque, Inter, IBM Plex Mono

## Fonctionnalités

- Authentification email/mot de passe
- Connexion Google (Google Identity Services)
- Onboarding multi-étapes (profil, âge, objectif, plateformes)
- Interface responsive et thème sombre

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

## Structure du projet

```
app/
  layout.tsx          # Layout racine + polices
  page.tsx            # Redirection vers /login
  globals.css         # Variables CSS, reset, tokens
  login/
    page.tsx          # Page de connexion + Google OAuth
  signup/
    page.tsx          # Onboarding 5 étapes + création de compte
lib/
  api.ts              # Client API, auth, tokens
```
