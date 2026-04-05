import "dotenv/config";

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on("unhandledRejection", (error) => {
  console.error("[fatal] unhandledRejection", error);
});

process.on("uncaughtException", (error) => {
  console.error("[fatal] uncaughtException", error);
});

const app = express();
const PORT = Number(process.env.PORT || 3000);
const HOST = process.env.HOST || "0.0.0.0";
const DIST_PATH = path.join(__dirname, "..", "dist");

app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));

app.use((req, res, next) => {
  const host = String(req.headers.host || "").toLowerCase();
  if (host === "www.letter-law.ru" || host.startsWith("www.letter-law.ru:")) {
    return res.redirect(301, `https://letter-law.ru${req.originalUrl}`);
  }
  return next();
});

app.use((req, res, next) => {
  const startedAt = Date.now();
  console.log(`[request:start] ${req.method} ${req.originalUrl} ip=${req.ip}`);

  res.on("finish", () => {
    const elapsed = Date.now() - startedAt;
    console.log(
      `[request:done] ${req.method} ${req.originalUrl} status=${res.statusCode} ${elapsed}ms`
    );
  });

  return next();
});

// 1. САМЫЙ ПЕРВЫЙ
app.get("/", (req, res) => {
  return res.status(200).type("text").send("OK");
});

// 2. health
app.get("/health", (req, res) => {
  return res.status(200).json({ ok: true });
});

// 3. API
app.post("/api/request-audit", ...)
app.post("/api/lead", ...)

// 4. ТОЛЬКО ПОСЛЕ ЭТОГО
app.use(express.static(DIST_PATH));

// 5. fallback
app.use((req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});
function clean(value, maxLen) {
  if (typeof value !== "string") return "";
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > maxLen ? normalized.slice(0, maxLen) : normalized;
}

async function leadHandler(req, res) {
  try {
    const body = req.body || {};

    const name = clean(body.name, 80);
    const contact = clean(body.contact, 120);
    const message = clean(body.message, 4000);
    const company = clean(body.company, 120);
    const hp = clean(body.hp, 128);

    if (hp.length > 0) {
      return res.status(200).json({ ok: true, skipped: "honeypot" });
    }

    console.log("[lead] accepted payload", {
      name,
      contact,
      company,
      messageLength: message.length,
      sourceIp: req.ip,
      userAgent: req.headers["user-agent"] || "unknown",
    });

    // External integrations are intentionally disabled during stabilization.
    // No SMTP/Telegram calls here.
    return res.status(200).json({ ok: true, queued: false, integrations: "disabled" });
  } catch (error) {
    console.error("[lead] handler error", error);
    return res.status(200).json({ ok: false, error: "temporary-fallback", handled: true });
  }
}

app.post("/api/request-audit", leadHandler);
app.post("/api/lead", leadHandler);

app.get("/api", (req, res) => {
  return res.status(200).json({ ok: true, service: "express" });
});

app.use(express.static(DIST_PATH, { index: false }));

app.use("/api", (req, res) => {
  return res.status(404).json({ ok: false, error: "Not found" });
});

app.use((req, res) => {
  const indexPath = path.join(DIST_PATH, "index.html");
  if (!fs.existsSync(indexPath)) {
    return res.status(500).type("text").send("dist/index.html not found (run build)");
  }
  return res.sendFile(indexPath);
});

const server = app.listen(PORT, HOST, () => {
  const indexPath = path.join(DIST_PATH, "index.html");
  console.log(
    [
      "[startup]",
      `HOST=${HOST}`,
      `PORT=${PORT}`,
      `DIST_PATH=${DIST_PATH}`,
      `indexExists=${fs.existsSync(indexPath)}`,
    ].join(" ")
  );
  console.log(`[startup] server listening on http://${HOST}:${PORT}`);
});

function shutdown(signal) {
  console.log(`[shutdown] received ${signal}`);
  server.close(() => {
    console.log("[shutdown] server closed");
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
