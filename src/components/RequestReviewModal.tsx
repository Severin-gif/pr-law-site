import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
};

const RequestReviewModal: React.FC<Props> = ({ open, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const titleId = useMemo(
    () => `request-review-title-${Math.random().toString(16).slice(2)}`,
    []
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setSubmitted(false);
  }, [open]);

  if (!open) return null;

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    // Пока без бэкенда: фиксируем факт отправки.
    // Позже подключим API/Telegram/почту.
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
        aria-label="Закрыть"
      />

      {/* Dialog */}
      <div className="relative z-[61] flex min-h-screen items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D10]/90 shadow-[0_30px_120px_rgba(0,0,0,0.7)]">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <h2
                id={titleId}
                className="font-serif text-xl tracking-tight text-[#EDE6D8] sm:text-2xl"
              >
                Запросить разбор
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Коротко опишите ситуацию — отвечу после анализа материалов.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Закрыть окно"
              title="Закрыть"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {submitted ? (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="text-base font-medium text-white">
                  Принято.
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Если нужно уточнение — напишите удобный контакт (Telegram или e-mail).
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-xl bg-[#8B1E2D] px-5 py-3 text-sm font-medium text-white shadow-[0_18px_52px_rgba(139,30,45,0.35)] transition hover:bg-[#A32537]"
                  >
                    Закрыть
                  </button>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-xl border border-white/12 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
                  >
                    Перейти к контактам
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="block">
                    <div className="mb-2 text-xs font-medium tracking-wide text-white/70">
                      Имя
                    </div>
                    <input
                      name="name"
                      autoComplete="name"
                      placeholder="Как к вам обращаться"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/7"
                    />
                  </label>

                  <label className="block">
                    <div className="mb-2 text-xs font-medium tracking-wide text-white/70">
                      Контакт
                    </div>
                    <input
                      name="contact"
                      autoComplete="email"
                      placeholder="Telegram или e-mail"
                      className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/7"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <div className="mb-2 text-xs font-medium tracking-wide text-white/70">
                    Кратко о вопросе
                  </div>
                  <textarea
                    name="message"
                    placeholder="Тип спора, сумма, стадия (досудебная / суд), что хотите получить на выходе…"
                    className="min-h-[120px] w-full resize-y rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-white/20 focus:bg-white/7"
                    required
                  />
                </label>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#8B1E2D] px-6 py-3.5 text-sm font-medium text-white shadow-[0_18px_52px_rgba(139,30,45,0.35)] transition hover:bg-[#A32537]"
                >
                  Отправить заявку
                </button>

                <p className="text-xs leading-relaxed text-white/60">
                  Нажимая «Отправить заявку», вы соглашаетесь с{" "}
                  <Link
                    to="/privacy"
                    onClick={onClose}
                    className="text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
                  >
                    политикой обработки персональных данных
                  </Link>
                  . Отправка формы не создаёт договорных отношений.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestReviewModal;
