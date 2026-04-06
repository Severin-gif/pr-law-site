import "dotenv/config";

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
const DIST_PATH = path.join(__dirname, "..", "dist");

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
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;

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
    return new Date().toISOString();
  }
  const date = new Date(num);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }
  return date.toISOString();
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
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }

  try {
    const body = req.body || {};
    const name = clean(body.name, 80);
    const contact = clean(body.contact, 120);
    const message = clean(body.message, 4000);
    const source = clean(body.source, 120) || clean(req.headers.referer, 200) || "unknown";
    const hp = clean(body.hp, 128);
    const consent = Boolean(body.consent);
    const ip = clean(req.ip, 128) || "unknown";
    const userAgent = clean(req.headers["user-agent"], 500) || "unknown";
    const timestamp = parseTimestamp(body.ts);

    if (hp.length > 0) {
      return res.status(429).json({ ok: false, error: "anti_spam" });
    }

    if (!name || !contact || !message || !consent) {
      return res.status(400).json({ ok: false, error: "invalid_payload" });
    }

    if (isSuspiciousPayload(name, contact, message)) {
      return res.status(422).json({ ok: false, error: "suspicious_payload" });
    }

    if (isRateLimited(ip, Date.now())) {
      return res.status(429).json({ ok: false, error: "rate_limited" });
    }

    const text = leadEmailText({
      source,
      name,
      contact,
      message,
      ip,
      userAgent,
      timestamp,
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
