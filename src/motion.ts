import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/** Vrai quand l'utilisateur demande un mouvement réduit : les révélations deviennent instantanées. */
export const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Révélation ligne par ligne d'un titre masqué (.line > span) au passage dans la fenêtre. */
export function revealLines(scope: Element, trigger: Element = scope, start = "top 82%") {
  const spans = scope.querySelectorAll<HTMLElement>(".line > span");
  if (!spans.length) return null;
  if (reducedMotion()) return null;
  return gsap.from(spans, {
    yPercent: 110,
    rotate: 2,
    transformOrigin: "0 100%",
    duration: 1,
    ease: "expo.out",
    stagger: 0.08,
    scrollTrigger: { trigger, start, once: true },
  });
}

/** Entrée douce d'un bloc (opacité + léger décalage). */
export function revealBlock(targets: gsap.TweenTarget, trigger: Element, vars: gsap.TweenVars = {}) {
  if (reducedMotion()) return null;
  return gsap.from(targets, {
    y: 28,
    opacity: 0,
    duration: 0.9,
    ease: "expo.out",
    stagger: 0.08,
    scrollTrigger: { trigger, start: "top 85%", once: true },
    ...vars,
  });
}
