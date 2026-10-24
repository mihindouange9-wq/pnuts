# Girthy Ultra Sans

Déposer ici les fichiers web de **Girthy Ultra Sans** (Tom Gordon Design, licence webfont à acheter sur Creative Market) :

- `GirthyUltraSans.woff2` (recommandé) et/ou `GirthyUltraSans.woff`, `GirthyUltraSans.otf`

Rien d'autre à faire : `src/fonts.ts` détecte les fichiers à la compilation (`import.meta.glob`), déclare le `@font-face`
et ajoute la classe `has-girthy` sur `<html>`. Tant qu'ils sont absents, le site utilise Archivo Variable (largeur 125 %, graisse 900) comme remplaçant provisoire, sans erreur réseau.
