import * as nodemailer from "nodemailer";

export const runtime = "nodejs";

type LeadPayload = {
  name: string;
  contact: string;
  message: string;
  company?: string; // optional field for future
  hp?: string; // honeypot
  ts?: number; // timestamp to detect instant bots
};

function getEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function isEmailLike(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

function isPhoneLike(s: string) {
  return /^[+\d][\d\s()-]{6,}$/.test(s);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadPayload;

    // honeypot: bots often fill hidden field
    if (body.hp && body.hp.trim().length > 0) {
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    // basic “too fast” protection (optional)
    if (body.ts && Date.now() - body.ts < 1200) {
      return new Response(JSON.stringify({ ok: false, error: "Too fast" }), { status: 429 });
    }

    const name = (body.name || "").trim();
    const contact = (body.contact || "").trim();
    const message = (body.message || "").trim();

    if (name.length < 2 || name.length > 80) {
      return new Response(JSON.stringify({ ok: false, error: "Некорректное имя" }), { status: 400 });
    }

    if (contact.length < 3 || contact.length > 120) {
      return new Response(JSON.stringify({ ok: false, error: "Некорректный контакт" }), { status: 400 });
    }

    // accept either email / phone / telegram @username / link
    const contactOk =
      isEmailLike(contact) ||
      isPhoneLike(contact) ||
      contact.startsWith("@") ||
      contact.toLowerCase().includes("t.me/");

    if (!contactOk) {
      return new Response(
        JSON.stringify({ ok: false, error: "Укажите email, телефон или Telegram" }),
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 4000) {
      return new Response(JSON.stringify({ ok: false, error: "Опишите ситуацию (10–4000 символов)" }), {
        status: 400,
      });
    }

    const to = getEnv("LEADS_TO_EMAIL");
    const from = getEnv("LEADS_FROM_EMAIL");

    const transporter = nodemailer.createTransport({
      host: getEnv("SMTP_HOST"),
      port: Number(getEnv("SMTP_PORT")),
      secure: getEnv("SMTP_SECURE") === "true",
      auth: {
        user: getEnv("SMTP_USER"),
        pass: getEnv("SMTP_PASS"),
      },
    });

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const ua = req.headers.get("user-agent") || "unknown";

    const subject = `Заявка с сайта: ${name} (${contact})`;

    const text = [
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      ``,
      `Суть вопроса:`,
      message,
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
      replyTo: isEmailLike(contact) ? contact : undefined, // удобно отвечать прямо из письма
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: "Server error" }), { status: 500 });
  }
}
