import React, { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  icon: string;
  title: string;
  text: string;
  meta?: string;
};

const SLIDES: Slide[] = [
  {
    icon: "▦",
    title: "Бухгалтерия и налоговый контроль",
    text:
      "Привлекаются при налоговых спорах, проверках, доначислениях, а также при подготовке позиции до суда. " +
      "Используются для подтверждения расчётов и выявления рисков.",
    meta: "Опыт: от 10 лет · участие в судебных делах",
  },
  {
    icon: "⟁",
    title: "Арбитражные управляющие",
    text:
      "Подключаются в делах о банкротстве, при анализе процедур, оспаривании сделок, субсидиарной ответственности. " +
      "Работа ведётся в рамках единой стратегии.",
    meta: "Практика: банкротство · корпоративные кейсы",
  },
  {
    icon: "◧",
    title: "Оценка и судебная экспертиза",
    text:
      "Используются при спорах об имуществе, долях, ущербе, а также для подготовки и сопровождения судебных экспертиз. " +
      "Заключения подбираются под предмет спора.",
    meta: "Оценка · экспертизы · судебные процессы",
  },
  {
    icon: "≋",
    title: "Финансовый анализ и аудит",
    text:
      "Применяется для анализа финансового состояния, доказывания неплатёжеспособности, вывода активов, " +
      "а также при корпоративных и банкротных спорах.",
    meta: "Финансовые модели · доказательная база",
  },
  {
    icon: "◎",
    title: "Профильные специалисты под задачу",
    text:
      "В отдельных делах привлекаются узкоспециализированные эксперты. " +
      "Состав команды формируется под конкретный кейс — без расширения «штата».",
    meta: "Точечное привлечение · по необходимости",
  },
];

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, [query]);

  return matches;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function EcosystemSection() {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const perView = isMobile ? 1 : 2;

  const pages = useMemo(() => Math.ceil(SLIDES.length / perView), [perView]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(0);

  const getStep = () => viewportRef.current?.clientWidth ?? 0;

  const goTo = (p: number) => {
    const next = clamp(p, 0, pages - 1);
    setPage(next);
    const x = next * getStep();
    trackRef.current?.scrollTo({ left: x, behavior: "smooth" });
  };

  // синхронизация точки при ручном скролле
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const step = getStep();
        if (!step) return;
        const p = Math.round(el.scrollLeft / step);
        setPage(clamp(p, 0, pages - 1));
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pages]);

  // при смене perView (desktop/mobile) — выравниваем на текущую страницу
  useEffect(() => {
    goTo(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView]);

  const prevDisabled = page <= 0;
  const nextDisabled = page >= pages - 1;

  return (
    <section id="ecosystem" className="py-14">
      {/* Head */}
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl leading-tight font-semibold text-white">
          Экосистема специалистов
        </h2>
        <p className="mt-2 max-w-3xl text-white/70">
          Для решения сложных задач без передачи дела и ответственности
        </p>
      </div>

      {/* Carousel */}
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Prev */}
        <button
          type="button"
          aria-label="Назад"
          onClick={() => goTo(page - 1)}
          disabled={prevDisabled}
          className={[
            "h-10 w-10 rounded-xl border border-white/15 bg-white/90",
            "text-xl leading-none text-black",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          ‹
        </button>

        {/* Viewport */}
        <div ref={viewportRef} className="overflow-hidden rounded-2xl">
          {/* Track */}
          <div
            ref={trackRef}
            className={[
              "flex gap-3 p-1.5 overflow-x-auto scroll-smooth",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden", // firefox + webkit
            ].join(" ")}
            style={{ scrollSnapType: "x mandatory" }}
            aria-label="Карусель: экосистема специалистов"
          >
            {SLIDES.map((s, idx) => (
             <article
  key={idx}
  className={[
    "shrink-0 rounded-xl border border-black/10 bg-white",
    "px-6 py-5 md:px-7 md:py-6",
    "text-black shadow-[0_10px_30px_rgba(0,0,0,0.18)]",
    isMobile ? "basis-full" : "basis-[calc(50%-6px)]",
  ].join(" ")}
  style={{ scrollSnapAlign: "start" }}
>
  <div className="flex items-center gap-3 mb-4">
    <div
      aria-hidden="true"
      className="h-9 w-9 rounded-lg border border-black/12 grid place-items-center text-black/70"
    >
      {s.icon}
    </div>

    <h3 className="text-[18px] md:text-[19px] leading-snug font-semibold text-black">
      {s.title}
    </h3>
  </div>

  <p className="text-[15px] md:text-[16px] leading-relaxed text-black/80 max-w-[62ch]">
    {s.text}
  </p>

  {s.meta ? (
    <p className="mt-4 text-[13px] text-black/55">
      {s.meta}
    </p>
  ) : null}
</article>

            ))}
          </div>
        </div>

        {/* Next */}
        <button
          type="button"
          aria-label="Вперёд"
          onClick={() => goTo(page + 1)}
          disabled={nextDisabled}
          className={[
            "h-10 w-10 rounded-xl border border-white/15 bg-white/90",
            "text-xl leading-none text-black",
            "disabled:opacity-40 disabled:cursor-not-allowed",
          ].join(" ")}
        >
          ›
        </button>

        {/* Dots */}
        <div className="col-span-3 flex justify-center gap-2 mt-3">
          {Array.from({ length: pages }).map((_, i) => {
            const active = i === page;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Страница ${i + 1}`}
                aria-selected={active}
                onClick={() => goTo(i)}
                className={[
                  "h-2 w-2 rounded-full border",
                  active
                    ? "bg-white/80 border-white/60"
                    : "bg-transparent border-white/30 hover:border-white/60",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      {/* Note */}
      <div className="mt-5 max-w-4xl">
        <p className="text-white/80">
          Я остаюсь вашим представителем и координатором дела. Специалисты усиливают позицию клиента, но стратегия и
          ответственность всегда остаются за мной.
        </p>

        <a
          href="/ecosystem"
          className="inline-block mt-3 border-b border-white/30 hover:border-white/70 text-white/80 hover:text-white transition-colors"
        >
          Как выстраивается работа →
        </a>
      </div>
    </section>
  );
}
