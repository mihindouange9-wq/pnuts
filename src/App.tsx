import { useCallback, useEffect, useMemo, useState } from "react";
import { copy, LangContext, type Lang } from "./i18n";
import type { FlavorId } from "./data/flavors";
import { ScrollTrigger } from "./motion";
import { fitAll, installFit } from "./fit";
import { Announcement } from "./components/Announcement";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Statement } from "./components/Statement";
import { Flavors } from "./components/Flavors";
import { Lab } from "./components/Lab";
import { Story } from "./components/Story";
import { Experience } from "./components/Experience";
import { Campaign } from "./components/Campaign";
import { FindUs } from "./components/FindUs";
import { Newsletter } from "./components/Newsletter";
import { Footer } from "./components/Footer";

const LANG_KEY = "pnuts-lang";

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "en" || saved === "fr") return saved;
  } catch {
    /* stockage indisponible : on ignore */
  }
  return "en";
}

export default function App() {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [flavor, setFlavor] = useState<FlavorId>("honey");

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => installFit(), []);

  useEffect(() => {
    document.documentElement.lang = lang;
    fitAll();
    // Les hauteurs changent avec la langue : recalcul des déclencheurs
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [lang]);

  // « Discover this flavor » : ouvre le labo sur cette saveur
  const discover = useCallback((id: FlavorId) => {
    setFlavor(id);
    const lab = document.getElementById("lab");
    lab?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    document.getElementById(`lab-tab-${id}`)?.focus({ preventScroll: true });
  }, []);

  const ctx = useMemo(() => ({ lang, t: copy[lang], setLang }), [lang, setLang]);

  return (
    <LangContext.Provider value={ctx}>
      <a className="skip" href="#main">
        {ctx.t.skip}
      </a>
      <Announcement />
      <Nav />
      <main id="main">
        <Hero />
        <Statement />
        <Flavors onDiscover={discover} />
        <Lab selected={flavor} onSelect={setFlavor} />
        <Story />
        <Experience />
        <Campaign />
        <FindUs />
        <Newsletter />
      </main>
      <Footer />
    </LangContext.Provider>
  );
}
