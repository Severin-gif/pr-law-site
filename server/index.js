import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

// --- __dirname for ESM ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- Config ---
const PORT = Number(process.env.PORT || 3001);
const DIST_PATH = path.join(__dirname, "..", "dist");

// --- Helpers ---
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

// --- Middlewares ---
// JSON body limit: защита от мусора/спама
app.use(express.json({ limit: "32kb" }));

// Минимальный CORS (если фронт и сервер на одном домене — можно вообще убрать)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// --- Health ---
app.get("/api/health", (req, res) => res.json({ ok: true }));

// --- API: Lead form -> Email ---
app.post("/api/lead", async (req, res) => {
  try {
    const { name, contact, message, hp, ts } = req.body || {};

    // honeypot: если бот заполнил — "успех", но ничего не делаем
    if (typeof hp === "string" && hp.trim().length > 0) {
      return res.json({ ok: true });
    }

    // антибот "слишком быстро" (опционально)
    if (typeof ts === "number" && Date.now() - ts < 1200) {
      return res.status(429).json({ ok: false, error: "Too fast" });
    }

    const n = String(name || "").trim();
    const c = String(contact || "").trim();
    const m = String(message || "").trim();

    if (n.length < 2 || n.length > 80) {
      return res.status(400).json({ ok: false, error: "Некорректное имя" });
    }

    if (c.length < 3 || c.length > 120) {
      return res.status(400).json({ ok: false, error: "Некорректный контакт" });
    }

    const contactOk =
      isEmailLike(c) ||
      isPhoneLike(c) ||
      c.startsWith("@") ||
      c.toLowerCase().includes("t.me/");

    if (!contactOk) {
      return res.status(400).json({ ok: false, error: "Укажите email, телефон или Telegram" });
    }

    if (m.length < 10 || m.length > 4000) {
      return res.status(400).json({ ok: false, error: "Опишите ситуацию (10–4000 символов)" });
    }

    const to = mustEnv("LEADS_TO_EMAIL");
    const from = mustEnv("LEADS_FROM_EMAIL");

    const transporter = nodemailer.createTransport({
      host: mustEnv("SMTP_HOST"),          // smtp.timeweb.ru
      port: Number(mustEnv("SMTP_PORT")),  // 465
      secure: String(process.env.SMTP_SECURE || "true") === "true",
      auth: {
        user: mustEnv("SMTP_USER"),        // lead@letter-law.ru
        pass: mustEnv("SMTP_PASS"),
      },
    });

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
      ``,
      `Суть вопроса:`,
      m,
      ``,
      `---`,
      `IP: ${ip}`,
      `UA: ${ua}`,
      `Time: ${new Date().toISOString()}`,
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
    // В проде лучше логировать e.message в файл/логгер
    return res.status(500).json({ ok: false, error: "Server error" });
  }
});

// --- STATIC FRONTEND ---
app.use(express.static(DIST_PATH, { index: false }));

// --- SPA fallback (только после API и статики) ---
app.get(/^(?!\/api\/).*/, (req, res) => {
  res.sendFile(path.join(DIST_PATH, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
