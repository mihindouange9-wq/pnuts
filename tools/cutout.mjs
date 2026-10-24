// Détourage des sachets : remplissage depuis les bords (fond studio crème uniforme), lissage des bords,
// export WebP transparent en plusieurs largeurs. Chrome headless fait le travail (sharp est bloqué sur ce poste).
// node tools/cutout.mjs
import fs from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";

const SRC = path.resolve("../P'NUTS");
const OUT = path.resolve("public/packs");
const FILES = {
  honey: "Pouch de cacahuètes au miel.png",
  lemon: "Sachet de cacahuètes au citron zesté.png",
  paprika: "Pochette de cacahuètes au paprika fumé.png",
};
const WIDTHS = [1200, 800, 480];
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ executablePath: process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.goto(pathToFileURL(SRC).href + "/", { waitUntil: "load" }).catch(() => {});

for (const [key, file] of Object.entries(FILES)) {
  const data = fs.readFileSync(path.join(SRC, file)).toString("base64");
  const result = await page.evaluate(async (b64, widths) => {
    const img = new Image();
    img.src = "data:image/png;base64," + b64;
    await img.decode();
    const W = img.naturalWidth, H = img.naturalHeight;
    const c = document.createElement("canvas"); c.width = W; c.height = H;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const im = ctx.getImageData(0, 0, W, H), d = im.data;
    // fond de référence : moyenne des pixels de bordure
    let r = 0, g = 0, b = 0, n = 0;
    for (let x = 0; x < W; x += 3) for (const y of [0, 1, H - 2, H - 1]) { const i = (y * W + x) * 4; r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
    for (let y = 0; y < H; y += 3) for (const x of [0, 1, W - 2, W - 1]) { const i = (y * W + x) * 4; r += d[i]; g += d[i + 1]; b += d[i + 2]; n++; }
    r /= n; g /= n; b /= n;
    // distance au fond, tolérance ajustée au léger vignettage et à l'ombre portée
    const TOL = 30; // ombre comprise ; le panneau crème du sachet est à ~35-45 (bleu nettement plus bas)
    const dist = (i) => Math.abs(d[i] - r) * 0.8 + Math.abs(d[i + 1] - g) + Math.abs(d[i + 2] - b) * 1.4;
    const bg = new Uint8Array(W * H); // 1 = fond
    const stack = [];
    const push = (x, y) => { const p = y * W + x; if (bg[p]) return; if (dist(p * 4) > TOL) return; bg[p] = 1; stack.push(p); };
    for (let x = 0; x < W; x++) { push(x, 0); push(x, H - 1); }
    for (let y = 0; y < H; y++) { push(0, y); push(W - 1, y); }
    while (stack.length) {
      const p = stack.pop(), x = p % W, y = (p / W) | 0;
      if (x > 0) push(x - 1, y); if (x < W - 1) push(x + 1, y); if (y > 0) push(x, y - 1); if (y < H - 1) push(x, y + 1);
    }
    // seconde passe : l'ombre portée sous le sachet (gris neutre plus sombre, bas de l'image uniquement)
    const neutral = (i) => Math.max(d[i], d[i + 1], d[i + 2]) - Math.min(d[i], d[i + 1], d[i + 2]) < 46 && d[i] > 150;
    const push2 = (x, y) => { const p = y * W + x; if (bg[p]) return; if (y < H * 0.86) return; if (!neutral(p * 4)) return; if (dist(p * 4) > 140) return; bg[p] = 1; stack.push(p); };
    for (let p = 0; p < W * H; p++) if (bg[p]) { const x = p % W, y = (p / W) | 0; if (y >= H * 0.86) { if (x > 0) push2(x - 1, y); if (x < W - 1) push2(x + 1, y); if (y > 0) push2(x, y - 1); if (y < H - 1) push2(x, y + 1); } }
    while (stack.length) { const p = stack.pop(), x = p % W, y = (p / W) | 0; if (x > 0) push2(x - 1, y); if (x < W - 1) push2(x + 1, y); if (y > 0) push2(x, y - 1); if (y < H - 1) push2(x, y + 1); }
    // alpha : 0 sur le fond, dégradé sur 2 px de bord selon la distance couleur
    for (let p = 0; p < W * H; p++) {
      const i = p * 4;
      if (bg[p]) { d[i + 3] = 0; continue; }
      const x = p % W, y = (p / W) | 0;
      let nb = 0;
      for (const [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) { const q = (y + dy) * W + (x + dx); if (bg[q]) nb++; }
      if (nb) { const t = Math.min(1, (dist(i) - TOL) / 40 + 0.35); d[i + 3] = Math.round(255 * Math.max(0.25, t)); }
    }
    ctx.putImageData(im, 0, 0);
    // boîte englobante du sachet
    let minX = W, minY = H, maxX = 0, maxY = 0;
    for (let p = 0; p < W * H; p++) if (!bg[p]) { const x = p % W, y = (p / W) | 0; if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    const pad = 6;
    minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad); maxX = Math.min(W - 1, maxX + pad); maxY = Math.min(H - 1, maxY + pad);
    const bw = maxX - minX + 1, bh = maxY - minY + 1;
    const out = {};
    for (const w of widths) {
      const scale = Math.min(1, w / bw);
      const cw = Math.round(bw * scale), ch = Math.round(bh * scale);
      const c2 = document.createElement("canvas"); c2.width = cw; c2.height = ch;
      const x2 = c2.getContext("2d"); x2.imageSmoothingQuality = "high";
      x2.drawImage(c, minX, minY, bw, bh, 0, 0, cw, ch);
      const blob = await new Promise((res) => c2.toBlob(res, "image/webp", 0.86));
      const dataUrl = await new Promise((res) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(blob); });
      out[w] = { w: cw, h: ch, b64: dataUrl.split(",")[1] };
    }
    const bgPct = Math.round((bg.reduce((a, v) => a + v, 0) / (W * H)) * 100);
    return { bgRGB: [r, g, b].map(Math.round), box: [minX, minY, bw, bh], bgPct, out };
  }, data, WIDTHS);
  for (const [w, o] of Object.entries(result.out)) {
    const f = path.join(OUT, `${key}-${w}.webp`);
    fs.writeFileSync(f, Buffer.from(o.b64, "base64"));
    console.log(`${key} ${w}: ${o.w}×${o.h}, ${(fs.statSync(f).size / 1024).toFixed(0)} Ko`);
  }
  console.log(`${key}: fond ${result.bgRGB.join(",")}, boîte ${result.box.join(",")}, fond ${result.bgPct} %`);
}
await browser.close();
