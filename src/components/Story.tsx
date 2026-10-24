import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion, revealBlock, revealLines } from "../motion";
import { useLang } from "../i18n";
import { Peanut } from "./Peanut";

export function Story() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealLines(root.current!.querySelector(".story__title")!);
      revealBlock(".story__aside > *", root.current!, { scrollTrigger: { trigger: root.current, start: "top 60%", once: true } });
      if (reducedMotion()) return;
      gsap.to(".story__peanuts .peanut:first-child", { y: -60, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
      gsap.to(".story__peanuts .peanut:last-child", { y: -110, rotate: 40, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="story" className="story field field--brown seam" style={{ "--seam-color": "var(--lab-color)" } as React.CSSProperties} aria-labelledby="story-title">
      <div className="container story__grid">
        <h2 id="story-title" className="display story__title lines" data-fit>
          {t.story.title.map((line) => (
            <span className="line" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h2>
        <div className="story__aside">
          <p className="story__text">{t.story.text}</p>
          <span className="sticker sticker--yellow sticker--big story__sticker">{t.story.sticker}</span>
        </div>
      </div>
      <div className="story__peanuts" aria-hidden="true">
        <Peanut />
        <Peanut />
      </div>
    </section>
  );
}
