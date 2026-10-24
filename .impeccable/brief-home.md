# Surface brief — page d'accueil P'NUTS (src/App.tsx)

Scope : page unique (one-page) du site vitrine P'NUTS, mode **Persuade**. Audience : jeunes urbains gabonais curieux d'un snack qui a du caractère ; second lecteur : futurs partenaires de distribution. Job : reconnaître les trois sachets, retenir l'attitude, laisser un contact (newsletter ou partenariat). Preuve : les trois packagings réels détourés ; aucune autre preuve commerciale n'existe (pas d'avis, pas de points de vente, pas de photos lifestyle). Contraintes pinnées par le brief : palette quatre couleurs exacte, Girthy Ultra Sans (absent → Archivo Variable étendu 125 %/900 en attendant les fichiers), structure de sections A→L et leurs textes anglais, référence d'ambition drinkjoyrush.com sans clonage, motion GSAP contrôlée, reduced-motion, FR optionnel.

## Direction contract

THESIS : la page est une **livrée** — comme les bandes de couleur qui habillent un taxi-bus ou une devanture peinte de Libreville, les quatre couleurs se succèdent en champs pleins séparés par des coutures en biais, et les sachets apparaissent dans des « fenêtres » arrondies. Refusé : le gabarit DTC cream + produit flottant au centre + cartes égales.

OWN-WORLD : champs opaques orange/jaune/crème/brun occupant des sections entières, coutures diagonales (−4° à −6°) entre champs, fenêtres à grands arrondis (radius 28–48 px) qui cadrent les sachets, autocollants (badges à contour brun 2 px, pivotés de ±3° au plus) comme vocabulaire des étiquettes, boutons « pilule » façon décalque, numéros de ligne géants pour les trois piliers, silhouette de cacahuète dessinée en SVG comme unique motif décoratif. Typo : Girthy Ultra Sans (ou Archivo 125 %/900) en capitales serrées, Inter pour le reste. Aucun gris : les textes secondaires sont teintés de la couleur du champ.

STORY : « voilà un snack qui a une attitude » → « il y a trois saveurs distinctes et je les reconnais » → « c'est une vraie marque, je m'inscris / je deviens partenaire ».

FIRST VIEWPORT : barre d'annonce brune fine (marquee), nav transparente sur le hero ; hero crème pleine hauteur ; à gauche, titre « SMALL NUTS. / BIG ATTITUDE. » sur cinq à six lignes de hauteur, sous-texte, deux boutons (DISCOVER THE FLAVORS plein brun, OUR STORY contour) ; à droite, une grande fenêtre orange arrondie (livrée) d'où émergent les trois sachets en éventail, le sachet HONEY devant, le bas de la fenêtre traversé par une bande jaune en biais ; deux silhouettes de cacahuète en crème flottent dans la fenêtre. Action primaire : bouton brun plein, à gauche, sous le titre.

FORM : livrée / décalques (candidat 7 de ma liste ordonnée : 1 devanture peinte, 2 cornet de cacahuètes de rue, 3 planogramme de rayon, 4 éclat de saveur littéral, 5 bandes de pagne, 6 affiche de concert, 7 livrée de taxi-bus et autocollants). Clé de tirage : e22735b0. Challengers : tuiles Metro (compétitif, gardé : « le titre est l'interface », titres rognés au bord dans le bandeau défilant) ; bassin d'encre (déclin, raise : la bascule de saveur est un morphing continu de couleur, jamais une coupe) ; six-pack d'instruments (déclin, raise : le sélecteur de saveur est une constellation fixe de trois stations) ; tenségrité (déclin, raise : les coutures en biais commandent la mise en page, pas la grille) ; quilt (déclin, raise : la section campagne est une mosaïque de pièces inégales) ; collage Merz (déclin, raise : les autocollants ont une inclinaison de quelques degrés, seule inclinaison permise).

Signature interaction : le sélecteur de saveur (section F) — trois stations ; choisir une saveur fait couler la couleur de fond, pivote et remplace le sachet, et le titre change, le tout en une seule timeline GSAP.

FINISH : unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Points ouverts
Fichiers Girthy Ultra Sans, service newsletter, liens sociaux, e-mail de contact, textes légaux, nom de domaine.
