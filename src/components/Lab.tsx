import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, reducedMotion, revealLines } from "../motion";
import { useLang } from "../i18n";
import { flavors, packSrcSet, type FlavorId } from "../data/flavors";
import { Peanut } from "./Peanut";

const FIELD: Record<string, string> = { yellow: "#f8a91f", orange: "#ec6426", brown: "#632713" };

/**
 * Labo des saveurs : trois stations fixes ; changer de saveur fait couler la couleur du champ,
 * sort l'ancien sachet et fait entrer le nouveau dans une seule timeline. Clavier, souris et tactile.
 */
export function Lab({ selected, onSelect }: { selected: FlavorId; onSelect: (id: FlavorId) => void }) {
  const { t, lang } = useLang();
  const root = useRef<HTMLElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [shown, setShown] = useState<FlavorId>(selected);
  const previous = useRef<FlavorId>(selected);
  const animating = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      revealLines(root.current!.querySelector(".lab__title")!);
      if (reducedMotion()) return;
      gsap.from(".lab__pack", { yPercent: 12, scale: 0.92, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 65%", once: true } });
      gsap.from(".lab__tab", { x: -24, opacity: 0, duration: 0.8, stagger: 0.08, ease: "expo.out", scrollTrigger: { trigger: root.current, start: "top 65%", once: true } });
    },
    { scope: root },
  );

  // Bascule de saveur
  useEffect(() => {
    if (selected === previous.current) return;
    const from = flavors.findIndex((f) => f.id === previous.current);
    const to = flavors.findIndex((f) => f.id === selected);
    const dir = to > from ? 1 : -1;
    previous.current = selected;
    const section = root.current!;
    const target = flavors[to];
    const outgoing = section.querySelector<HTMLElement>(`.lab__pack[data-id="${shown}"]`);
    const incoming = section.querySelector<HTMLElement>(`.lab__pack[data-id="${selected}"]`);
    const word = section.querySelector<HTMLElement>(".lab__word > span");
    const info = section.querySelectorAll<HTMLElement>(".lab__info > *");

    if (reducedMotion() || !outgoing || !incoming) {
      setShown(selected);
      gsap.set(section, { backgroundColor: FIELD[target.field] });
      document.documentElement.style.setProperty("--lab-color", FIELD[target.field]);
      return;
    }
    animating.current?.kill();
    incoming.hidden = false;
    gsap.set(incoming, { xPercent: 40 * dir, rotate: 10 * dir, opacity: 0, scale: 0.9 });
    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => {
        outgoing.hidden = true;
        gsap.set(outgoing, { clearProps: "all" });
        setShown(selected);
      },
    });
    tl.to(section, { backgroundColor: FIELD[target.field], duration: 0.7, ease: "power2.inOut" }, 0)
      .to(document.documentElement, { "--lab-color": FIELD[target.field], duration: 0.7, ease: "power2.inOut" }, 0)
      .to(outgoing, { xPercent: -40 * dir, rotate: -10 * dir, opacity: 0, scale: 0.9, duration: 0.55, ease: "power3.in" }, 0)
      .to(incoming, { xPercent: 0, rotate: 0, opacity: 1, scale: 1, duration: 0.9 }, 0.3)
      .fromTo(word, { yPercent: 30 * dir, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8 }, 0.25)
      .fromTo(info, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, 0.3);
    animating.current = tl;
  }, [selected, shown]);

  // Clavier sur la liste d'onglets
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = flavors.findIndex((f) => f.id === selected);
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % flavors.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + flavors.length) % flavors.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = flavors.length - 1;
    else return;
    e.preventDefault();
    const id = flavors[next].id;
    onSelect(id);
    tabRefs.current[id]?.focus();
  };

  // Glissement tactile sur la scène
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    touch.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!touch.current) return;
    const dx = e.clientX - touch.current.x;
    const dy = e.clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    const i = flavors.findIndex((f) => f.id === selected);
    const next = dx < 0 ? Math.min(flavors.length - 1, i + 1) : Math.max(0, i - 1);
    onSelect(flavors[next].id);
  };

  const current = flavors.find((f) => f.id === selected)!;
  const initial = flavors.find((f) => f.id === shown)!;

  return (
    <section ref={root} id="lab" className={`lab field field--${initial.field} lab--${current.field} seam`} style={{ "--seam-color": "var(--brown)" } as React.CSSProperties} aria-labelledby="lab-title">
      <div className="container">
        <div className="lab__head">
          <h2 id="lab-title" className="display display--lg lab__title lines" data-fit>
            {t.lab.title.map((line) => (
              <span className="line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h2>
          <p className="lead">{t.lab.intro}</p>
        </div>

        <div className="lab__grid">
          <div className="lab__tabs" role="tablist" aria-label={t.lab.tabsLabel} aria-orientation="vertical" onKeyDown={onKeyDown}>
            {flavors.map((f) => (
              <button
                key={f.id}
                ref={(el) => {
                  tabRefs.current[f.id] = el;
                }}
                type="button"
                role="tab"
                id={`lab-tab-${f.id}`}
                className="lab__tab"
                aria-selected={f.id === selected}
                aria-controls="lab-panel"
                tabIndex={f.id === selected ? 0 : -1}
                onClick={() => onSelect(f.id)}
              >
                <span className="lab__swatch" style={{ background: FIELD[f.field] }} aria-hidden="true" />
                <span className="lab__tab-name">{f.short.en}</span>
              </button>
            ))}
          </div>

          <div className="lab__stage" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (touch.current = null)}>
            <div className="lab__word display" aria-hidden="true">
              <span>{current.short.en}</span>
            </div>
            {flavors.map((f) => (
              <img
                key={f.id}
                data-id={f.id}
                className="lab__pack"
                hidden={f.id !== shown}
                src={`${f.img.base}-800.webp`}
                srcSet={packSrcSet(f)}
                sizes="(max-width: 64em) 60vw, 30vw"
                width={f.img.width}
                height={f.img.height}
                alt={f.alt[lang]}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            ))}
          </div>

          <div id="lab-panel" className="lab__info" role="tabpanel" aria-labelledby={`lab-tab-${selected}`}>
            <h3 className="display lab__name" data-fit>{current.name[lang]}</h3>
            <p className="lab__desc">{current.description[lang]}</p>
            <ul className="lab__facts" aria-label="Pack">
              {t.lab.facts.map((fact) => (
                <li key={fact} className={`sticker ${current.field === "brown" ? "sticker--yellow" : ""}`} style={{ "--tilt": "0deg" } as React.CSSProperties}>
                  {fact}
                </li>
              ))}
              <li className="sticker" style={{ "--tilt": "0deg" } as React.CSSProperties} lang="fr">
                {current.packSubtitle}
              </li>
            </ul>
            <p className="lab__hint">
              <Peanut /> {t.lab.swipe}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
