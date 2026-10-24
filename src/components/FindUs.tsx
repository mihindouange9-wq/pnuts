import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { revealBlock, revealLines } from "../motion";
import { useLang } from "../i18n";
import { site } from "../data/site";
import { Icon } from "./Peanut";

/** Distribution : aucun point de vente inventé ; emplacements réservés aux futurs partenaires. */
export function FindUs() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealLines(root.current!.querySelector(".find__title")!);
      revealBlock(".find__panel", root.current!);
      revealBlock(".slot", root.current!.querySelector(".slots")!, { y: 16, stagger: 0.06 });
    },
    { scope: root },
  );

  const mailto = site.contactEmail ? `mailto:${site.contactEmail}?subject=${encodeURIComponent(t.find.mailSubject)}` : "";

  return (
    <section ref={root} id="find" className="find field field--orange seam" style={{ "--seam-color": "var(--yellow)" } as React.CSSProperties} aria-labelledby="find-title">
      <div className="container find__grid">
        <h2 id="find-title" className="display find__title lines" data-fit>
          {t.find.title.map((line) => (
            <span className="line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <div className="find__panel">
          <p className="find__text">{t.find.text}</p>
          <ul className="slots" aria-label={t.find.slotsLabel}>
            {[1, 2, 3, 4].map((n) => (
              <li className="slot" key={n}>
                {t.find.slot}
              </li>
            ))}
          </ul>
          <p className="find__note">{t.find.note}</p>
          <div className="find__actions">
            {mailto ? (
              <a className="btn" href={mailto}>
                {t.find.cta}
                <Icon.Mail />
              </a>
            ) : (
              <a className="btn" href="#contact">
                {t.find.cta}
                <Icon.Down />
              </a>
            )}
            {!mailto && <span className="sticker sticker--yellow">{t.find.ctaSoon}</span>}
          </div>
        </div>
      </div>
    </section>
  );
}
