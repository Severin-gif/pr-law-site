import { useEffect, useMemo } from "react";

export type DocSlide = {
  src: string;   // e.g. "/docs/diploma-law.png"
  title: string; // e.g. "Высшее юридическое образование"
  note?: string; // optional small caption
};

type Props = {
  open: boolean;
  slides: DocSlide[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
};

export default function DocumentsModal({
  open,
  slides,
  index,
  onClose,
  onPrev,
  onNext,
  onGoTo,
}: Props) {
  const current = useMemo(() => slides[index], [slides, index]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onPrev, onNext]);

  useEffect(() => {
    if (!open) return;
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  if (!current) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
        <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0B0D10]">
          {/* top bar */}
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-white">
                {current.title}
              </div>
              <div className="mt-0.5 text-xs text-white/55">
                {index + 1} / {slides.length}
                {current.note ? <span className="ml-2">• {current.note}</span> : null}
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg bg-white/[0.06] px-3 py-2 text-xs text-white/80 hover:bg-white/[0.10]"
              type="button"
            >
              Закрыть
            </button>
          </div>

          {/* body */}
          <div className="relative">
            {/* image area */}
            <div className="relative flex items-center justify-center bg-black">
              <img
                src={current.src}
                alt={current.title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
                draggable={false}
              />

              {/* arrows */}
              <button
                type="button"
                onClick={onPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/45 px-3 py-2 text-white/90 hover:bg-black/60"
                aria-label="Предыдущий документ"
              >
                ←
              </button>
              <button
                type="button"
                onClick={onNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-xl bg-black/45 px-3 py-2 text-white/90 hover:bg-black/60"
                aria-label="Следующий документ"
              >
                →
              </button>
            </div>

            {/* thumbs */}
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 sm:px-6">
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={s.src}
                    type="button"
                    onClick={() => onGoTo(i)}
                    className={[
                      "flex-shrink-0 overflow-hidden rounded-xl border transition",
                      active ? "border-white/35" : "border-white/10 hover:border-white/20",
                    ].join(" ")}
                    aria-label={`Открыть: ${s.title}`}
                  >
                    <img
                      src={s.src}
                      alt={s.title}
                      className="h-14 w-20 object-cover"
                      draggable={false}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* hint */}
          <div className="border-t border-white/10 px-4 py-3 text-xs text-white/45 sm:px-6">
            Навигация: ← → • Закрыть: Esc
          </div>
        </div>
      </div>
    </div>
  );
}
