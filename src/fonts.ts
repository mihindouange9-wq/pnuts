/**
 * Police d'affichage : Girthy Ultra Sans quand ses fichiers sont présents dans src/assets/fonts/,
 * sinon Archivo Variable (étendue, ultra-grasse) comme remplaçant provisoire. Détection à la compilation :
 * aucune requête réseau n'est tentée vers un fichier absent.
 */
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource-variable/inter";

const girthy = import.meta.glob("./assets/fonts/GirthyUltraSans*.{woff2,woff,otf,ttf}", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

const formats: Record<string, string> = { woff2: "woff2", woff: "woff", otf: "opentype", ttf: "truetype" };
const sources = Object.entries(girthy)
  .sort(([a], [b]) => Object.keys(formats).indexOf(a.split(".").pop()!) - Object.keys(formats).indexOf(b.split(".").pop()!))
  .map(([file, url]) => `url(${JSON.stringify(url)}) format("${formats[file.split(".").pop()!]}")`);

export const hasGirthy = sources.length > 0;

if (hasGirthy) {
  const style = document.createElement("style");
  style.textContent = `@font-face{font-family:"Girthy Ultra Sans";src:${sources.join(",")};font-weight:400 900;font-style:normal;font-display:swap;}`;
  document.head.appendChild(style);
  document.documentElement.classList.add("has-girthy");
}
