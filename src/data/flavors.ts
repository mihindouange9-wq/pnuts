export type FlavorId = "honey" | "lemon" | "paprika";

export interface Flavor {
  id: FlavorId;
  index: string;
  /** Champ de couleur de la saveur. */
  field: "yellow" | "orange" | "brown";
  name: { en: string; fr: string };
  short: { en: string; fr: string };
  description: { en: string; fr: string };
  mood: { en: string; fr: string };
  /** Sous-titre imprimé sur le sachet (français). */
  packSubtitle: string;
  alt: { en: string; fr: string };
  img: { base: string; width: number; height: number };
}

const pack = (key: FlavorId, width: number, height: number) => ({ base: `/packs/${key}`, width, height });

export const flavors: Flavor[] = [
  {
    id: "honey",
    index: "01",
    field: "yellow",
    name: { en: "P’NUTS Honey", fr: "P’NUTS Honey" },
    short: { en: "Honey", fr: "Miel" },
    description: {
      en: "Sweet honey notes. Golden crunch. Pure snack-time satisfaction.",
      fr: "Des notes de miel sucrées. Un croquant doré. Le plaisir pur de la pause.",
    },
    mood: { en: "Warm, sweet, indulgent.", fr: "Chaleureux, sucré, gourmand." },
    packSubtitle: "Cacahuètes enrobées au miel",
    alt: {
      en: "P’NUTS Honey pouch: yellow and cream packaging with the P’NUTS logo, honey-coated peanuts in a wooden bowl, 200 g.",
      fr: "Sachet P’NUTS Honey : emballage jaune et crème avec le logo P’NUTS, cacahuètes enrobées au miel dans un bol en bois, 200 g.",
    },
    img: pack("honey", 812, 1182),
  },
  {
    id: "lemon",
    index: "02",
    field: "orange",
    name: { en: "P’NUTS Zesty Lemon", fr: "P’NUTS Zesty Lemon" },
    short: { en: "Zesty Lemon", fr: "Citron zesté" },
    description: {
      en: "A bright citrus twist with a playful, crunchy finish.",
      fr: "Une touche d’agrume éclatante et une finale croquante, pleine de malice.",
    },
    mood: { en: "Vibrant, fresh, energetic.", fr: "Vif, frais, énergique." },
    packSubtitle: "Cacahuètes sucrées au citron",
    alt: {
      en: "P’NUTS Zesty Lemon pouch: orange and yellow packaging with the P’NUTS logo, lemon-sugared peanuts in a wooden bowl, 200 g.",
      fr: "Sachet P’NUTS Zesty Lemon : emballage orange et jaune avec le logo P’NUTS, cacahuètes sucrées au citron dans un bol en bois, 200 g.",
    },
    img: pack("lemon", 811, 1185),
  },
  {
    id: "paprika",
    index: "03",
    field: "brown",
    name: { en: "P’NUTS Smoked Paprika", fr: "P’NUTS Smoked Paprika" },
    short: { en: "Smoked Paprika", fr: "Paprika fumé" },
    description: {
      en: "Smoky character. Bold flavor. An unexpected crunch.",
      fr: "Un caractère fumé. Un goût franc. Un croquant inattendu.",
    },
    mood: { en: "Deep, confident, distinctive.", fr: "Profond, assuré, distinctif." },
    packSubtitle: "Cacahuètes sucrées au paprika fumé",
    alt: {
      en: "P’NUTS Smoked Paprika pouch: brown and orange packaging with the P’NUTS logo, smoked-paprika peanuts in a wooden bowl, 200 g.",
      fr: "Sachet P’NUTS Smoked Paprika : emballage brun et orange avec le logo P’NUTS, cacahuètes au paprika fumé dans un bol en bois, 200 g.",
    },
    img: pack("paprika", 808, 1179),
  },
];

export const flavorById = (id: FlavorId) => flavors.find((f) => f.id === id)!;

/** Attributs responsive d'un sachet détouré (WebP 480/800/1200). */
export const packSrcSet = (f: Flavor) => `${f.img.base}-480.webp 480w, ${f.img.base}-800.webp 800w, ${f.img.base}-1200.webp ${f.img.width}w`;
