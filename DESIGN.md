---
name: P’NUTS
description: Site vitrine one-page de P’NUTS — une « livrée » de quatre champs de couleur pleins, cousus en biais, où les sachets réels apparaissent dans des fenêtres arrondies.
colors:
  orange: "#ec6426"
  yellow: "#f8a91f"
  cream: "#fde3cf"
  brown: "#632713"
  brown-70: "rgb(99 39 19 / 0.7)"
  brown-40: "rgb(99 39 19 / 0.4)"
  brown-18: "rgb(99 39 19 / 0.18)"
  brown-10: "rgb(99 39 19 / 0.1)"
  cream-80: "rgb(253 227 207 / 0.8)"
  cream-30: "rgb(253 227 207 / 0.3)"
  cream-15: "rgb(253 227 207 / 0.15)"
typography:
  display-xl:
    fontFamily: "Girthy Ultra Sans, Archivo Variable, sans-serif"
    fontSize: "clamp(3.5rem, 2rem + 8.4vw, 9.75rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.015em"
    fontVariation: "font-stretch 125% (Archivo) ; normal quand Girthy est chargée"
  display-lg:
    fontFamily: "Girthy Ultra Sans, Archivo Variable, sans-serif"
    fontSize: "clamp(3.25rem, 2rem + 6.2vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.015em"
  display-md:
    fontFamily: "Girthy Ultra Sans, Archivo Variable, sans-serif"
    fontSize: "clamp(2.5rem, 1.6rem + 4vw, 5.25rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.015em"
  display-sm:
    fontFamily: "Girthy Ultra Sans, Archivo Variable, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2.2vw, 3rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "0"
  lead:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
  emphasis:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 1.1rem + 1vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.25
  label:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "0.08em"
    lineHeight: 1.1
  label-xs:
    fontFamily: "Inter Variable, Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 800
    letterSpacing: "0.16em"
rounded:
  sticker: "0.75rem"
  window: "clamp(1.5rem, 4vw, 3rem)"
  tile: "calc(clamp(1.5rem, 4vw, 3rem) * 0.7)"
  pill: "999px"
  focus: "4px"
spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
  "16": "4rem"
  "24": "6rem"
  section-y: "clamp(5rem, 10vw, 9.5rem)"
  gutter: "clamp(1rem, 4vw, 4rem)"
  container: "88rem"
  seam: "clamp(4rem, 9vw, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.brown}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  button-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.75rem"
  button-cream-hover:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.brown}"
  sticker:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
    typography: "{typography.label}"
    rounded: "{rounded.sticker}"
    padding: "0.45em 0.9em"
  sticker-yellow:
    backgroundColor: "{colors.yellow}"
    textColor: "{colors.brown}"
    rounded: "{rounded.sticker}"
  sticker-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.brown}"
    rounded: "{rounded.sticker}"
  sticker-brown:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
    rounded: "{rounded.sticker}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 1rem"
    height: "2.75rem"
  chip-hover:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
  input-row:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
    rounded: "{rounded.pill}"
    padding: "0.4rem"
  window:
    backgroundColor: "{colors.orange}"
    rounded: "{rounded.window}"
  panel-cream:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.brown}"
    rounded: "{rounded.window}"
    padding: "clamp(1.5rem, 4vw, 3rem)"
  lab-tab:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.25rem 0.75rem 0.75rem"
    height: "4.25rem"
  lab-tab-selected:
    backgroundColor: "{colors.brown}"
    textColor: "{colors.cream}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.brown}"
    typography: "{typography.label}"
    padding: "0.5rem 0"
---

# Design System: P’NUTS

## Overview

**Creative North Star: « La livrée »**

Le site est habillé comme un taxi-bus ou une devanture peinte de Libreville : les quatre couleurs officielles se succèdent en champs pleins qui occupent des sections entières (crème, brun, jaune, orange, brun, crème, jaune, orange, crème, brun), séparés par des coutures diagonales d’environ 5°. Les sachets réels, détourés, sont la seule preuve commerciale ; ils apparaissent dans de grandes « fenêtres » arrondies ou sortent d’elles. Autour, le vocabulaire est celui des décalques : autocollants inclinés à contour brun de 2 px, boutons pilule, numéros géants, et une seule silhouette dessinée (la cacahuète SVG) qui tient lieu de tout ornement.

La densité est faible et le rythme large : un titre d’affichage par section, un paragraphe d’accroche de 34 à 44 caractères de large, une action. La typographie d’affichage est ultra-grasse, étendue et en capitales ; elle est si grande qu’elle est ajustée à l’exécution (`data-fit`) pour qu’aucun mot ne déborde de sa colonne, en anglais comme en français. Le texte courant reste en Inter, sobre et foncé, jamais gris : sur un champ coloré, il est brun ou crème, et quand il doit devenir discret il est teinté par transparence de la même teinte (`brown-70`, `cream-80`).

Refus confirmés par la construction : pas de gabarit DTC « fond crème + produit flottant + cartes égales » ; aucun gris, aucun blanc pur, aucune cinquième couleur ; aucune icône pictographique en dehors des neuf traits d’interface (flèches, menu, croix, coche, alerte, info, courrier) ; aucun visuel de substitution à la place des sachets.

**Key Characteristics:**
- Quatre couleurs opaques en champs pleins ; la couleur change de section en section, jamais au sein d’un bloc.
- Coutures diagonales ≈5° (`clip-path` sur un pseudo-élément de hauteur `seam`) entre deux champs.
- Fenêtres à grands arrondis (24–48 px) qui cadrent les sachets ; panneaux crème du même rayon pour le texte courant posé sur l’orange.
- Autocollants inclinés (−3° à +4°), contour brun 2 px, ombre brune portée.
- Titres en capitales ultra-grasses, interlignage 0.9, une ligne colorée (orange ou jaune) par titre de deux lignes.
- Mouvement GSAP retenu : révélations masquées ligne par ligne, couleur de champ qui « coule », parallaxe légère ; tout devient instantané en `prefers-reduced-motion`.

## Colors

Une palette fermée de quatre teintes chaudes ; toute nuance intermédiaire est une transparence de la teinte brune ou crème, jamais un gris.

### Primary
- **Orange P’NUTS** (`orange`) : la couleur de la marque et de l’action. Fond de la fenêtre du hero, champ de la saveur Zesty Lemon et de la section « Où nous trouver », deuxième ligne des titres sur crème, soulignement animé des liens de navigation, remplissage de survol du bouton principal, cacahuète du mot-symbole, barre de défilement, curseur, `accent-color`. Jamais support de texte courant : le brun ne lit dessus qu’en grande taille (≈3.5:1).

### Secondary
- **Jaune miel** (`yellow`) : champ de la saveur Honey, du labo au repos et de la campagne ; bande diagonale dans la fenêtre du hero ; deuxième ligne des titres sur brun ; sous-titres de colonnes, liens survolés et cacahuète du mot-symbole sur fond brun ; contour des mots « creux » du bandeau. Le brun lit dessus à ≈5.9:1.

### Tertiary
- **Brun cacao** (`brown`) : la teinte du texte et des surfaces d’autorité. Couleur de tout texte sur crème, jaune et orange ; champ du bandeau, de l’histoire, du pied de page et de la saveur Smoked Paprika ; fond du bouton principal, de l’onglet sélectionné et du menu mobile ; contour de tous les autocollants, chips, champs de formulaire et filets (2 px). Crème dessus ≈9.3:1, jaune dessus ≈5.9:1.

### Neutral
- **Crème** (`cream`) : la seule « neutre ». Fond du corps, du hero, de l’expérience et de la newsletter ; panneaux de lecture posés sur l’orange (`panel-cream`) ; texte sur brun ; cacahuètes flottantes du hero. Brun dessus ≈9:1.
- **Brun 70 % / 40 % / 18 % / 10 %** (`brown-70`, `brown-40`, `brown-18`, `brown-10`) : texte secondaire et placeholders (70 %), bordures pointillées des emplacements réservés (40 %), halo de focus du formulaire (18 %), voiles (10 %).
- **Crème 80 % / 30 % / 15 %** (`cream-80`, `cream-30`, `cream-15`) : texte secondaire sur brun (80 %), filets et bordures des accordéons légaux du pied de page (30 %), voiles (15 %).

### Named Rules
**La règle des quatre.** Aucune couleur hors `orange`, `yellow`, `cream`, `brown` n’apparaît, pas même en ombre : les ombres sont du brun translucide (`rgb(99 39 19 / α)`), les gris sont des transparences de brun ou de crème.

**La règle du panneau crème.** Le texte courant ne se pose jamais directement sur l’orange ; il est placé dans un panneau crème au rayon `window`. Sur orange, seul le brun en taille d’affichage (≥ `display-sm`) ou en autocollant est admis. Crème sur orange n’est jamais utilisé pour du texte.

**La règle du champ.** La couleur du texte secondaire est tirée du champ : brun translucide sur crème/jaune, crème translucide sur brun. Un `opacity` léger (0.85–0.9) est toléré sur de petits labels, jamais un gris nommé.

## Typography

**Display Font:** Girthy Ultra Sans (Tom Gordon Design), chargée automatiquement si ses fichiers sont présents dans `src/assets/fonts/` ; en son absence, **Archivo Variable** à `font-stretch: 125%` et graisse 900 en remplaçante déclarée. La page porte alors la classe `has-girthy` ou non : avec Girthy, `font-stretch: normal`, `letter-spacing: 0.005em`, `line-height: 0.92`.
**Body Font:** Inter Variable (avec Inter, system-ui, -apple-system, « Segoe UI », sans-serif).

**Character :** une voix de rue, criée en capitales ultra-grasses et étendues, posée sur un texte courant net et semi-gras. Les titres se lisent comme des lettrages peints ; Inter ne monte jamais au-dessus de 600–800 et ne se met en capitales que pour les étiquettes.

### Hierarchy
- **Display XL** (900, `display-xl`, 0.9) : titre du hero (« SMALL NUTS. / BIG ATTITUDE. ») et de l’histoire ; deux lignes, la seconde colorée (orange sur crème, jaune sur brun). Capitales, `text-wrap: balance`, ajusté par `data-fit`.
- **Display LG** (900, `display-lg`, 0.9) : titres de section (saveurs, labo, expérience, campagne, distribution, newsletter) et nom de chaque saveur. La campagne redéfinit localement `display-lg` à `clamp(2.75rem, 1.5rem + 5vw, 6.5rem)` pour tenir à côté de l’accroche.
- **Display MD** (900, `display-md`, 0.9) : nom de la saveur active dans le labo.
- **Display SM** (900, `display-sm`, 0.9, interlettrage 0) : réservé aux titres de pilier (`clamp(1.75rem, 1rem + 3vw, 4rem)`) et aux usages en colonne étroite.
- **Mots-décor** (900, `clamp(3.5rem, 11–12.5vw, 10–13rem)`) : mots d’affichage géants derrière les sachets (opacité 0.35 ou contour 2 px, opacité 0.45) et bandeau défilant (crème, un mot sur deux en « creux » `-webkit-text-stroke: 2px yellow`). Toujours `aria-hidden`.
- **Numéros de pilier** (900, `clamp(3.5rem, 9vw, 8rem)`, 0.85, chiffres tabulaires) : 01 orange, 02 jaune, 03 brun.
- **Emphasis** (600, `emphasis`, 1.25) : descriptions de saveur et du labo, 24–30 caractères de large.
- **Lead** (400, `lead`, 1.5) : accroche sous chaque titre, `max-width: 34ch` (40ch sous le titre des saveurs, 44ch dans l’histoire), `text-wrap: pretty`.
- **Body** (400, `body`, 1.55) : texte courant, `max-width: 62ch`.
- **Label** (700–800, `label`, 0.08–0.1em, capitales) : autocollants, boutons, liens de navigation, chips.
- **Label XS** (800, `label-xs`, 0.12–0.16em, capitales) : barre d’annonce, titres de colonnes du pied de page, titre « Suivez-nous », emplacements réservés, index d’onglet, bouton de langue.

### Named Rules
**La règle du mot entier.** Tout titre d’affichage porte `data-fit` : il repart de sa taille CSS puis est réduit par paliers de 4 % (plancher 26 px) jusqu’à ce qu’aucun mot ne déborde de sa colonne, après chargement des polices, au redimensionnement et au changement de langue. On ne coupe jamais un mot et on n’ajoute jamais de césure.

**La règle de la ligne colorée.** Un titre de deux lignes colore sa seconde ligne : orange sur champ crème, jaune sur champ brun. Jamais la première, jamais les deux.

**La règle de la révélation masquée.** Chaque ligne de titre est un `.line` à `overflow: hidden` dont le `span` entre par `yPercent: 110`, rotation 2°, `expo.out`, 1 s, décalage 0.08 s, une seule fois au passage dans la fenêtre.

## Layout

Page unique à défilement vertical, dix champs successifs. Le conteneur fait `min(100% - 2 × gutter, 88rem)` avec `gutter = clamp(1rem, 4vw, 4rem)` ; les sections prennent `section-y = clamp(5rem, 10vw, 9.5rem)` de marge verticale, et celles qui portent une couture ajoutent la hauteur `seam = clamp(4rem, 9vw, 10rem)` en haut (le bandeau et le pied de page la compensent explicitement).

Grilles de section à deux colonnes asymétriques : hero et histoire `7fr / 5fr`, campagne `3fr / 2fr`, saveurs, distribution et newsletter `1fr / 1fr`, labo `1fr / 1.2fr / 1fr`, piliers `2fr / 6fr / 4fr`, pied de page `2fr / 1fr / 1fr`. Toutes les pistes sont écrites `minmax(0, 1fr)` et chaque cellule porte `min-width: 0`, pour que la typographie géante ne puisse jamais élargir une colonne. La mosaïque de campagne est une grille de six colonnes à `grid-auto-rows: minmax(9rem, 14vw)`, `grid-auto-flow: dense`, sept pièces inégales (largeurs 1, 2, 3, 4 colonnes ; une pièce sur deux rangées).

Points de rupture observés : 64em (hero et labo passent à une colonne, la scène du labo remonte en premier, les liens de navigation disparaissent au profit du menu plein écran, la hauteur de nav passe de 4.5rem à 4rem à 48em) ; 56em (saveurs, histoire, piliers, campagne, distribution, newsletter et pied de page à une colonne ; mosaïque à deux colonnes ; le champ de formulaire s’empile et prend le rayon `window`) ; 40em (le hero perd sa hauteur minimale, les boutons du hero deviennent pleine largeur) ; 36em (pied de page à une colonne) ; 30em (onglets du labo à nouveau empilés en pilules). Le hero vise `100svh − 2.25rem (annonce) − nav` ; la scène des sachets garde un ratio 5/6 sur ordinateur, 4/4.2 sur mobile.

Rythme : l’échelle d’espacement va de 0.25rem à 6rem par pas de 4, 8, 12, 16, 24, 32, 48, 64, 96 px ; les écarts internes des blocs de texte sont `6` (1.5rem) ou `8` (2rem), les en-têtes de section se détachent de leur contenu par `12` (3rem). Toute cible tactile fait au moins 2.75rem (44 px).

## Elevation & Depth

Le système est plat par champs : la profondeur vient de la superposition de champs opaques (couture qui « mord » sur le champ suivant), des fenêtres qui découpent un champ dans un autre et des sachets qui dépassent de leur fenêtre. Les ombres existent, mais toutes sont du brun translucide et servent soit à détacher un sachet détouré, soit à décoller un autocollant ou un élément survolé.

### Shadow Vocabulary
- **Ombre de sachet** (`filter: drop-shadow(0 28px 32px rgb(99 39 19 / 0.35))`) : sachets du hero et du labo.
- **Ombre de sachet douce** (`filter: drop-shadow(0 18px 22px rgb(99 39 19 / 0.28))`) : sachets des trois sections saveurs.
- **Ombre d’autocollant** (`box-shadow: 0 10px 24px -8px rgb(99 39 19 / 0.45)`) : tous les autocollants.
- **Ombre de survol** (`box-shadow: 0 14px 28px -12px rgb(99 39 19 / 0.7)`) : bouton survolé/focalisé, qui se soulève de 2 px.
- **Ombre d’onglet actif** (`box-shadow: 0 16px 30px -14px rgb(99 39 19 / 0.7)`) : onglet de saveur sélectionné.
- **Halo de focus du formulaire** (`box-shadow: 0 0 0 4px rgb(99 39 19 / 0.18)`, invalide : `0 0 0 4px rgb(236 100 38 / 0.25)` avec bordure orange).

### Named Rules
**La règle de l’ombre brune.** Aucune ombre noire ou grise : toute ombre est `rgb(99 39 19 / α)`, portée vers le bas, floue, jamais décalée en dur.

**La règle de la couture.** La transition entre deux champs est une couture diagonale : un `::before` de hauteur `seam`, de la couleur du champ précédent (`--seam-color`), découpé par `polygon(0 0, 100% 0, 100% 4%, 0 100%)` (ou son miroir `seam--reverse`), soit ≈5° à 1440 px. Jamais de dégradé, jamais de trait horizontal entre deux champs.

## Shapes

Trois rayons et rien d’autre : **pilule** (`999px`) pour tout ce qui se presse (boutons, chips, onglets, bouton de langue, champ de formulaire, bouton « passer au contenu », pouce de la barre de défilement) ; **autocollant** (`0.75rem`) pour les étiquettes, les emplacements réservés et les accordéons légaux ; **fenêtre** (`clamp(1.5rem, 4vw, 3rem)`, soit 24–48 px) pour les fenêtres qui cadrent les sachets, les panneaux crème, la scène du labo, les onglets empilés sur mobile et le champ de formulaire empilé ; les tuiles de la mosaïque prennent 70 % du rayon fenêtre. Les boutons ronds (menu, fermer) et les pastilles de couleur du labo sont des cercles de 2.75rem (2rem sur mobile).

Les bordures font toujours 2 px, pleines, de la couleur du texte du champ (brun sur clair, crème sur brun) ; les emplacements réservés et les chips « bientôt » sont en pointillés. Les filets de liste (piliers, haut du pied de page, nav défilée) sont également des traits de 2 px. L’inclinaison n’est permise qu’aux autocollants (−3° à +4° par `--tilt`, 0° dans le labo), à la bande jaune du hero (−6°), aux sachets latéraux du hero (±11°) et aux cacahuètes décoratives ; aucun autre élément ne pivote.

La seule silhouette dessinée est la cacahuète SVG (`viewBox 0 0 64 64`, remplie en `currentColor`) : apostrophe du mot-symbole (orange sur clair, jaune sur brun, 0.5em, levée de 0.55em et pivotée de 14°), séparateur de la barre d’annonce et du bandeau, motifs flottants semi-transparents dans les fenêtres (opacité 0.35–0.9), bouchons des tuiles réservées.

## Components

### Buttons
Des décalques pilule : massifs, en capitales espacées, qui se remplissent d’une autre couleur de la palette au survol.
- **Shape :** pilule (`999px`), bordure 2 px, hauteur minimale 3.25rem, padding `0.9rem 1.75rem`, label 0.875rem / 800 / 0.1em / capitales, icône trait 1.1em à droite.
- **Primary (`btn`) :** fond brun, texte crème, bordure brune. Au survol/focus, un calque orange monte depuis le bas (`translateY(101%) → 0`, 320 ms `ease-out`), le texte passe au brun, le bouton se soulève de 2 px et prend l’ombre de survol. Actif : `scale(0.98)` en 180 ms. Désactivé : opacité 0.6, pas de calque.
- **Ghost (`btn--ghost`) :** fond transparent, texte et bordure bruns ; même remplissage orange au survol. Sur brun (`btn--on-brown`), texte et bordure crème, remplissage jaune.
- **Cream (`btn--cream`) :** fond et bordure crème, texte brun, remplissage jaune au survol ; utilisé sur les champs bruns (saveur Paprika, menu mobile).
- **Yellow (`btn--yellow`) :** fond jaune, bordure brune, remplissage crème au survol.
- **Nav CTA (`nav__cta`) :** variante compacte, 2.75rem de haut, padding `0.6rem 1.25rem`.

### Stickers (autocollants)
L’étiquette collée de travers : le vocabulaire des badges du site.
- **Style :** fond crème, texte brun 0.875rem / 700 / 0.08em / capitales, bordure brune 2 px, rayon 0.75rem, padding `0.45em 0.9em`, ombre d’autocollant, `rotate(var(--tilt, -2deg))`.
- **Variantes :** `sticker--yellow` (fond jaune), `sticker--orange` (fond orange, texte brun), `sticker--brown` (fond brun, texte et bordure crème), `sticker--big` (police d’affichage, `clamp(1.375rem, 1.1rem + 1vw, 1.875rem)`).
- **Inclinaisons observées :** hero +4° (−3° sur mobile), étiquettes de saveur −3° / +2°, histoire −3°, mosaïque −2°, pied de page −2°, faits du labo 0°.

### Chips
- **Style :** pilule 2.75rem, bordure brune 2 px, texte 0.875rem / 800 / 0.06em, padding `0.5rem 1rem`.
- **State :** lien survolé → fond brun, texte crème (320 ms). `chip--soon` : bordure pointillée, texte `brown-70`, mention « bientôt » en orange 0.7em capitales.

### Windows / Panels / Tiles (conteneurs)
- **Fenêtre (`window`, `flavor__visual`, `lab__stage`) :** rayon `window`, `overflow: hidden`, fond d’une couleur de la palette différente du champ (orange sur crème dans le hero ; crème sur jaune, jaune sur orange, orange sur brun dans les saveurs), un mot-décor et deux cacahuètes derrière le sachet, étiquette autocollant dans le coin supérieur gauche. Le sachet survolé se soulève (`translateY(-1.5%) rotate(-2.5deg) scale(1.03)`, 640 ms).
- **Panneau crème (`find__panel`, `lab__info` sur orange, `flavor__body` Lemon) :** fond crème, rayon `window`, padding `clamp(1.5rem, 4vw, 3rem)` (`clamp(1.25rem, 3vw, 2rem)` dans le labo), aucune bordure ni ombre.
- **Tuile de mosaïque (`tile`) :** rayon `0.7 × window`, fond jaune/orange/brun/crème (la crème porte une bordure brune 2 px), image de sachet zoomée `scale(1.9) → 2` au survol, étiquette autocollant en bas à gauche ; variante `tile--statement` brune avec un mot d’affichage aligné en bas à gauche.
- **Emplacement réservé (`slot`) :** 5.5rem minimum, bordure pointillée `brown-40` 2 px, rayon autocollant, label XS `brown-70`.

### Inputs / Fields
- **Style (`form__row`) :** une pilule crème à bordure brune 2 px et padding 0.4rem qui enveloppe l’entrée (transparente, 600, placeholder `brown-70`, padding `0.75rem 1.25rem`) et le bouton principal.
- **Focus :** halo `0 0 0 4px brown-18` sur la pilule entière.
- **Error :** bordure orange, halo `rgb(236 100 38 / 0.25)`, message brun 0.875rem / 700 avec icône trait (alerte, coche ou info), zone `role="status"` de 1.5rem réservée.
- **Mobile (≤ 56em) :** la pilule s’empile et prend le rayon `window`, le bouton devient pleine largeur.

### Navigation
- **Barre :** collante, 4.5rem (4rem ≤ 48em), transparente sur le hero ; après 24 px de défilement, fond crème et filet brun 2 px (640 ms `ease-out`). Mot-symbole 1.75rem à gauche ; liens 0.875rem / 700 / 0.08em / capitales avec soulignement orange 3 px qui se déploie de gauche à droite (`scaleX`, 320 ms) au survol, focus et sur la section courante ; bouton de langue pilule 3rem × 2.75rem à bordure courante (inversé en brun/crème au survol) ; CTA pilule compacte.
- **Barre d’annonce :** 2.25rem, brune, texte crème XS 0.16em, défilement `marquee` 38 s linéaire, cacahuètes jaunes en séparateurs ; arrêt net en mouvement réduit.
- **Mobile (≤ 64em) :** bouton rond 2.75rem, panneau brun plein écran qui descend (`translateY(-100%) → 0`, 640 ms, `ease-in-out` en fermeture, `ease-out` en ouverture), liens en police d’affichage `clamp(2.5rem, 11vw, 4.5rem)` crème → jaune au survol, CTA crème et bouton de langue en pied ; Échap ferme et rend le focus.

### Flavor Lab (signature)
Trois stations fixes ; choisir une saveur fait couler la couleur du champ, sort l’ancien sachet et fait entrer le nouveau en une seule timeline.
- **Onglets (`lab__tab`) :** pilules 4.25rem à bordure courante 2 px, pastille ronde 2.75rem de la couleur de la saveur, nom en police d’affichage `emphasis`, décalage `translateX(6px)` au survol ; sélectionné → fond brun / texte crème (ou crème / brun sur le champ brun) et ombre d’onglet. Clavier : flèches, Début, Fin ; glissement horizontal ≥ 40 px sur la scène.
- **Bascule :** `backgroundColor` de la section et `--lab-color` en 0.7 s `power2.inOut` ; sachet sortant `xPercent ∓40, rotate ∓10°, scale 0.9, opacity 0` en 0.55 s `power3.in` ; sachet entrant depuis `xPercent ±40, rotate ±10°` en 0.9 s `expo.out` à 0.3 s ; mot-décor et bloc d’information en fondu décalé. `--lab-color` teinte aussi la couture de la section suivante.
- **Sur orange :** le bloc d’information devient un panneau crème (règle du panneau crème).

### Statement Marquee (signature)
Bandeau brun pleine largeur, mots d’affichage crème `clamp(3.5rem, 12.5vw, 13rem)` séparés par des cacahuètes orange pivotées de −18°, un mot sur deux en creux (contour jaune 2 px) ; les mots se rognent au bord de l’écran. Boucle GSAP linéaire (durée `max(18 s, largeur / 90)`), accélérée ×1.6 au défilement vers le bas et inversée vers le haut ; statique en mouvement réduit.

### Motion (grammaire commune)
- Jetons : `ease-out = cubic-bezier(0.16, 1, 0.3, 1)`, `ease-in-out = cubic-bezier(0.65, 0, 0.35, 1)`, `dur-fast 180 ms`, `dur 320 ms`, `dur-slow 640 ms`. GSAP utilise `expo.out` pour les entrées (0.8–1.2 s), `power2.inOut` pour les coulées de couleur (0.7–0.9 s), `back.out(2)` pour l’autocollant du hero, `none` pour les parallaxes (`scrub` 0.6–1).
- Révélation de titre ligne par ligne, entrée des blocs (`y: 28, opacity: 0`, 0.9 s, décalage 0.08 s), sachets qui montent (`yPercent 12–18, scale 0.9`, 1.1–1.2 s), numéros de pilier qui roulent (`yPercent: 110`), tuiles qui apparaissent dans un ordre aléatoire (`scale 0.92`, 0.07 s). Tout déclencheur est `once: true`.
- Parallaxe retenue : sachets du hero +10 %, texte du hero −8 % et fondu à 0.4, cacahuètes ±24–110 px.
- `prefers-reduced-motion: reduce` : toute animation/transition passe à 0.01 ms, les boucles s’arrêtent, les révélations GSAP ne sont pas créées, le défilement devient `auto`.

## Do's and Don'ts

### Do:
- **Do** poser chaque section sur un champ plein d’une des quatre couleurs et la relier à la précédente par une couture diagonale ≈5° de la couleur du champ précédent.
- **Do** cadrer tout sachet dans une fenêtre au rayon `window` (24–48 px) d’une couleur différente du champ, et le laisser dépasser de la fenêtre si la composition le demande.
- **Do** placer le texte courant posé sur l’orange dans un panneau crème au rayon `window` ; le brun directement sur orange est réservé aux tailles d’affichage et aux autocollants.
- **Do** colorer la seconde ligne d’un titre de deux lignes (orange sur crème, jaune sur brun) et donner `data-fit` à tout titre d’affichage.
- **Do** incliner les autocollants de −3° à +4° au plus et leur donner le contour brun 2 px, le rayon 0.75rem et l’ombre d’autocollant.
- **Do** teinter le texte secondaire avec `brown-70` ou `cream-80`, et utiliser des bordures 2 px de la couleur du texte du champ.
- **Do** écrire toute piste de grille `minmax(0, 1fr)` et garder des cibles tactiles d’au moins 2.75rem.
- **Do** rendre chaque animation instantanée sous `prefers-reduced-motion` et n’animer que `transform`, `opacity` et `background-color`.

### Don't:
- **Don’t** introduire un gris, un noir, un blanc pur ou une cinquième couleur, même pour une ombre ou un filet.
- **Don’t** écrire du texte crème sur orange, ni du texte courant brun directement sur orange.
- **Don’t** séparer deux champs par un trait horizontal, un dégradé ou une vague.
- **Don’t** incliner autre chose que les autocollants, la bande jaune du hero, les sachets latéraux et les cacahuètes décoratives.
- **Don’t** ajouter un motif décoratif autre que la silhouette de cacahuète SVG, ni une icône hors des neuf traits d’interface existants.
- **Don’t** remplacer un sachet réel par une illustration, une photo de substitution ou un rendu générique.
- **Don’t** laisser un mot de titre déborder de sa colonne ou le couper par césure ; réduire la taille par `data-fit`.
- **Don’t** utiliser Arial Black, Impact ou toute face système dans la pile d’affichage ; seule Archivo Variable 125 %/900 remplace Girthy Ultra Sans en attendant ses fichiers.
