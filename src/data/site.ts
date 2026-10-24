/**
 * Réglages du site à fournir au déploiement (variables VITE_*). Rien n'est inventé :
 * tant qu'une valeur manque, l'interface l'annonce comme « à venir » au lieu de simuler.
 */
const env = (key: string) => ((import.meta.env[key] as string | undefined) ?? "").trim();

export const site = {
  /** Studio partenaire qui a conçu et réalisé le site. */
  partner: { name: "MÉTHODE AURA", url: "https://methode-aura.onrender.com", logo: "/partenaires/methode-aura.png" },
  /** Adresse e-mail partenariats/presse. Vide → bouton remplacé par une mention « bientôt ». */
  contactEmail: env("VITE_CONTACT_EMAIL"),
  /** Point de collecte newsletter (POST JSON { email, lang }). Vide → aucun envoi, message honnête. */
  newsletterEndpoint: env("VITE_NEWSLETTER_URL"),
  /** Réseaux sociaux : affichés en lien seulement s'ils sont renseignés. */
  social: [
    { name: "Instagram", url: env("VITE_SOCIAL_INSTAGRAM") },
    { name: "TikTok", url: env("VITE_SOCIAL_TIKTOK") },
    { name: "Facebook", url: env("VITE_SOCIAL_FACEBOOK") },
  ],
};
