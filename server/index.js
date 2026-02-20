// server/index.js
import "dotenv/config";

import express from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- crash logs (чтобы не молчало) ---
process.on("unhandledRejection", (e) => console.error("unhandledRejection:", e));
process.on("uncaughtException", (e) => console.error("uncaughtException:", e));

const app = express();
app.use((req, res, next) => {
  const host = String(req.headers.host || "").toLowerCase();
  if (host === "www.letter-law.ru" || host.startsWith("www.letter-law.ru:")) {
    return res.redirect(301, `https://letter-law.ru${req.originalUrl}`);
  }
  next();
});

// TimeWeb Apps обычно задаёт PORT через env. НИКАКИХ “жёстких 3000” в коде.
const PORT = Number(process.env.PORT || 3000);
const HOST = "0.0.0.0";

// Vite build: dist лежит на уровень выше server/
const DIST_PATH = path.join(__dirname, "..", "dist");

// --- basic middleware ---
app.set("trust proxy", 1);
app.use(express.json({ limit: "32kb" }));

// редирект www -> non-www (опционально, но полезно)
app.use((req, res, next) => {
  const host = String(req.headers.host || "").toLowerCase();
  if (host === "www.letter-law.ru" || host.startsWith("www.letter-law.ru:")) {
    return res.redirect(301, `https://letter-law.ru${req.originalUrl}`);
  }
  next();
});

// --- health endpoints ---
app.get("/health", (req, res) => res.status(200).type("text").send("ok"));
app.get("/api/_ping", (req, res) => res.json({ ok: true, source: "express", t: Date.now() }));

// --- helpers ---
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

function getClientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string" && xf.length) return xf.split(",")[0].trim();
  const xr = req.headers["x-real-ip"];
  if (typeof xr === "string" && xr.length) return xr.trim();
  return req.socket?.remoteAddress || "unknown";
}

// антиспам: защита от дублей/спама по IP (in-memory)
const lastByIp = new Map(); // ip -> timestamp (ms)
function rateGuard(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const last = lastByIp.get(ip) || 0;

  // дубль клика в пределах 3с: молча ok (чтобы UI не спамили)
  if (now - last < 3000) return { ok: true, silent: true };

  // спам чаще чем раз в 30с: 429
  if (now - last < 30000) return { ok: false, code: 429, error: "Too many requests" };

  lastByIp.set(ip, now);
  return { ok: true, silent: false };
}

// --- mail transport (TimeWeb SMTP by default) ---
function getMailConfig() {
  // 1) Совместимость со старыми переменными (если уже настроил)
  const SMTP_HOST = process.env.SMTP_HOST;
  const SMTP_PORT = process.env.SMTP_PORT;
  const SMTP_USER = process.env.SMTP_USER;
  const SMTP_PASS = process.env.SMTP_PASS;
  const SMTP_SECURE = process.env.SMTP_SECURE;

  const LEADS_TO_EMAIL = process.env.LEADS_TO_EMAIL;
  const LEADS_FROM_EMAIL = process.env.LEADS_FROM_EMAIL;

  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    return {
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: String(SMTP_SECURE ?? "true") === "true",
      user: SMTP_USER,
      pass: SMTP_PASS,
      to: LEADS_TO_EMAIL || SMTP_USER,
      from: LEADS_FROM_EMAIL || `Letter Law <${SMTP_USER}>`,
    };
  }

  // 2) Нормальная схема для TimeWeb почты
  const MAIL_USER = process.env.MAIL_USER; // lead@letter-law.ru
  const MAIL_PASS = process.env.MAIL_PASS;

  if (!MAIL_USER || !MAIL_PASS) return null;

  return {
    host: "smtp.timeweb.ru",
    port: 465,
    secure: true,
    user: MAIL_USER,
    pass: MAIL_PASS,
    to: process.env.LEADS_TO_EMAIL || MAIL_USER,
    from: process.env.LEADS_FROM_EMAIL || `Letter Law <${MAIL_USER}>`,
  };
}

async function sendLeadEmail({ name, contact, message, company, req }) {
  const cfg = getMailConfig();
  if (!cfg) {
    return { ok: false, status: 503, error: "Email is not configured (MAIL_USER/MAIL_PASS)" };
  }

  const transporter = nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure,
    auth: { user: cfg.user, pass: cfg.pass },
  });

  const ip = getClientIp(req);
  const ua = String(req.headers["user-agent"] || "unknown");
  const origin = String(req.headers.origin || "unknown");

  const subject = `Новая заявка с сайта: ${name} (${contact})`;
  const text = [
    `Имя: ${name}`,
    `Контакт: ${contact}`,
    company ? `Компания: ${company}` : null,
    ``,
    `Суть вопроса:`,
    message,
    ``,
    `---`,
    `Origin: ${origin}`,
    `IP: ${ip}`,
    `UA: ${ua}`,
    `Time: ${new Date().toISOString()}`,
  ]
    .filter(Boolean)
    .join("\n");

  await transporter.sendMail({
    from: cfg.from,
    to: cfg.to,
    subject,
    text,
    replyTo: isEmailLike(contact) ? contact : undefined,
  });

  return { ok: true };
}

// --- main handler ---
async function leadHandler(req, res) {
  try {
    const body = req.body || {};

    // ожидания по форме:
    // name, contact, message, consent (checkbox), hp (honeypot), ts (timestamp)
    const name = clean(body.name, 80);
    const contact = clean(body.contact, 120);
    const message = clean(body.message, 4000);
    const company = clean(body.company, 120);

    const hp = typeof body.hp === "string" ? body.hp : "";
    const consent = body.consent === true;

    // honeypot: если заполнено — бот → тихий ok
    if (hp.trim().length > 0) return res.json({ ok: true });

    // согласие обязательно (иначе мусор и юридический риск)
    if (!consent) return res.status(400).json({ ok: false, error: "Consent required" });

    // антиспам по IP
    const guard = rateGuard(req);
    if (!guard.ok) return res.status(guard.code).json({ ok: false, error: guard.error });
    if (guard.silent) return res.json({ ok: true });

    // валидация полей
    if (name.length < 2) return res.status(400).json({ ok: false, error: "Некорректное имя" });

    const contactOk =
      isEmailLike(contact) ||
      isPhoneLike(contact) ||
      contact.startsWith("@") ||
      contact.toLowerCase().includes("t.me/");

    if (!contactOk) {
      return res.status(400).json({ ok: false, error: "Укажите email, телефон или Telegram" });
    }

    if (message.length < 10 || message.length > 4000) {
      return res.status(400).json({ ok: false, error: "Опишите ситуацию (10–4000 символов)" });
    }

    // отправка письма
    try {
      const r = await sendLeadEmail({ name, contact, message, company, req });
      if (!r.ok) return res.status(r.status || 500).json({ ok: false, error: r.error });
    } catch (e) {
      console.error("MAIL_ERROR:", e);
      // диагностично, но без выдачи внутренностей пользователю
      return res.status(500).json({ ok: false, error: "Mail send failed" });
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error("LEAD_HANDLER_ERROR:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

// API endpoints (оба, чтобы не ловить 405)
app.post("/api/request-audit", leadHandler);
app.post("/api/lead", leadHandler);

// --- static (Vite) + SPA fallback ---
app.use(express.static(DIST_PATH, { index: false }));

app.get("*", (req, res) => {
  const indexPath = path.join(DIST_PATH, "index.html");
  if (!fs.existsSync(indexPath)) {
    return res.status(500).type("text").send("dist/index.html not found (run build)");
  }
  res.sendFile(indexPath);
});

// --- start ---
const server = app.listen(PORT, HOST, () => {
  const indexPath = path.join(DIST_PATH, "index.html");
  console.log(
    [
      "Startup config:",
      `HOST=${HOST}`,
      `PORT=${PORT}`,
      `DIST_PATH=${DIST_PATH}`,
      `index.html exists=${fs.existsSync(indexPath)}`,
    ].join(" ")
  );
  console.log(`✅ Server running: http://${HOST}:${PORT}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => console.log("Server closed."));
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));