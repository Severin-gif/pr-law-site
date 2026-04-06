import "dotenv/config";

import crypto from "crypto";
import express from "express";
import fs from "fs";
import nodemailer from "nodemailer";
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
const DIST_PATH = path.resolve("dist");
const SMTP_HOST = cleanRequiredEnv("SMTP_HOST");
const SMTP_PORT = parsePort(process.env.SMTP_PORT);
const SMTP_SECURE = parseBool(process.env.SMTP_SECURE);
const SMTP_USER = cleanRequiredEnv("SMTP_USER");
const SMTP_PASS = cleanRequiredEnv("SMTP_PASS");
const MAIL_TO = cleanRequiredEnv("MAIL_TO");
const MAIL_FROM = cleanRequiredEnv("MAIL_FROM");

const leadTransporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

const leadRateLimit = new Map();
const leadDuplicateGuard = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const DUPLICATE_TTL_MS = 90 * 1000;
const MIN_MESSAGE_LEN = 10;
const MIN_NAME_LEN = 2;
const MIN_CONTACT_LEN = 5;
const MIN_SUBMIT_DELAY_MS = 1200;
const LEAD_ALLOWED_FIELDS = new Set(["name", "contact", "message", "consent", "hp", "ts"]);

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

function cleanRequiredEnv(name) {
  const value = clean(process.env[name], 255);
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function parseBool(value) {
  const normalized = clean(value, 12).toLowerCase();
  return ["1", "true", "yes", "on"].includes(normalized);
}

function parsePort(value) {
  const port = Number(value);
  if (!Number.isInteger(port) || port <= 0 || port > 65535) {
    throw new Error("Missing or invalid required environment variable: SMTP_PORT");
  }
  return port;
}

function clean(value, maxLen) {
  if (typeof value !== "string") return "";
  const normalized = value.trim().replace(/\s+/g, " ");
  return normalized.length > maxLen ? normalized.slice(0, maxLen) : normalized;
}

function parseTimestamp(tsRaw) {
  const num = Number(tsRaw);
  if (!Number.isFinite(num) || num <= 0) {
    return null;
  }
  if (num > Date.now() + 10 * 1000) {
    return null;
  }
  return num;
}

function isSuspiciousPayload(name, contact, message) {
  const merged = `${name}\n${contact}\n${message}`.toLowerCase();
  if (/https?:\/\//.test(merged) || /\bviagra\b|\bcasino\b|\bcrypto\b/.test(merged)) {
    return true;
  }
  return false;
}

function isRateLimited(ip, nowMs) {
  const prev = leadRateLimit.get(ip) || [];
  const recent = prev.filter((ts) => nowMs - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    leadRateLimit.set(ip, recent);
    return true;
  }
  recent.push(nowMs);
  leadRateLimit.set(ip, recent);
  return false;
}

function hashPayload(name, contact, message) {
  return crypto.createHash("sha256").update(`${name}\n${contact}\n${message}`).digest("hex");
}

function isDuplicateLead(ip, payloadHash, nowMs) {
  for (const [key, ts] of leadDuplicateGuard.entries()) {
    if (nowMs - ts > DUPLICATE_TTL_MS) {
      leadDuplicateGuard.delete(key);
    }
  }

  const dedupeKey = `${ip}:${payloadHash}`;
  const previous = leadDuplicateGuard.get(dedupeKey);
  if (typeof previous === "number" && nowMs - previous <= DUPLICATE_TTL_MS) {
    leadDuplicateGuard.set(dedupeKey, nowMs);
    return true;
  }

  leadDuplicateGuard.set(dedupeKey, nowMs);
  return false;
}

function logLeadReject(reason, req, details = {}) {
  console.warn("[lead] rejected", {
    reason,
    ip: clean(req.ip, 128) || "unknown",
    path: req.originalUrl,
    ...details,
  });
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function leadEmailText({ source, name, contact, message, ip, userAgent, timestamp }) {
  return [
    "Новая заявка с формы сайта.",
    "",
    `Источник формы: ${source}`,
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    `Сообщение: ${message}`,
    `IP: ${ip}`,
    `User-Agent: ${userAgent}`,
    `Timestamp: ${timestamp}`,
  ].join("\n");
}

async function leadHandler(req, res) {
  if (req.method !== "POST") {
    logLeadReject("validation_failed", req, { code: "method_not_allowed" });
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    if (!req.is("application/json")) {
      logLeadReject("validation_failed", req, { code: "unsupported_media_type" });
      return res.status(415).json({ ok: false, error: "unsupported_media_type" });
    }

    const body = req.body;
    if (!isPlainObject(body)) {
      logLeadReject("validation_failed", req, { code: "invalid_body_type" });
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    const fields = Object.keys(body);
    const hasUnexpectedField = fields.some((field) => !LEAD_ALLOWED_FIELDS.has(field));
    const hasMissingField = [...LEAD_ALLOWED_FIELDS].some((field) => !(field in body));
    if (hasUnexpectedField || hasMissingField) {
      logLeadReject("validation_failed", req, { code: "invalid_schema", fieldCount: fields.length });
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    const name = clean(body.name, 80);
    const contact = clean(body.contact, 120);
    const message = clean(body.message, 4000);
    const source = clean(req.headers.referer, 200) || "unknown";
    const hp = clean(body.hp, 128);
    const consent = Boolean(body.consent);
    const ip = clean(req.ip, 128) || "unknown";
    const userAgent = clean(req.headers["user-agent"], 500) || "unknown";
    const tsMs = parseTimestamp(body.ts);
    const nowMs = Date.now();

    if (hp.length > 0) {
      logLeadReject("honeypot", req);
      return res.status(200).json({ ok: true });
    }

    if (!name || !contact || !message || !consent) {
      logLeadReject("validation_failed", req, { code: "required_fields" });
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    if (name.length < MIN_NAME_LEN || contact.length < MIN_CONTACT_LEN || message.length < MIN_MESSAGE_LEN) {
      logLeadReject("validation_failed", req, { code: "too_short" });
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    if (!tsMs || nowMs - tsMs < MIN_SUBMIT_DELAY_MS) {
      logLeadReject("validation_failed", req, { code: "timing_check_failed" });
      return res.status(202).json({ ok: true });
    }

    if (isSuspiciousPayload(name, contact, message)) {
      logLeadReject("validation_failed", req, { code: "suspicious_payload" });
      return res.status(422).json({ ok: false, error: "suspicious_payload" });
    }

    if (isDuplicateLead(ip, hashPayload(name, contact, message), nowMs)) {
      logLeadReject("rate_limited", req, { code: "duplicate" });
      return res.status(429).json({ ok: false, error: "rate_limited" });
    }

    if (isRateLimited(ip, nowMs)) {
      logLeadReject("rate_limited", req, { code: "ip_window" });
      return res.status(429).json({ ok: false, error: "rate_limited" });
    }

    const text = leadEmailText({
      source,
      name,
      contact,
      message,
      ip,
      userAgent,
      timestamp: new Date(tsMs).toISOString(),
    });

    await leadTransporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `Новая заявка: ${name}`,
      text,
      replyTo: contact,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("[lead] SMTP/internal error", {
      message: error instanceof Error ? error.message : "unknown",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return res.status(500).json({ ok: false, error: "internal_error" });
  }
}

app.all("/api/request-audit", leadHandler);
app.all("/form-handler.php", leadHandler);

app.get("/api", (req, res) => {
  return res.status(200).json({ ok: true, service: "express" });
});

app.use(
  express.static(DIST_PATH, {
    index: false,
    setHeaders(res, filePath) {
      if (filePath.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        return;
      }

      const normalized = filePath.replace(/\\/g, "/");
      const isHashedAsset = /\/assets\/.+\.[a-z0-9]{8,}\.(css|js)$/.test(normalized);
      if (isHashedAsset) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

app.use("/api", (req, res) => {
  return res.status(404).json({ ok: false, error: "Not found" });
});

app.use((req, res) => {
  const indexPath = path.join(DIST_PATH, "index.html");
  if (!fs.existsSync(indexPath)) {
    return res.status(500).type("text").send("dist/index.html not found (run build)");
  }
  return res.sendFile(indexPath, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
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
