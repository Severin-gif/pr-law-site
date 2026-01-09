import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/request-audit", async (req, res) => {
  const { name, contact, message, hp } = req.body || {};
  if (hp && String(hp).trim().length > 0) return res.json({ ok: true });

  if (!name || !contact || !message) return res.status(400).json({ error: "Заполните поля" });

  const nm = String(name).trim();
  const ct = String(contact).trim();
  const msg = String(message).trim();

  if (nm.length < 2) return res.status(400).json({ error: "Имя слишком короткое" });
  if (ct.length < 5) return res.status(400).json({ error: "Контакт некорректный" });
  if (msg.length < 10) return res.status(400).json({ error: "Сообщение слишком короткое" });

  const {
    SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS,
    SMTP_FROM, LEADS_TO_EMAIL
  } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !LEADS_TO_EMAIL) {
    return res.status(500).json({ error: "SMTP/Email не настроен на сервере" });
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 465),
    secure: String(SMTP_SECURE || "true") === "true",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transporter.sendMail({
    from: SMTP_FROM,
    to: LEADS_TO_EMAIL,
    subject: `Запрос разбора: ${nm}`,
    text: `Новый запрос с сайта\n\nИмя: ${nm}\nКонтакт: ${ct}\n\nСообщение:\n${msg}\n`,
    replyTo: ct.includes("@") ? ct : undefined,
  });

  return res.json({ ok: true });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
