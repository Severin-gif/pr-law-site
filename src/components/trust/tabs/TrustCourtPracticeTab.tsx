import React, { useEffect, useState } from "react";
import { publicUrl } from "../../../utils/publicUrl";

export default function TrustCourtPracticeTab() {
  const [open, setOpen] = useState(false);

  // Закрытие по Esc
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <div className="max-w-[860px]">
        <h3 className="text-white text-[16px] font-semibold tracking-wide">
          Судебная практика
        </h3>

        <div className="mt-3 space-y-3 text-[14px] leading-[1.8] text-white/80">
          <p>
            <span className="text-white font-medium">
              Подтверждённый опыт судебной работы
            </span>{" "}
            — более 15 лет.
          </p>

          <p>
            Коммерческие споры, подряды, взыскания, госконтракты,
            ответственность государства.
            <br />
            Работаю с делами, где цена ошибки — деньги, сроки и репутация.
          </p>

          <p className="pt-1">
            Ниже — примеры судебных решений.
            <br />
            Показаны титульные и финальные листы. Подробности — по запросу.
          </p>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="pt-1 text-left text-white/90 hover:text-white underline underline-offset-4 decoration-white/25 hover:decoration-white/45 transition"
          >
            Открыть судебное портфолио →
          </button>
        </div>
      </div>

      {open && (
        <Modal title="Судебное портфолио" onClose={() => setOpen(false)}>
          <div className="h-[70vh] w-[86vw] max-w-[1100px]">
            <iframe
              src={publicUrl("arbitr-pra.pdf")}
              title="Судебное портфолио"
              className="h-full w-full rounded-xl border border-white/10 bg-black"
            />
          </div>

          <div className="mt-3 max-w-[1100px] text-[12px] leading-[1.5] text-white/55">
            В презентации приведены первый и последний листы судебных актов.
            Полные тексты — по запросу.
          </div>
        </Modal>
      )}
    </>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/65 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="w-full max-w-[1200px] rounded-2xl border border-white/10 bg-[#0C0D0F] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <div className="text-white/90 text-[14px] font-medium">{title}</div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-white/70 hover:text-white hover:bg-white/5 transition"
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );
}
