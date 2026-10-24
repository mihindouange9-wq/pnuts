// Captures pleine page (ordinateur 1440, mobile 390) pour la revue : node tools/fullpage.mjs [url] [dossier]
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
const url = process.argv[2] ?? "http://127.0.0.1:5216";
const out = process.argv[3] ?? ".impeccable/review";
fs.mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--hide-scrollbars"] });
for (const [name, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, isMobile: width < 800, hasTouch: width < 800, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "load", timeout: 90000 });
  await page.evaluate(() => document.fonts.ready);
  await sleep(3500);
  // déclenche toutes les révélations puis revient en haut, l'en-tête redevient transparent
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += height * 0.6) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
    await sleep(220);
  }
  await sleep(1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await sleep(800);
  // les éléments collants sont figés en position normale pour une capture lisible
  await page.addStyleTag({ content: ".nav{position:static !important} .announce{position:static}" });
  await sleep(300);
  await page.screenshot({ path: path.join(out, `${name}.png`), fullPage: true });
  console.log(name, total, "px");
  await page.close();
}
await browser.close();
