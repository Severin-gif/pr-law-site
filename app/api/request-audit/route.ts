import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RequestAuditPayload = {
  name?: unknown;
  contact?: unknown;
  message?: unknown;
  hp?: unknown;
};

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(req: Request) {
  try {
    const { name, contact, message, hp }: RequestAuditPayload = await req.json();

    if (asTrimmedString(hp).length > 0) {
      return NextResponse.json({ ok: true, skipped: "honeypot" }, { status: 200 });
    }

    const cleanName = asTrimmedString(name);
    const cleanContact = asTrimmedString(contact);
    const cleanMessage = asTrimmedString(message);

    console.log("[next:request-audit] incoming", {
      name: cleanName,
      contact: cleanContact,
      messageLength: cleanMessage.length,
    });

    // Temporary stabilization mode: external integrations are disabled.
    return NextResponse.json({ ok: true, integrations: "disabled" }, { status: 200 });
  } catch (error) {
    console.error("[next:request-audit] error", error);
    return NextResponse.json({ ok: false, handled: true }, { status: 200 });
  }
}
