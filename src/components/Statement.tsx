import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion } from "../motion";
import { useLang } from "../i18n";
import { Peanut } from "./Peanut";

/** Bandeau défilant : boucle sans couture, vitesse liée à la direction du défilement, respect du mouvement réduit. */
export function Statement() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const track = root.current!.querySelector<HTMLElement>(".statement__track")!;
      const row = track.querySelector<HTMLElement>(".statement__row")!;
      const width = row.offsetWidth;
      if (!width) return;
      const loop = gsap.to(track, { x: -width, duration: Math.max(18, width / 90), ease: "none", repeat: -1 });
      // Le défilement vers le bas accélère légèrement, vers le haut inverse le sens
      let last = window.scrollY;
      const onScroll = () => {
        const dir = window.scrollY > last ? 1 : -1;
        last = window.scrollY;
        gsap.to(loop, { timeScale: dir * 1.6, duration: 0.3, overwrite: true, onComplete: () => gsap.to(loop, { timeScale: dir, duration: 1.2 }) });
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    },
    { scope: root },
  );

  const words = t.marquee;
  const row = (hidden: boolean) => (
    <div className="statement__row display" aria-hidden={hidden}>
      {words.map((w, i) => (
        <span key={w}>
          <span className={i === 1 ? "is-hollow" : undefined}>{w}</span>
          <Peanut />
        </span>
      ))}
    </div>
  );

  return (
    <section ref={root} className="statement field field--brown seam" style={{ "--seam-color": "var(--cream)" } as React.CSSProperties} aria-label={words.join(". ")}>
      <div className="statement__track">
        {row(false)}
        {row(true)}
        {row(true)}
      </div>
    </section>
  );
}
