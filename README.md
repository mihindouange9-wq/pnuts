# P’NUTS — site vitrine

Site de lancement de **P’NUTS**, cacahuètes sucrées et aromatisées (Honey, Zesty Lemon, Smoked Paprika), Gabon.
Page unique bilingue (anglais par défaut, bascule FR mémorisée), Vite 6 + React 19 + TypeScript + GSAP/ScrollTrigger.

## Démarrer

```bash
npm install
npm run dev        # http://127.0.0.1:5215
npm run build      # vérification TypeScript puis build dans dist/
npm run preview    # sert dist/ sur http://127.0.0.1:5216
```

## Vérifier

```bash
npm run shots      # captures section par section (1440 et 390 px) dans .impeccable/review/shots/
npm run verify     # 44 contrôles : structure, polices, labo des saveurs (clic, clavier, tactile),
                   # navigation, formulaire, menu mobile, débordements à 5 largeurs, mouvement réduit, console
node tools/fullpage.mjs        # captures pleine page desktop.png / mobile.png
node tools/brand-assets.mjs    # régénère public/og.jpg et public/apple-touch-icon.png
node tools/cutout.mjs          # redétoure les sachets depuis ../P'NUTS/*.png → public/packs/*.webp
```

Les outils pilotent Chrome headless (`C:/Program Files/Google/Chrome/Application/chrome.exe`, variable `CHROME` pour un autre chemin).

## Réglages à fournir (variables `VITE_*`, voir `.env.example`)

| Variable | Rôle | Sans valeur |
| --- | --- | --- |
| `VITE_SITE_URL` | adresse publique (canonical, Open Graph, sitemap) | `https://pnuts.example` |
| `VITE_CONTACT_EMAIL` | e-mail partenariats : bouton « Become a partner » en `mailto:` | le bouton mène au contact, mention « ouvre bientôt » |
| `VITE_NEWSLETTER_URL` | point de collecte `POST { email, lang }` | le formulaire valide puis annonce qu'aucune inscription n'est enregistrée |
| `VITE_SOCIAL_INSTAGRAM`, `VITE_SOCIAL_TIKTOK`, `VITE_SOCIAL_FACEBOOK` | liens sociaux | puces « coming soon », aucun lien inventé |

## Police Girthy Ultra Sans

Exigence de marque. Les fichiers ne sont pas dans le projet : déposer `GirthyUltraSans.woff2` (et/ou `.woff`, `.otf`)
dans `src/assets/fonts/` puis rebuild — `src/fonts.ts` déclare le `@font-face` et active la police automatiquement.
En attendant, **Archivo Variable** (largeur 125 %, graisse 900) sert de remplaçant provisoire. Licence webfont :
Creative Market, Tom Gordon Design.

## Contenu

- Textes : `src/i18n.ts` (EN/FR). Produits : `src/data/flavors.ts`. Réglages : `src/data/site.ts`.
- Sachets détourés : `public/packs/{honey,lemon,paprika}-{480,800,1200}.webp` (sources dans `../P'NUTS/`).
- Rien d'inventé : pas de points de vente, d'avis, d'ingrédients, de certifications ni d'historique d'entreprise.
  Les textes légaux sont des mentions d'attente à remplacer avant le lancement.

## Déploiement

`render.yaml` décrit un site statique Render (build `npm ci && npm run build`, publication `dist/`, en-têtes de sécurité et cache).
