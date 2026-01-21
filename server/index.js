// server/index.js
import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on("unhandledRejection", (e) => console.error("unhandledRejection:", e));
process.on("uncaughtException", (e) => console.error("uncaughtException:", e));

const app = express();

// важно: на платформах почти всегда ожидается 3000
const PORT = Number(process.env.PORT || 3000);
const DIST_PATH = path.join(__dirname, "..", "dist");

app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}
function isEmailLike(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function isPhoneLike(s) {
  return /^[+\d][\d\s()-]{6,}$/.test(s);
}

// CORS нужен только если фронт и API на разных доменах
app.use((req, res, next) => {
  const origin = process.env.CORS_ORIGIN;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// healthcheck — сюда же выставь “Путь проверки состояния” в панели
app.get("/api/health", (req, res) => res.json({ ok: true }));

async function leadHandler(req, res) {
  try {
    const { name, contact, message, hp, ts } = req.body || {};

    // honeypot
    if (typeof hp === "string" && hp.trim().length > 0) return res.json({ ok: true });

    // очень простой антибот
    if (typeof ts === "number" && Date.now() - ts < 1200) {
      return res.status(429).json({ ok: false, error: "Too fast" });
    }

    const n = String(name || "").trim();
    const c = String(contact || "").trim();
    const m = String(message || "").trim();

    if (n.length < 2 || n.length > 80) return res.status(400).json({ ok: false, error: "Некорректное имя" });
    if (c.length < 3 || c.length > 120) return res.status(400).json({ ok: false, error: "Некорректный контакт" });

    const contactOk =
      isEmailLike(c) || isPhoneLike(c) || c.startsWith("@") || c.toLowerCase().includes("t.me/");
    if (!contactOk) return res.status(400).json({ ok: false, error: "Укажите email, телефон или Telegram" });

    if (m.length < 10 || m.length > 4000) {
      return res.status(400).json({ ok: false, error: "Опишите ситуацию (10–4000 символов)" });
    }

    const transporter = nodemailer.createTransport({
      host: mustEnv("SMTP_HOST"),
      port: Number(mustEnv("SMTP_PORT")),
      secure: String(process.env.SMTP_SECURE ?? "true") === "true",
      auth: { user: mustEnv("SMTP_USER"), pass: mustEnv("SMTP_PASS") },
    });

    const to = mustEnv("LEADS_TO_EMAIL");
    const from = mustEnv("LEADS_FROM_EMAIL");

    const ip =
      (req.headers["x-forwarded-for"]?.split?.(",")?.[0]?.trim?.() ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "unknown");
    const ua = req.headers["user-agent"] || "unknown";

    await transporter.sendMail({
      from,
      to,
      subject: `Заявка с сайта: ${n} (${c})`,
      text: [`Имя: ${n}`, `Контакт: ${c}`, "", "Суть вопроса:", m, "", "---", `IP: ${ip}`, `UA: ${ua}`, `Time: ${new Date().toISOString()}`].join("\n"),
      replyTo: isEmailLike(c) ? c : undefined,
    });

    return res.json({ ok: true });
  } catch (e) {
    console.error("LEAD_ERROR:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

app.post("/api/lead", leadHandler);
app.post("/api/request-audit", leadHandler);

// раздача статики
app.use(express.static(DIST_PATH, { index: false }));

// SPA fallback (не ловит /api/*)
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => process.exit(0));
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
