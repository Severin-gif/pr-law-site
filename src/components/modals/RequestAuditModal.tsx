import { useEffect, useState, type FormEvent } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function RequestAuditModal({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); // телефон/telegram/email
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // антиспам: должен быть пустым
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle"
  );
  const [errorText, setErrorText] = useState<string>("");

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setStatus("idle");
      setErrorText("");
      setName("");
      setContact("");
      setMessage("");
      setHoneypot("");
    }
  }, [open]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorText("");

    try {
      const res = await fetch("/api/request-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message, hp: honeypot }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Ошибка отправки");
      }

      setStatus("ok");
    } catch (err: unknown) {
      setStatus("error");
      setErrorText(err instanceof Error ? err.message : "Ошибка отправки");
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* modal */}
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-[#0B0D10] p-6 text-white shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold">Запросить разбор</div>
            <div className="mt-1 text-sm text-white/70">
              Коротко опишите ситуацию. Я отвечу на указанный контакт.
            </div>
          </div>
          <button
            className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5"
            onClick={onClose}
            type="button"
          >
            Закрыть
          </button>
        </div>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          {/* honeypot (скрытое поле) */}
          <input
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div>
            <label className="text-xs text-white/60">Имя</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              placeholder="Как к вам обращаться"
            />
          </div>

          <div>
            <label className="text-xs text-white/60">
              Контакт (телефон / Telegram / email)
            </label>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              minLength={5}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              placeholder="@telegram или +7… или email"
            />
          </div>

          <div>
            <label className="text-xs text-white/60">Суть вопроса</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              required
              minLength={10}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              placeholder="Что произошло? Какие документы есть? Какие сроки?"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-center rounded-xl bg-[#4B8BFF] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#4B8BFF]/25 hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? "Отправляю…" : "Отправить"}
            </button>

            {status === "ok" && (
              <span className="text-sm text-white/70">
                Отправлено. Я свяжусь с вами по указанному контакту.
              </span>
            )}
            {status === "error" && (
              <span className="text-sm text-red-300">{errorText}</span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestAuditModal;
