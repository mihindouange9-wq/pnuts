import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";
import { Icon, Wordmark } from "./Peanut";

const LINKS = [
  { href: "#flavors", key: "products" },
  { href: "#story", key: "story" },
  { href: "#find", key: "find" },
  { href: "#contact", key: "contact" },
] as const;

export function Nav() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Fond crème dès que le hero commence à défiler
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lien courant selon la section visible
  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setCurrent("#" + visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Menu mobile : verrou de défilement, Échap, focus
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) {
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key !== "Escape") return;
        setOpen(false);
        requestAnimationFrame(() => toggleRef.current?.focus());
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    return undefined;
  }, [open]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => toggleRef.current?.focus());
  };

  const otherLang = lang === "en" ? "fr" : "en";

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <nav className="nav__inner" aria-label="Main">
          <a href="#top" className="nav__brand" aria-label={t.nav.home}>
            <Wordmark />
          </a>
          <ul className="nav__links">
            {LINKS.map((l) => (
              <li key={l.key}>
                <a className="nav__link" href={l.href} aria-current={current === l.href ? "true" : undefined}>
                  {t.nav[l.key]}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__actions">
            <button type="button" className="lang" onClick={() => setLang(otherLang)} aria-label={t.nav.langLabel} lang={otherLang}>
              {t.nav.langShort}
            </button>
            <a className="btn nav__cta" href="#lab">
              {t.nav.cta}
            </a>
            <button ref={toggleRef} type="button" className="nav__toggle" onClick={() => setOpen(true)} aria-label={t.nav.menu} aria-expanded={open} aria-controls="menu">
              <Icon.Menu />
            </button>
          </div>
        </nav>
      </header>

      <div id="menu" className={`menu${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label={t.nav.menu} aria-hidden={!open}>
        <div className="menu__head">
          <Wordmark />
          <button ref={closeRef} type="button" className="menu__close" onClick={close} aria-label={t.nav.close} tabIndex={open ? 0 : -1}>
            <Icon.Close />
          </button>
        </div>
        <ul className="menu__links">
          {LINKS.map((l) => (
            <li key={l.key}>
              <a className="menu__link" href={l.href} onClick={close} tabIndex={open ? 0 : -1}>
                {t.nav[l.key]}
              </a>
            </li>
          ))}
        </ul>
        <div className="menu__foot">
          <a className="btn btn--cream" href="#lab" onClick={close} tabIndex={open ? 0 : -1}>
            {t.nav.cta}
          </a>
          <button type="button" className="lang" onClick={() => setLang(otherLang)} lang={otherLang} tabIndex={open ? 0 : -1}>
            {t.nav.lang}
          </button>
        </div>
      </div>
    </>
  );
}
