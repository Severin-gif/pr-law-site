import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  tag: string;
  title: string;
  text: string;
};

const TrustSection: React.FC = () => {
  const slides: Slide[] = useMemo(
    () => [
      {
        tag: "СТРАТЕГИЯ",
        title: "Сначала позиция — потом движение",
        text: "Собираю фактуру, риски и развилки заранее. В суд выходим уже с планом, а не с надеждой.",
      },
      {
        tag: "ПРАКТИКА",
        title: "Текст выдерживает спор",
        text: "Договоры и процессуальные документы пишу так, чтобы их можно было защищать в конфликте и проверке.",
      },
      {
        tag: "КОНТРОЛЬ",
        title: "Я веду дело лично",
        text: "Ограниченное число дел. Без «потока», без передачи младшим специалистам, без распыления.",
      },
      {
        tag: "ЧЕСТНОСТЬ",
        title: "Если шансов нет — говорю сразу",
        text: "Не продаю иллюзии. Если задача нерешаема на текущих вводных — обозначаю это на старте.",
      },
    ],
    []
  );

  const total = slides.length;
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => {
    setIdx((v) => (v - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setIdx((v) => (v + 1) % total);
  }, [total]);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // swipe
  const drag = useRef<{ x: number; active: boolean }>({ x: 0, active: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, active: true };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;

    const dx = e.clientX - drag.current.x;
    drag.current.active = false;

    if (Math.abs(dx) < 60) return;

    if (dx > 0) prev();
    else next();
  };

  const s = slides[idx];

  return (
    <section
      id="trust"
      className="relative mt-16 overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0D10]"
    >
      {/* soft background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_360px_at_80%_0%,rgba(255,255,255,0.06),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.35))]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-[11px] tracking-[0.22em] text-white/45">
              ДОВЕРИЕ
            </div>
            <h2 className="mt-3 font-serif text-4xl tracking-tight text-white md:text-5xl">
              Почему мне доверяют
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-200/80">
              Не «про регалии». Про то, как выглядит работа и какой контроль вы
              получаете в процессе.
            </p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-xl border border-white/12 bg-white/[0.03] text-white/85 transition hover:bg-white/[0.06]"
              aria-label="Назад"
              type="button"
            >
              ←
            </button>
            <div className="min-w-[44px] text-center text-[12px] text-white/55">
              {idx + 1}/{total}
            </div>
            <button
              onClick={next}
              className="h-10 w-10 rounded-xl border border-white/12 bg-white/[0.03] text-white/85 transition hover:bg-white/[0.06]"
              aria-label="Вперед"
              type="button"
            >
              →
            </button>
          </div>
        </div>

        {/* Slide */}
        <div
          className="mt-8 select-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[11px] tracking-[0.22em] text-white/70">
                {s.tag}
              </div>

              <div className="md:hidden text-[12px] text-white/55">
                {idx + 1}/{total}
              </div>
            </div>

            <h3 className="mt-5 font-serif text-2xl tracking-tight text-white md:text-3xl">
              {s.title}
            </h3>

            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-200/85">
              {s.text}
            </p>

            <div className="mt-7 flex items-center gap-2 md:hidden">
              <button
                onClick={prev}
                className="h-10 w-10 rounded-xl border border-white/12 bg-white/[0.03] text-white/85 transition hover:bg-white/[0.06]"
                aria-label="Назад"
                type="button"
              >
                ←
              </button>
              <button
                onClick={next}
                className="h-10 w-10 rounded-xl border border-white/12 bg-white/[0.03] text-white/85 transition hover:bg-white/[0.06]"
                aria-label="Вперед"
                type="button"
              >
                →
              </button>
              <div className="ml-2 text-[12px] text-white/50">свайп / стрелки</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
