// server/index.js
import "dotenv/config";

import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

process.on("unhandledRejection", (e) => console.error("unhandledRejection:", e));
process.on("uncaughtException", (e) => console.error("uncaughtException:", e));

const app = express();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";
const DIST_PATH = path.join(__dirname, "..", "dist");

app.set("trust proxy", 1);
app.use((req, res, next) => {
  const host = req.headers.host?.toLowerCase();
  if (host === "www.letter-law.ru" || host?.startsWith("www.letter-law.ru:")) {
    return res.redirect(301, `https://letter-law.ru${req.originalUrl}`);
  }
  return next();
});
app.use(express.json({ limit: "32kb" }));

// health (можно указать в Timeweb как "Путь проверки состояния")
app.get("/health", (req, res) => res.status(200).type("text").send("ok"));
app.get("/api/health", (req, res) => res.json({ ok: true }));

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

// ---- антиспам по IP (in-memory) ----
// 1) двойной клик/двойной submit: < 3с → "ok:true" без отправки письма (без ошибок в UI)
// 2) частые попытки: < 30с → 429 Too many requests
const lastByIp = new Map(); // ip -> timestamp (ms)
function rateGuard(req, res) {
  const ip = getClientIp(req);
  const now = Date.now();
  const last = lastByIp.get(ip) || 0;

  if (now - last < 3000) {
    // дубликат клика — молча "успех", чтобы пользователь не спамил кнопку
    return { ok: true, silent: true };
  }
  if (now - last < 30000) {
    return { ok: false, code: 429, error: "Too many requests" };
  }

  lastByIp.set(ip, now);
  return { ok: true, silent: false };
}

async function sendLeadEmail({ n, c, m, req }) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const leadsTo = process.env.LEADS_TO_EMAIL;
  const leadsFrom = process.env.LEADS_FROM_EMAIL;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !leadsTo || !leadsFrom) {
    return { ok: false, error: "Email is not configured", status: 503 };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: Number(smtpPort),
    secure: String(process.env.SMTP_SECURE ?? "true") === "true",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const ip = getClientIp(req);
  const ua = req.headers["user-agent"] || "unknown";
  const origin = req.headers["origin"] || "unknown";

  const subject = `Заявка с сайта: ${n} (${c})`;
  const text = [
    `Имя: ${n}`,
    `Контакт: ${c}`,
    ``,
    `Суть вопроса:`,
    m,
    ``,
    `---`,
    `Origin: ${origin}`,
    `IP: ${ip}`,
    `UA: ${ua}`,
    `Time: ${new Date().toISOString()}`,
  ].join("\n");

  await transporter.sendMail({
    from: leadsFrom,
    to: leadsTo,
    subject,
    text,
    replyTo: isEmailLike(c) ? c : undefined,
  });

  return { ok: true };
}

async function leadHandler(req, res) {
  try {
    const { name, contact, message, hp, consent } = req.body || {};

    // honeypot: если заполнено — бот. Возвращаем "ок", но ничего не делаем.
    if (typeof hp === "string" && hp.trim().length > 0) {
      return res.json({ ok: true });
    }

    // явное согласие обязательно
    if (consent !== true) {
      return res.status(400).json({ ok: false, error: "Consent required" });
    }

    // rate guard (дубликаты клика и спам)
    const guard = rateGuard(req, res);
    if (!guard.ok) return res.status(guard.code).json({ ok: false, error: guard.error });
    if (guard.silent) return res.json({ ok: true }); // тихо "успех" без отправки письма

    const n = clean(name, 80);
    const c = clean(contact, 120);
    const m = clean(message, 4000);

    if (n.length < 2) {
      return res.status(400).json({ ok: false, error: "Некорректное имя" });
    }

    const contactOk =
      isEmailLike(c) || isPhoneLike(c) || c.startsWith("@") || c.toLowerCase().includes("t.me/");
    if (!contactOk) {
      return res.status(400).json({ ok: false, error: "Укажите email, телефон или Telegram" });
    }

    if (m.length < 10 || m.length > 4000) {
      return res.status(400).json({ ok: false, error: "Опишите ситуацию (10–4000 символов)" });
    }

    const emailResult = await sendLeadEmail({ n, c, m, req });
    if (!emailResult.ok) {
      const status = emailResult.status || 500;
      return res.status(status).json({ ok: false, error: emailResult.error });
    }

    return res.json({ ok: true });
  } catch (e) {
    console.error("LEAD_ERROR:", e);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

// API
app.post("/api/lead", leadHandler);
app.post("/api/request-audit", leadHandler);

// static + SPA fallback
app.use(express.static(DIST_PATH, { index: false }));
app.get("/", (req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

// listen
const server = app.listen(PORT, HOST, () => {
  const indexPath = path.join(DIST_PATH, "index.html");
  console.log(
    [
      "Startup config:",
      `PORT=${PORT}`,
      `DIST_PATH=${DIST_PATH}`,
      `index.html exists=${fs.existsSync(indexPath)}`,
    ].join(" ")
  );
  console.log(`✅ Server running on port ${PORT}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}, shutting down...`);
  server.close(() => {
    console.log("Server closed.");
  });
}
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
