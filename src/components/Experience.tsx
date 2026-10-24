import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion, revealLines } from "../motion";
import { useLang } from "../i18n";

/** Les trois piliers : numéros qui roulent en place, grille éditoriale à filets. */
export function Experience() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealLines(root.current!.querySelector(".experience__title")!);
      if (reducedMotion()) return;
      gsap.utils.toArray<HTMLElement>(".pillar").forEach((row) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: "top 78%", once: true }, defaults: { ease: "expo.out" } });
        tl.from(row.querySelectorAll(".digit"), { yPercent: 110, duration: 1, stagger: 0.08 }, 0).from(row.querySelectorAll(".pillar__title, .pillar__text"), { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, 0.15);
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="experience" className="experience field field--cream seam" style={{ "--seam-color": "var(--brown)" } as React.CSSProperties} aria-labelledby="experience-title">
      <div className="container">
        <h2 id="experience-title" className="display experience__title lines" data-fit>
          {t.experience.title.map((line) => (
            <span className="line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <ol className="experience__list">
          {t.experience.items.map((item, i) => (
            <li className="pillar" key={item.title}>
              <span className="display pillar__num" aria-hidden="true">
                <span className="digit">0</span>
                <span className="digit">{i + 1}</span>
              </span>
              <h3 className="display pillar__title" data-fit>{item.title}</h3>
              <p className="pillar__text">{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
