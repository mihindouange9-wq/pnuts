// Contrôle visuel des détourages sur fond brun et crème.
import puppeteer from "puppeteer-core";
import { pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";
const html = `<!doctype html><meta charset=utf-8><style>body{margin:0;display:grid;grid-template-columns:repeat(3,1fr);background:#632713}
div{padding:20px;display:flex;flex-direction:column;gap:12px;align-items:center}div:nth-child(n+4){background:#FDE3CF}img{width:280px;height:auto;filter:drop-shadow(0 20px 30px rgba(0,0,0,.35))}</style>
${["honey","lemon","paprika"].map(k=>`<div><img src="../public/packs/${k}-800.webp"></div>`).join("")}
${["honey","lemon","paprika"].map(k=>`<div><img src="../public/packs/${k}-800.webp"></div>`).join("")}`;
fs.writeFileSync("tools/.cutout-check.html", html);
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage();
await page.setViewport({ width: 1000, height: 900 });
await page.goto(pathToFileURL(path.resolve("tools/.cutout-check.html")).href, { waitUntil: "networkidle0" });
await page.screenshot({ path: "tools/.cutout-check.png" });
// zoom sur un bord (panneau crème du sachet honey, côté gauche)
await page.setViewport({ width: 1000, height: 900, deviceScaleFactor: 3 });
await page.screenshot({ path: "tools/.cutout-zoom.png", clip: { x: 20, y: 150, width: 160, height: 160 } });
await browser.close();
