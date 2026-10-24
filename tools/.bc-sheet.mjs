// Planche-contact : une capture par scène, assemblée dans le navigateur, pour deux largeurs.
import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import fs from "node:fs";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--hide-scrollbars"] });
const out = "C:/Users/mihin/Documents/geek/pnuts/.impeccable/review/bc";
const url = (process.argv[2] === "live" ? "https://break-and-create.onrender.com/" : pathToFileURL("C:/Users/mihin/Documents/geek/break-and-create/site/index.html").href);
for (const [w, h] of [[1366, 768], [390, 844]]) {
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, isMobile: w < 900, hasTouch: w < 900 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
  await sleep(2500);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const shots = [];
  await page.mouse.move(w - 20, 20);
  for (let y = 0; y < total; y += h * 0.9) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await sleep(650);
    shots.push((await page.screenshot({ encoding: "base64", type: "jpeg", quality: 70 })));
  }
  const cols = w < 900 ? 6 : 3, tw = w < 900 ? 300 : 440, th = Math.round(tw * h / w);
  const sheet = await page.evaluate(async (shots, cols, tw, th) => {
    const rows = Math.ceil(shots.length / cols);
    const c = document.createElement("canvas"); c.width = cols * (tw + 8) + 8; c.height = rows * (th + 24) + 8;
    const x = c.getContext("2d"); x.fillStyle = "#777"; x.fillRect(0, 0, c.width, c.height);
    for (let i = 0; i < shots.length; i++) {
      const img = new Image(); img.src = "data:image/jpeg;base64," + shots[i]; await img.decode();
      const cx = 8 + (i % cols) * (tw + 8), cy = 8 + Math.floor(i / cols) * (th + 24);
      x.drawImage(img, cx, cy, tw, th); x.fillStyle = "#fff"; x.font = "12px sans-serif"; x.fillText(String(i + 1), cx + 4, cy + th + 16);
    }
    return c.toDataURL("image/jpeg", 0.8).split(",")[1];
  }, shots, cols, tw, th);
  fs.writeFileSync(`${out}/sheet-${w}.jpg`, Buffer.from(sheet, "base64"));
  console.log(w, shots.length, "écrans, page", total, "px");
  await page.close();
}
await browser.close();
