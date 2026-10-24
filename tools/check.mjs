// Contrôles d'interaction et d'accessibilité du site P'NUTS : structure, polices, navigation, labo des saveurs,
// clavier, formulaire, menu mobile, mouvement réduit, débordements, console et requêtes en erreur.
// node tools/check.mjs [url]
import puppeteer from "puppeteer-core";

const url = process.argv[2] ?? "http://127.0.0.1:5216";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const results = [];
const ok = (name, pass, detail = "") => results.push(`${pass ? "OK   " : "ÉCHEC"} ${name}${detail ? " — " + detail : ""}`);

async function fresh(w, h, touch = false, reduced = false) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror " + e.message));
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(m.type() + " " + m.text().slice(0, 160)));
  page.on("response", (r) => r.status() >= 400 && errors.push(r.status() + " " + r.url()));
  if (reduced) await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await page.setViewport({ width: w, height: h, isMobile: touch, hasTouch: touch, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "load", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].filter((i) => !i.loading || i.loading === "eager").map((i) => i.decode().catch(() => {}))));
  await sleep(2600);
  return { page, errors };
}

// ── Ordinateur
{
  const { page, errors } = await fresh(1440, 900);
  ok("langue par défaut : anglais", (await page.evaluate(() => document.documentElement.lang)) === "en");
  ok("polices Archivo (remplaçant) et Inter chargées", await page.evaluate(() => document.fonts.check('900 40px "Archivo Variable"') && document.fonts.check('500 16px "Inter Variable"')));
  ok("un seul h1", (await page.$$eval("h1", (n) => n.length)) === 1);
  const headings = await page.$$eval("h1, h2, h3", (hs) => hs.map((h) => h.tagName));
  let jump = false;
  for (let i = 1; i < headings.length; i++) if (+headings[i][1] > +headings[i - 1][1] + 1) jump = true;
  ok("hiérarchie des titres sans saut", !jump, headings.join(" "));
  const noAlt = await page.$$eval("img", (imgs) => imgs.filter((i) => !i.hasAttribute("alt")).length);
  ok("toutes les images ont un alt", noAlt === 0, `${noAlt} sans alt`);
  const broken = await page.$$eval("img", (imgs) => imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")));
  ok("aucune image cassée", broken.length === 0, broken.join(", "));
  const unlabeled = await page.$$eval("a, button", (els) => els.filter((el) => !(el.textContent || "").trim() && !el.getAttribute("aria-label")).length);
  ok("liens et boutons tous libellés", unlabeled === 0, `${unlabeled} sans libellé`);
  const dead = await page.$$eval("a[href^='#']", (as) => as.map((a) => a.getAttribute("href")).filter((h) => h.length > 1 && !document.querySelector(h)));
  ok("aucune ancre morte", dead.length === 0, dead.join(", "));
  const clipped = await page.$$eval("[data-fit]", (els) => els.filter((el) => { const spans = [...el.querySelectorAll(".line > span")]; return (spans.length ? spans : [el]).some((t) => t.scrollWidth > t.clientWidth + 1); }).map((el) => el.textContent.trim().slice(0, 30)));
  ok("aucun titre ne déborde de sa colonne", clipped.length === 0, clipped.join(" | "));
  ok("l'en-tête devient crème au défilement", await page.evaluate(async () => { window.scrollTo(0, 400); await new Promise((r) => setTimeout(r, 700)); return document.querySelector(".nav").classList.contains("is-scrolled"); }));

  // Labo : clic, clavier, couleur du champ
  await page.evaluate(() => document.querySelector("#lab").scrollIntoView({ block: "start" }));
  await sleep(1800);
  const bg0 = await page.$eval("#lab", (s) => getComputedStyle(s).backgroundColor);
  await page.click("#lab-tab-paprika");
  await sleep(1300);
  const after = await page.evaluate(() => ({ bg: getComputedStyle(document.querySelector("#lab")).backgroundColor, selected: document.querySelector('#lab [role="tab"][aria-selected="true"]').id, name: document.querySelector("#lab-panel h3").textContent, visible: [...document.querySelectorAll(".lab__pack")].filter((i) => !i.hidden).map((i) => i.dataset.id) }));
  ok("labo : Smoked Paprika sélectionné, champ brun, un seul sachet visible", after.selected === "lab-tab-paprika" && after.bg === "rgb(99, 39, 19)" && after.name.includes("Smoked Paprika") && after.visible.join() === "paprika", JSON.stringify({ bg0, ...after }));
  await page.focus("#lab-tab-paprika");
  await page.keyboard.press("ArrowUp");
  await sleep(1200);
  ok("labo : flèche haut passe à Zesty Lemon et déplace le focus", await page.evaluate(() => document.activeElement.id === "lab-tab-lemon" && document.querySelector("#lab-panel h3").textContent.includes("Zesty Lemon")));
  await page.keyboard.press("Home");
  await sleep(1200);
  ok("labo : Début revient à Honey", await page.evaluate(() => document.querySelector("#lab-panel h3").textContent.includes("Honey")));

  // « Discover this flavor » depuis la carte paprika → labo sur paprika
  await page.evaluate(() => document.querySelector(".flavor--paprika").scrollIntoView({ block: "center" }));
  await sleep(1500);
  await page.click(".flavor--paprika .btn");
  await sleep(2500);
  const lab = await page.evaluate(() => ({ top: Math.round(document.querySelector("#lab").getBoundingClientRect().top), selected: document.querySelector('#lab [role="tab"][aria-selected="true"]').id, focus: document.activeElement.id }));
  ok("« Découvrir cette saveur » ouvre le labo sur Smoked Paprika", Math.abs(lab.top - 72) < 90 && lab.selected === "lab-tab-paprika" && lab.focus === "lab-tab-paprika", JSON.stringify(lab));

  // navigation par ancre
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);
  await page.click('.nav__link[href="#story"]');
  await sleep(2200);
  const landed = await page.evaluate(() => Math.round(document.querySelector("#story").getBoundingClientRect().top));
  ok("navigation : « Our Story » amène à la section", Math.abs(landed - 72) < 60, `haut à ${landed} px`);

  // Formulaire newsletter : validation, états
  await page.evaluate(() => document.querySelector("#contact").scrollIntoView({ block: "start" }));
  await sleep(1500);
  await page.click('#contact button[type="submit"]');
  await sleep(300);
  const vide = await page.evaluate(() => ({ invalid: document.querySelector('#contact input[aria-invalid="true"]') !== null, status: document.querySelector("#contact .form__status").textContent.trim(), focus: document.activeElement.name }));
  ok("newsletter : l'envoi à vide signale l'erreur et place le focus", vide.invalid && vide.status.length > 10 && vide.focus === "email", JSON.stringify(vide));
  await page.type('#contact input[name="email"]', "test@example.com");
  await page.click('#contact button[type="submit"]');
  await sleep(400);
  const info = await page.$eval("#contact .form__status", (s) => s.textContent.trim());
  ok("newsletter : sans service branché, le formulaire le dit honnêtement", /aren.t stored|not stored|opens with the launch/i.test(info), info);
  const label = await page.$eval('#contact input[name="email"]', (i) => i.labels?.length > 0);
  ok("newsletter : le champ a une étiquette", label);

  // Bascule de langue
  await page.click(".nav__actions .lang");
  await sleep(600);
  const fr = await page.evaluate(() => ({ lang: document.documentElement.lang, h1: document.querySelector("h1").textContent.trim(), saved: localStorage.getItem("pnuts-lang") }));
  ok("bascule FR : lang=fr, titre traduit, préférence mémorisée", fr.lang === "fr" && /PETITES/i.test(fr.h1) && fr.saved === "fr", JSON.stringify(fr));
  await sleep(600);
  const clippedFr = await page.$$eval("[data-fit]", (els) => els.filter((el) => { const spans = [...el.querySelectorAll(".line > span")]; return (spans.length ? spans : [el]).some((t) => t.scrollWidth > t.clientWidth + 1); }).map((el) => el.textContent.trim().slice(0, 30)));
  ok("FR : aucun titre ne déborde", clippedFr.length === 0, clippedFr.join(" | "));
  await page.evaluate(() => localStorage.removeItem("pnuts-lang"));
  ok("aucune erreur console ni requête en erreur (ordinateur)", errors.length === 0, errors.join(" | "));
  await page.close();
}

// ── Débordements à cinq largeurs
for (const w of [1600, 1280, 768, 390, 320]) {
  const { page, errors } = await fresh(w, 900, w < 800);
  const over = await page.evaluate(async () => {
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      window.scrollTo(0, (document.body.scrollHeight * i) / steps);
      await new Promise((r) => setTimeout(r, 160));
    }
    const sw = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const out = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.right > window.innerWidth + 1 && getComputedStyle(el).position !== "fixed" && !el.closest(".statement, .announce, .hero__stage, .flavor__visual, .lab__stage, .footer__wordmark-row, .story__peanuts, .menu, .tile");
      })
      .map((el) => (typeof el.className === "string" && el.className ? el.className.split(" ")[0] : el.tagName) + "@" + Math.round(el.getBoundingClientRect().right - window.innerWidth));
    return { sw, out };
  });
  ok(`${w} px : pas de défilement horizontal`, over.sw <= 0, `${over.sw} px`);
  ok(`${w} px : aucun élément hors écran`, over.out.length === 0, [...new Set(over.out)].join(", "));
  ok(`${w} px : aucune erreur console`, errors.length === 0, errors.join(" | "));
  await page.close();
}

// ── Mobile : menu, cibles tactiles, glissement du labo
{
  const { page, errors } = await fresh(390, 844, true);
  await page.tap(".nav__toggle");
  await sleep(800);
  const menu = await page.evaluate(() => ({ open: document.querySelector("#menu").classList.contains("is-open"), focus: document.activeElement.className, lock: document.documentElement.style.overflow }));
  ok("mobile : le menu s'ouvre, verrouille le défilement et prend le focus", menu.open && menu.focus.includes("menu__close") && menu.lock === "hidden", JSON.stringify(menu));
  await page.keyboard.press("Escape");
  await sleep(800);
  ok("mobile : Échap ferme le menu et rend le focus au bouton", await page.evaluate(() => !document.querySelector("#menu").classList.contains("is-open") && document.activeElement.className.includes("nav__toggle")));
  await page.tap(".nav__toggle");
  await sleep(700);
  await page.tap('.menu__link[href="#find"]');
  await sleep(2200);
  ok("mobile : un lien du menu ferme le panneau et mène à la section", await page.evaluate(() => !document.querySelector("#menu").classList.contains("is-open") && Math.abs(document.querySelector("#find").getBoundingClientRect().top - 64) < 80));
  const small = await page.$$eval("a, button", (els) => els.filter((el) => { const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 40 || r.width < 40) && el.closest(".menu") === null; }).map((el) => (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 20)));
  ok("mobile : cibles tactiles d'au moins 40 px", small.length === 0, small.join(", "));
  await page.evaluate(() => document.querySelector("#lab").scrollIntoView({ block: "start" }));
  await sleep(1500);
  const stage = await page.$(".lab__stage");
  const box = await stage.boundingBox();
  await page.touchscreen.touchStart(box.x + box.width * 0.8, box.y + box.height / 2);
  await page.touchscreen.touchMove(box.x + box.width * 0.2, box.y + box.height / 2);
  await page.touchscreen.touchEnd();
  await sleep(1300);
  ok("mobile : glisser vers la gauche passe à la saveur suivante", await page.evaluate(() => document.querySelector('#lab [role="tab"][aria-selected="true"]').id === "lab-tab-lemon"));
  ok("aucune erreur console (mobile)", errors.length === 0, errors.join(" | "));
  await page.close();
}

// ── Mouvement réduit : tout le contenu visible sans animation
{
  const { page } = await fresh(1280, 800, false, true);
  const hidden = await page.evaluate(() => [...document.querySelectorAll("h1, h2, h3, p, img")].filter((el) => { const s = getComputedStyle(el); return s.opacity === "0" || s.visibility === "hidden"; }).length);
  ok("mouvement réduit : aucun élément masqué par l'animation", hidden === 0, `${hidden} masqués`);
  const marquee = await page.$eval(".announce__track", (t) => getComputedStyle(t).animationName);
  ok("mouvement réduit : la barre d'annonce ne défile pas", marquee === "none", marquee);
  await page.close();
}

await browser.close();
console.log(results.join("\n"));
const failed = results.filter((r) => r.startsWith("ÉCHEC")).length;
console.log(`\n${results.length - failed}/${results.length} contrôles réussis`);
process.exit(failed ? 1 : 0);
