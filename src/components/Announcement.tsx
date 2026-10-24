import { useLang } from "../i18n";
import { Peanut } from "./Peanut";

/** Barre d'annonce : défilement continu, contenu doublé pour une boucle sans couture. */
export function Announcement() {
  const { t } = useLang();
  const items = t.announcements;
  return (
    <div className="announce" role="region" aria-label="Announcements">
      <div className="announce__track">
        {[0, 1].map((copyIndex) => (
          <div className="announce__item" key={copyIndex} aria-hidden={copyIndex === 1}>
            {items.map((msg) => (
              <span className="announce__item" key={msg}>
                {msg}
                <Peanut />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
