import { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function RequestAuditModal({ open, onClose }: Props) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

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

        <form
          className="mt-6 space-y-4"
          action="https://formsubmit.co/lead@letter-law.ru"
          method="POST"
        >
          <input type="hidden" name="_next" value="https://letter-law.ru/success" />
          <input type="hidden" name="_url" value="https://letter-law.ru/" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_subject"
            value="Новая заявка с сайта letter-law.ru"
          />
          <input type="hidden" name="_template" value="table" />

          <div>
            <label className="text-xs text-white/60">Имя</label>
            <input
              type="text"
              name="name"
              required
              minLength={2}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              placeholder="Как к вам обращаться"
            />
          </div>

          <div>
            <label className="text-xs text-white/60">Email</label>
            <input
              type="email"
              name="email"
              required
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-xs text-white/60">
              Контакт (телефон / Telegram, опционально)
            </label>
            <input
              type="text"
              name="contact"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              placeholder="@telegram или +7…"
            />
          </div>

          <div>
            <label className="text-xs text-white/60">Суть вопроса</label>
            <textarea
              name="message"
              rows={5}
              required
              minLength={10}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20"
              placeholder="Что произошло? Какие документы есть? Какие сроки?"
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-white/70">
            <input
              type="checkbox"
              name="consent"
              className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-[#4B8BFF] focus:ring-[#4B8BFF]/40"
              required
            />
            <span>
              Согласен на обработку персональных данных{" "}
              <Link
                to="/privacy"
                className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
              >
                Политика
              </Link>
            </span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-[#4B8BFF] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#4B8BFF]/25 hover:brightness-110"
            >
              Отправить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestAuditModal;
