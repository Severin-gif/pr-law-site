// scripts/publish.mjs
import fs from "node:fs";
import path from "node:path";

const srcDir = path.resolve("dist");
const outDir = path.resolve(".");

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// чистим старые assets (чтобы не было мусора)
fs.rmSync(path.join(outDir, "assets"), { recursive: true, force: true });

// копируем dist/* → ./*
copyDir(srcDir, outDir);

console.log("Published dist/* to repo root");
