import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion } from "../motion";
import { useLang } from "../i18n";
import { flavorById, packSrcSet } from "../data/flavors";
import { Icon, Peanut } from "./Peanut";

export function Hero() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (reducedMotion()) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero__title .line > span", { yPercent: 110, rotate: 2, transformOrigin: "0 100%", duration: 1.1, stagger: 0.1 }, 0.1)
        .from(".hero__lead, .hero__actions", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.5)
        .from(".window", { scale: 0.92, opacity: 0, transformOrigin: "50% 100%", duration: 1.1 }, 0.2)
        .from(".hero__pack--honey", { yPercent: 18, scale: 0.9, opacity: 0, duration: 1.2 }, 0.55)
        .from(".hero__pack--lemon, .hero__pack--paprika", { yPercent: 22, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.75)
        .from(".hero__sticker", { scale: 0.6, opacity: 0, rotate: -12, duration: 0.8, ease: "back.out(2)" }, 1.1);

      // Parallaxe retenue : la fenêtre et les sachets glissent légèrement au défilement
      gsap.to(".hero__packs", { yPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 } });
      gsap.to(".hero__copy", { yPercent: -8, opacity: 0.4, ease: "none", scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: 0.6 } });
      gsap.to(".window .peanut--a", { y: -24, rotate: -10, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".window .peanut--b", { y: 30, rotate: 44, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 } });
    },
    { scope: root },
  );

  const honey = flavorById("honey");
  const lemon = flavorById("lemon");
  const paprika = flavorById("paprika");

  return (
    <section ref={root} id="top" className="hero field field--cream" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <h1 id="hero-title" className="display hero__title lines" data-fit>
            {t.hero.title.map((line) => (
              <span className="line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="lead hero__lead">{t.hero.text}</p>
          <div className="hero__actions">
            <a className="btn" href="#flavors">
              {t.hero.primary}
              <Icon.Down />
            </a>
            <a className="btn btn--ghost" href="#story">
              {t.hero.secondary}
            </a>
          </div>
        </div>

        <div className="hero__stage">
          <div className="window" aria-hidden="true">
            <div className="window__band" />
            <Peanut className="peanut--a" />
            <Peanut className="peanut--b" />
          </div>
          <div className="hero__packs">
            <img className="hero__pack hero__pack--lemon" src={`${lemon.img.base}-800.webp`} srcSet={packSrcSet(lemon)} sizes="(max-width: 64em) 60vw, 26vw" width={lemon.img.width} height={lemon.img.height} alt={lemon.alt[lang]} decoding="async" />
            <img className="hero__pack hero__pack--paprika" src={`${paprika.img.base}-800.webp`} srcSet={packSrcSet(paprika)} sizes="(max-width: 64em) 60vw, 26vw" width={paprika.img.width} height={paprika.img.height} alt={paprika.alt[lang]} decoding="async" />
            <img className="hero__pack hero__pack--honey" src={`${honey.img.base}-800.webp`} srcSet={packSrcSet(honey)} sizes="(max-width: 64em) 64vw, 28vw" width={honey.img.width} height={honey.img.height} alt={honey.alt[lang]} fetchPriority="high" />
          </div>
          <span className="sticker sticker--yellow hero__sticker">{t.hero.sticker}</span>
        </div>
      </div>
    </section>
  );
}
