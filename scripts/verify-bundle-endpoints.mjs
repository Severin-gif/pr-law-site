import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve("dist");
const assetsDir = path.join(distDir, "assets");
const legacyEndpoint = "/api/request-audit";
const newEndpoint = "/form-handler.php";

if (!fs.existsSync(assetsDir)) {
  console.error(`[verify-bundle] assets directory not found: ${assetsDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(assetsDir, { withFileTypes: true })
  .filter((entry) => entry.isFile() && /\.(js|map)$/.test(entry.name))
  .map((entry) => path.join(assetsDir, entry.name));

if (files.length === 0) {
  console.error("[verify-bundle] no JS/source-map files found in dist/assets");
  process.exit(1);
}

const violations = [];
let hasNewEndpoint = false;

for (const filePath of files) {
  const content = fs.readFileSync(filePath, "utf8");

  if (content.includes(legacyEndpoint)) {
    violations.push(path.relative(process.cwd(), filePath));
  }

  if (content.includes(newEndpoint)) {
    hasNewEndpoint = true;
  }
}

if (violations.length > 0) {
  console.error(
    `[verify-bundle] found legacy endpoint \"${legacyEndpoint}\" in:\n${violations
      .map((file) => `  - ${file}`)
      .join("\n")}`
  );
  process.exit(1);
}

if (!hasNewEndpoint) {
  console.error(
    `[verify-bundle] new endpoint \"${newEndpoint}\" was not found in built JS/source-map artifacts`
  );
  process.exit(1);
}

console.log(
  `[verify-bundle] ok: no legacy endpoint references found; detected new endpoint \"${newEndpoint}\"`
);
