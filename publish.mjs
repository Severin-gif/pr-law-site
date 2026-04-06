// scripts/publish.mjs
import fs from "node:fs";
import path from "node:path";

const srcDir = path.resolve("dist");
const outDir = path.resolve(".");
const srcIndex = path.join(srcDir, "index.html");
const srcAssets = path.join(srcDir, "assets");
const outIndex = path.join(outDir, "index.html");
const outAssets = path.join(outDir, "assets");
const srcApi = path.join(srcDir, "api");
const outApi = path.join(outDir, "api");
const srcHtaccess = path.join("public", ".htaccess");
const outHtaccess = path.join(outDir, ".htaccess");

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

if (fs.existsSync(srcIndex)) {
  fs.copyFileSync(srcIndex, outIndex);
}

// чистим старые assets/api (чтобы не было мусора)
fs.rmSync(outAssets, { recursive: true, force: true });
fs.rmSync(outApi, { recursive: true, force: true });

if (fs.existsSync(srcAssets)) {
  copyDir(srcAssets, outAssets);
}

if (fs.existsSync(srcApi)) {
  copyDir(srcApi, outApi);
}

if (fs.existsSync(srcHtaccess)) {
  fs.copyFileSync(srcHtaccess, outHtaccess);
}

console.log("published dist to root");
