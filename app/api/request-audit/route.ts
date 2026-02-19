import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RequestAuditPayload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  hp?: unknown;
  ts?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  const { name, contact, message, hp }: RequestAuditPayload = await req.json();

  if (asTrimmedString(hp).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const cleanName = asTrimmedString(name);
  const cleanContact = asTrimmedString(contact);
  const cleanMessage = asTrimmedString(message);

  if (!cleanName || !cleanContact || !cleanMessage) {
    return NextResponse.json(
      { ok: false, error: "name, contact и message обязательны" },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.timeweb.ru",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: "lead@letter-law.ru",
      subject: "Новая заявка с letter-law.ru",
      text: [`Имя: ${cleanName}`, `Контакт: ${cleanContact}`, "", cleanMessage].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("REQUEST_AUDIT_SEND_ERROR", error);
    return NextResponse.json({ ok: false, error: "Не удалось отправить письмо" }, { status: 500 });
  }
}
