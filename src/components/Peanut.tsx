/** Silhouette de cacahuète : unique motif décoratif de la marque. Décorative par défaut (aria-hidden). */
export function Peanut({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={`peanut ${className}`} style={style} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M32 3c8.6 0 13.9 6.7 13.2 15.4-.4 4.3-3.4 7.1-3.4 10.8s5.5 7.6 4.8 15.6C45.8 54.1 39.2 61 32 61S18.2 54.1 17.4 44.8c-.7-8 4.8-11.9 4.8-15.6s-3-6.5-3.4-10.8C18.1 9.7 23.4 3 32 3Z"
      />
    </svg>
  );
}

/** Icônes d'interface : un seul trait, une seule graisse. */
export const Icon = {
  Arrow: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Down: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  ),
  Up: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  ),
  Menu: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  ),
  Alert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l10 18H2L12 3zM12 10v4M12 17.5v.5" />
    </svg>
  ),
  Info: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" />
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  ),
};

/** Mot-symbole : l'apostrophe est une cacahuète, comme sur le sachet. */
export function Wordmark({ className = "", as: Tag = "span" }: { className?: string; as?: "span" | "div" }) {
  return (
    <Tag className={`wordmark ${className}`}>
      <span aria-hidden="true">P</span>
      <Peanut />
      <span aria-hidden="true">NUTS</span>
      <span className="sr-only">P’NUTS</span>
    </Tag>
  );
}
