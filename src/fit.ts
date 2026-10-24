/**
 * Ajustement des titres d'affichage : un mot ne doit jamais déborder de sa colonne, dans aucune langue.
 * Chaque élément [data-fit] repart de sa taille CSS puis est réduit jusqu'à ce que plus rien ne dépasse.
 * S'exécute après le chargement des polices, au redimensionnement et au changement de langue.
 */
const MIN_PX = 26;

function overflowing(el: HTMLElement) {
  // Le span de ligne est mesuré dans son propre repère : les transformations de l'animation d'entrée ne faussent rien
  const spans = el.querySelectorAll<HTMLElement>(".line > span");
  const targets = spans.length ? Array.from(spans) : [el];
  return targets.some((t) => t.scrollWidth > t.clientWidth + 1);
}

export function fitAll(root: ParentNode = document) {
  const els = root.querySelectorAll<HTMLElement>("[data-fit]");
  els.forEach((el) => {
    el.style.fontSize = "";
    if (!overflowing(el)) return;
    let size = parseFloat(getComputedStyle(el).fontSize);
    // Réduction par paliers de 4 % : rapide et sans à-coups visibles
    for (let i = 0; i < 40 && size > MIN_PX && overflowing(el); i++) {
      size *= 0.96;
      el.style.fontSize = `${size.toFixed(2)}px`;
    }
  });
}

let scheduled = 0;
export function scheduleFit() {
  cancelAnimationFrame(scheduled);
  scheduled = requestAnimationFrame(() => fitAll());
}

export function installFit() {
  const ro = new ResizeObserver(() => scheduleFit());
  ro.observe(document.documentElement);
  document.fonts?.ready.then(scheduleFit);
  scheduleFit();
  return () => ro.disconnect();
}
