import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, reducedMotion, revealLines } from "../motion";
import { useLang } from "../i18n";
import { flavors, packSrcSet, type FlavorId } from "../data/flavors";
import { Icon, Peanut } from "./Peanut";

const FIELD: Record<string, string> = { yellow: "#f8a91f", orange: "#ec6426", brown: "#632713" };

export function Flavors({ onDiscover }: { onDiscover: (id: FlavorId) => void }) {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      revealLines(section.querySelector(".flavors__title")!);
      // La couleur du champ coule d'une saveur à l'autre pendant le défilement
      const articles = gsap.utils.toArray<HTMLElement>(".flavor");
      articles.forEach((el) => {
        const color = FIELD[el.dataset.field!];
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onEnter: () => gsap.to(section, { backgroundColor: color, duration: reducedMotion() ? 0 : 0.9, ease: "power2.inOut", overwrite: "auto" }),
          onEnterBack: () => gsap.to(section, { backgroundColor: color, duration: reducedMotion() ? 0 : 0.9, ease: "power2.inOut", overwrite: "auto" }),
        });
        if (reducedMotion()) return;
        gsap.from(el.querySelector(".flavor__pack"), { yPercent: 14, scale: 0.9, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
        gsap.from(el.querySelector(".flavor__word"), { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
        gsap.from(el.querySelectorAll(".flavor__body > *"), { y: 26, opacity: 0, duration: 0.9, stagger: 0.09, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 65%", once: true } });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="flavors" className="flavors field field--yellow seam" style={{ "--seam-color": "var(--brown)" } as React.CSSProperties} aria-labelledby="flavors-title">
      <div className="container flavors__head">
        <h2 id="flavors-title" className="display display--lg flavors__title lines" data-fit>
          {t.flavors.title.map((line) => (
            <span className="line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <p className="lead">{t.flavors.intro}</p>
      </div>

      {flavors.map((f, i) => (
        <article key={f.id} className={`flavor flavor--${f.id}${i % 2 ? " flavor--reverse" : ""}`} data-field={f.field} aria-labelledby={`flavor-${f.id}`}>
          <div className="container flavor__inner">
            <div className="flavor__visual">
              <span className={`sticker flavor__label ${f.id === "paprika" ? "sticker--yellow" : "sticker--brown"}`} style={{ "--tilt": i % 2 ? "2deg" : "-3deg" } as React.CSSProperties}>
                {t.flavors.label} {f.index}
              </span>
              <Peanut className="peanut--a" />
              <Peanut className="peanut--b" />
              <span className="display flavor__word" aria-hidden="true">
                {f.short.en}
              </span>
              <img className="flavor__pack" src={`${f.img.base}-800.webp`} srcSet={packSrcSet(f)} sizes="(max-width: 56em) 60vw, 34vw" width={f.img.width} height={f.img.height} alt={f.alt[lang]} loading="lazy" decoding="async" />
            </div>
            <div className="flavor__body">
              <h3 id={`flavor-${f.id}`} className="display flavor__title" data-fit>
                <small>P’NUTS</small>
                {f.short.en}
              </h3>
              <p className="flavor__text">{f.description[lang]}</p>
              <p className="flavor__sub">
                {f.mood[lang]} <span aria-hidden="true">·</span> <span lang="fr">{f.packSubtitle}</span>
              </p>
              <div>
                <button type="button" className={`btn${f.id === "paprika" ? " btn--cream" : ""}`} onClick={() => onDiscover(f.id)}>
                  {t.flavors.cta}
                  <Icon.Arrow />
                </button>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
