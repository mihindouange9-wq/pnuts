import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion, revealLines } from "../motion";
import { useLang } from "../i18n";
import { flavorById } from "../data/flavors";
import { Peanut } from "./Peanut";

/**
 * Campagne : mosaïque de pièces inégales (pleine largeur 3/6, étroites 1/6, larges 4/6).
 * Les détails de sachets sont réels ; les visuels de campagne absents sont des emplacements assumés.
 */
export function Campaign() {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      revealLines(root.current!.querySelector(".campaign__title")!);
      if (reducedMotion()) return;
      gsap.from(".tile", { scale: 0.92, opacity: 0, duration: 0.9, stagger: { each: 0.07, from: "random" }, ease: "expo.out", scrollTrigger: { trigger: ".mosaic", start: "top 80%", once: true } });
    },
    { scope: root },
  );

  const honey = flavorById("honey");
  const lemon = flavorById("lemon");
  const paprika = flavorById("paprika");

  const Placeholder = ({ dark = false }: { dark?: boolean }) => (
    <div className="tile__placeholder">
      <Peanut style={{ color: dark ? "var(--yellow)" : "var(--brown)" }} />
      <strong>{t.campaign.placeholder}</strong>
      <span>{t.campaign.soon}</span>
    </div>
  );

  return (
    <section ref={root} id="campaign" className="campaign field field--yellow seam seam--reverse" style={{ "--seam-color": "var(--cream)" } as React.CSSProperties} aria-labelledby="campaign-title">
      <div className="container">
        <div className="campaign__head">
          <h2 id="campaign-title" className="display campaign__title lines" data-fit>
            {t.campaign.title.map((line) => (
              <span className="line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <p className="lead">{t.campaign.text}</p>
        </div>

        <ul className="mosaic">
          <li className="tile tile--w3 tile--h2 tile--orange">
            <img className="tile__img" src={`${honey.img.base}-800.webp`} width={honey.img.width} height={honey.img.height} alt={`${t.campaign.detail}: ${honey.alt[lang]}`} loading="lazy" decoding="async" />
            <span className="sticker tile__label">{t.campaign.detail}</span>
          </li>
          <li className="tile tile--w1 tile--cream">
            <Placeholder />
          </li>
          <li className="tile tile--w2 tile--brown tile--statement">
            <span className="display">{t.marquee[1]}</span>
          </li>
          <li className="tile tile--w1 tile--orange">
            <Placeholder />
          </li>
          <li className="tile tile--w2 tile--cream">
            <img className="tile__img" src={`${paprika.img.base}-800.webp`} width={paprika.img.width} height={paprika.img.height} alt={`${t.campaign.detail}: ${paprika.alt[lang]}`} loading="lazy" decoding="async" style={{ objectPosition: "50% 80%" }} />
            <span className="sticker tile__label sticker--yellow">{t.campaign.detail}</span>
          </li>
          <li className="tile tile--w2 tile--brown">
            <Placeholder dark />
          </li>
          <li className="tile tile--w4 tile--brown">
            <img className="tile__img" src={`${lemon.img.base}-800.webp`} width={lemon.img.width} height={lemon.img.height} alt={`${t.campaign.detail}: ${lemon.alt[lang]}`} loading="lazy" decoding="async" style={{ objectPosition: "50% 30%", transform: "scale(2.2)", transformOrigin: "50% 30%" }} />
            <span className="sticker tile__label sticker--orange">{t.campaign.detail}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
