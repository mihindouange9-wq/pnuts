// Génère l'image de partage (og.jpg 1200×630) et l'icône tactile (apple-touch-icon.png 180×180) dans Chrome headless.
// node tools/brand-assets.mjs   (le serveur de prévisualisation doit tourner sur 5216 pour les polices et les sachets)
import fs from "node:fs";
import puppeteer from "puppeteer-core";

const base = process.argv[2] ?? "http://127.0.0.1:5216";
const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new" });
const page = await browser.newPage();
await page.goto(base, { waitUntil: "networkidle0" });

// Carte de partage : fenêtre orange, trois sachets, titre crème sur brun
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.evaluate(() => {
  document.body.innerHTML = `
  <div style="position:fixed;inset:0;background:#632713;display:grid;grid-template-columns:1fr 1fr;overflow:hidden;font-family:'Archivo Variable',sans-serif">
    <div style="padding:72px 0 72px 72px;display:flex;flex-direction:column;justify-content:space-between">
      <div style="font-weight:900;font-stretch:125%;font-size:44px;color:#FDE3CF;letter-spacing:-.01em">P<span style="display:inline-block;width:14px;height:22px;border-radius:50%/40%;background:#F8A91F;margin:0 4px 14px;transform:rotate(14deg)"></span>NUTS</div>
      <div>
        <div style="font-weight:900;font-stretch:125%;font-size:104px;line-height:.9;color:#FDE3CF;text-transform:uppercase">Small<br>nuts.</div>
        <div style="font-weight:900;font-stretch:125%;font-size:104px;line-height:.9;color:#EC6426;text-transform:uppercase">Big<br>attitude.</div>
      </div>
      <div style="font-family:'Inter Variable',sans-serif;font-weight:700;letter-spacing:.14em;font-size:18px;color:#F8A91F;text-transform:uppercase">Sweet peanuts · Honey · Zesty Lemon · Smoked Paprika</div>
    </div>
    <div style="position:relative;margin:48px 48px 48px 0">
      <div style="position:absolute;inset:0;border-radius:48px;background:#EC6426;overflow:hidden">
        <div style="position:absolute;left:-10%;right:-10%;bottom:8%;height:26%;background:#F8A91F;transform:rotate(-6deg)"></div>
      </div>
      <img src="/packs/lemon-800.webp" style="position:absolute;left:4%;bottom:4%;width:48%;transform:rotate(-11deg);filter:drop-shadow(0 24px 28px rgba(99,39,19,.4))">
      <img src="/packs/paprika-800.webp" style="position:absolute;right:4%;bottom:4%;width:48%;transform:rotate(11deg);filter:drop-shadow(0 24px 28px rgba(99,39,19,.4))">
      <img src="/packs/honey-800.webp" style="position:absolute;left:24%;bottom:2%;width:52%;filter:drop-shadow(0 28px 32px rgba(99,39,19,.45))">
    </div>
  </div>`;
});
await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: "public/og.jpg", type: "jpeg", quality: 88 });

// Icône tactile 180×180
await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
const svg = fs.readFileSync("public/favicon.svg", "utf8");
await page.evaluate((svg) => {
  document.body.innerHTML = `<div style="position:fixed;inset:0;background:#632713">${svg.replace("<svg ", '<svg width="180" height="180" ')}</div>`;
}, svg);
await page.screenshot({ path: "public/apple-touch-icon.png", type: "png" });
await browser.close();
for (const f of ["public/og.jpg", "public/apple-touch-icon.png"]) console.log(f, (fs.statSync(f).size / 1024).toFixed(0), "Ko");
