import "dotenv/config";

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

// --- __dirname for ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on("unhandledRejection", (e) => console.error("unhandledRejection:", e));
process.on("uncaughtException", (e) => console.error("uncaughtException:", e));

const app = express();

// ВАЖНО: Timeweb проксирует на PORT из окружения; дефолт ставим 3000
const PORT = process.env.PORT || 3000;

// dist лежит в корне контейнера: /app/dist
const DIST_PATH = path.join(__dirname, "..", "dist");

app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));

// healthcheck (можно указать в панели деплоя как путь проверки состояния)
app.get("/api/health", (req, res) => res.json({ ok: true }));

function mustEnv(name) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function clean(v, maxLen) {
  if (typeof v !== "string") return "";
  const s = v.trim().replace(/\s+/g, " ");
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function isEmailLike(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function isPhoneLike(s) {
  return /^[+\d][\d\s()-]{6,}$/.test(s);
}

async function leadHandler(req, res) {
  try {
    const { name, contact, message, hp, consent, ts } = req.body || {};

    // honeypot (если заполнено — бот)
    if (typeof hp === "string" && hp.trim().length > 0) return res.json({ ok: true });

    // простая антибот-проверка: слишком быстро после загрузки
    if (typeof ts === "number" && Date.now() - ts < 1200) {
      return res.status(429).json({ ok: false, error: "Too fast" });
    }

    if (!consent) return res.status(400).json({ ok: false, error: "Consent required" });

    const n = clean(name, 80);
    const c = clean(contact, 120);
    const m = clean(message, 4000);

    if (n.length < 2) return res.status(400).json({ ok: false, error: "Некорректное имя" });
    if (c.length < 3) return res.status(400).json({ ok: false, error: "Некорректный контакт" });
    if (m.length < 10) return res.status(400).json({ ok: false, error: "Сообщение слишком короткое" });

    const contactOk =
      isEmailLike(c) || isPhoneLike(c) || c.startsWith("@") || c.toLowerCase().includes("t.me/");
    if (!contactOk) {
      return res.status(400).json({ ok: false, error: "Укажите email, телефон или Telegram" });
    }

    const transporter = nodemailer.createTransport({
      host: mustEnv("SMTP_HOST"),
      port: Number(mustEnv("SMTP_PORT")),
      secure: String(process.env.SMTP_SECURE ?? "true") === "true",
      auth: {
        user: mustEnv("SMTP_USER"),
        pass: mustEnv("SMTP_PASS"),
      },
    });

    const to = mustEnv("LEADS_TO_EMAIL");
    const from = mustEnv("LEADS_FROM_EMAIL");

    const ip =
      (req.headers["x-forwarded-for"]?.split?.(",")?.[0]?.trim?.() ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "unknown");
    const ua = req.headers["user-agent"] || "unknown";

    const subject = `Заявка с сайта: ${n} (${c})`;
    const text = [
      `Имя: ${n}`,
      `Контакт: ${c}`,
      "",
      "Суть вопроса:",
      m,
      "",
      "---",
      `IP: ${ip}`,
      `UA: ${ua}`,
      `Time: ${new Date().toISOString()}`
    ].join("\n");

    await transporter.sendMail({
      from,
      to,
      subject,
      text,
      replyTo: isEmailLike(c) ? c : undefined,
    });

    return res.json({ ok: true });
  } catch (e) {
    console.error("LEAD_ERROR:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

// формы (оставил оба роута, как у тебя было в обсуждении)
app.post("/api/lead", leadHandler);
app.post("/api/request-audit", leadHandler);

// раздача статики
app.use(express.static(DIST_PATH, { index: false }));

// SPA fallback (не перехватываем /api/*)
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server running on port ${PORT}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => process.exit(0));
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
