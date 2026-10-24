// Analyse des PNG d'emballage sans dépendance : couleur de fond, uniformité, bords.
import fs from "node:fs";
import zlib from "node:zlib";
function decode(file) {
  const b = fs.readFileSync(file);
  let p = 8, w, h, ct, bd, idat = [];
  while (p < b.length) {
    const len = b.readUInt32BE(p), type = b.toString("ascii", p + 4, p + 8);
    const data = b.subarray(p + 8, p + 8 + len);
    if (type === "IHDR") { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bd = data[8]; ct = data[9]; }
    if (type === "IDAT") idat.push(data);
    p += 12 + len;
  }
  const bpp = ct === 6 ? 4 : ct === 2 ? 3 : ct === 4 ? 2 : 1;
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = w * bpp, out = Buffer.alloc(w * h * bpp);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? cur[i - bpp] : 0, bb = prev[i], c = i >= bpp ? prev[i - bpp] : 0;
      let v = line[i];
      if (f === 1) v += a; else if (f === 2) v += bb; else if (f === 3) v += (a + bb) >> 1;
      else if (f === 4) { const pp = a + bb - c, pa = Math.abs(pp - a), pb = Math.abs(pp - bb), pc = Math.abs(pp - c); v += pa <= pb && pa <= pc ? a : pb <= pc ? bb : c; }
      cur[i] = v & 255;
    }
    cur.copy(out, y * stride); prev = cur;
  }
  return { w, h, bpp, ct, bd, px: out };
}
for (const f of process.argv.slice(2)) {
  const img = decode(f);
  const px = (x, y) => { const i = (y * img.w + x) * img.bpp; return [img.px[i], img.px[i + 1], img.px[i + 2], img.bpp === 4 ? img.px[i + 3] : 255]; };
  const hex = (c) => "#" + c.slice(0, 3).map((v) => v.toString(16).padStart(2, "0")).join("");
  console.log("\n" + f.split("/").pop(), img.w + "x" + img.h, "type", img.ct, "bpp", img.bpp);
  console.log(" coins :", hex(px(2, 2)), hex(px(img.w - 3, 2)), hex(px(2, img.h - 3)), hex(px(img.w - 3, img.h - 3)), "alpha", px(2, 2)[3]);
  // ligne horizontale au milieu : où commence le sachet ?
  for (const y of [300, 620, 900, 1150]) {
    let row = "";
    for (let x = 0; x < img.w; x += 40) row += hex(px(x, y)).slice(1, 4) + " ";
    console.log(" y=" + y + " :", row);
  }
  // Colonne au bord du sachet autour de x=255..300 pour y=600 (bande crème)
  let col = ""; for (let x = 230; x < 330; x += 5) col += hex(px(x, 620)) + " "; console.log(" bord gauche y=620 :", col);
  let col2 = ""; for (let x = 950; x < 1060; x += 5) col2 += hex(px(x, 620)) + " "; console.log(" bord droit y=620 :", col2);
  // ombre sous le sachet
  let sh = ""; for (let y = 1150; y < img.h; y += 8) sh += hex(px(600, y)) + " "; console.log(" sous le sachet x=600 :", sh);
}
