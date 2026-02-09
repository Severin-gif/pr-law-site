import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  icon: string;
  title: string;
  text: string;
  meta?: string;
};

const SLIDES: Slide[] = [
  {
    icon: "",
    title: "Бухгалтер / налоговый консультант",
    text:
      "Подключаю при налоговых спорах и проверках. Помогают собрать расчёты и цифры для позиции в суде.",
    meta: "Опыт: от 10 лет",
  },
  {
    icon: "",
    title: "Арбитражный управляющий",
    text:
      "Работаем в банкротстве: анализ процедур, оспаривание сделок, субсидиарная ответственность.",
    meta: "Банкротство · корпоративные споры",
  },
  {
    icon: "",
    title: "Оценщик / эксперт",
    text:
      "Подключаются, когда спор про имущество, доли или ущерб. Готовим и сопровождаем экспертизы.",
    meta: "Оценка · экспертиза · суд",
  },
  {
    icon: "≋",
    title: "Финансовый аналитик",
    text:
      "Анализируем активы и движение средств. Формируем финансовую часть доказательной базы.",
    meta: "Анализ · доказательства",
  },
  {
    icon: "",
    title: "Адвокат",
    text:
      "При необходимости привлекаю узкого эксперта под конкретный кейс. Без расширения команды.",
    meta: "Точечно · по необходимости",
  },
];

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export default function EcosystemCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const pages = useMemo(() => SLIDES.length, []);
  const [page, setPage] = useState(0);

  const step = () => viewportRef.current?.clientWidth ?? 0;

  const goTo = (p: number) => {
    const next = clamp(p, 0, pages - 1);
    setPage(next);
    trackRef.current?.scrollTo({
      left: next * step(),
      behavior: "smooth",
    });
  };

  // синхронизация точки при ручном скролле
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const s = step();
        if (!s) return;
        const p = Math.round(el.scrollLeft / s);
        setPage(clamp(p, 0, pages - 1));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pages]);

  return (
    <section id="ecosystem" className="py-16">
      {/* Заголовок */}
      <div className="mb-8">
        <h2 className="text-3xl leading-tight font-semibold text-white">
          Работаю в партнёрстве с профильными специалистами
        </h2>
        <p className="mt-3 max-w-3xl text-white/70">
          Бухгалтерия, оценка, экспертиза, банкротство — по задаче
        </p>
      </div>

      {/* Карусель */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        {/* Prev */}
        <button
          type="button"
          aria-label="Назад"
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          className="
            h-11 w-11 rounded-2xl
            border border-white/12 bg-white/[0.06] backdrop-blur
            text-white/85 hover:bg-white/[0.10]
            transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          ‹
        </button>

        {/* Viewport */}
        <div ref={viewportRef} className="overflow-hidden rounded-2xl">
          <div
            ref={trackRef}
            className="
              flex overflow-x-auto scroll-smooth
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
            style={{ scrollSnapType: "x mandatory" }}
          >
            {SLIDES.map((s, idx) => (
              <article
                key={idx}
                className="
                  shrink-0 basis-full
                  rounded-2xl
                  border border-white/10
                  bg-white/[0.04] backdrop-blur
                  px-7 py-6
                  shadow-[0_18px_60px_rgba(0,0,0,0.55)]
                "
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="flex items-center gap-4 mb-5">
                  <div
                    aria-hidden="true"
                    className="
                      h-10 w-10 rounded-xl
                      border border-white/12
                      bg-white/[0.06]
                      grid place-items-center
                      text-white/85
                    "
                  >
                    {s.icon}
                  </div>

                  <h3 className="text-[19px] leading-snug font-semibold text-white">
                    {s.title}
                  </h3>
                </div>

                <p className="text-[16px] leading-relaxed text-white/75 max-w-[65ch]">
                  {s.text}
                </p>

                {s.meta && (
                  <p className="mt-5 text-[13px] text-white/55">
                    {s.meta}
                  </p>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          aria-label="Вперёд"
          onClick={() => goTo(page + 1)}
          disabled={page === pages - 1}
          className="
            h-11 w-11 rounded-2xl
            border border-white/12 bg-white/[0.06] backdrop-blur
            text-white/85 hover:bg-white/[0.10]
            transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          ›
        </button>

        {/* Точки */}
        <div className="col-span-3 flex justify-center gap-2 mt-4">
          {SLIDES.map((_, i) => {
            const active = i === page;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Слайд ${i + 1}`}
                onClick={() => goTo(i)}
                className={
                  active
                    ? "h-2 w-2 rounded-full bg-white/80"
                    : "h-2 w-2 rounded-full border border-white/30 hover:border-white/60"
                }
              />
            );
          })}
        </div>
      </div>

      {/* Текст под каруселью */}
      <div className="mt-8 max-w-3xl">
        <p className="text-white/70">
          Партнёры подключаются точечно — чтобы усилить позицию клиента документами, расчётами и экспертизой.
        </p>

        <a
          href="/ecosystem"
          className="inline-block mt-4 border-b border-white/30 hover:border-white/70
                     text-white/80 hover:text-white transition-colors"
        >
          Как выстраивается работа →
        </a>
      </div>
    </section>
  );
}
