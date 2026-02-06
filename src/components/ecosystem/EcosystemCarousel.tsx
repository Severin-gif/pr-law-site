import { useEffect, useMemo, useRef, useState } from "react";

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

export default function EcosystemCarousel() {
  const isMobile = useMediaQuery("(max-width: 820px)");
  const perView = isMobile ? 1 : 2;

  const pages = useMemo(() => Math.ceil(SLIDES.length / perView), [perView]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [page, setPage] = useState(0);

  const step = () => viewportRef.current?.clientWidth ?? 0;

  const goTo = (p: number) => {
    const max = pages - 1;
    const next = clamp(p, 0, max);

    setPage(next);
    const x = next * step();
    trackRef.current?.scrollTo({ left: x, behavior: "smooth" });
  };

  const updatePageFromScroll = () => {
    const s = step();
    const el = trackRef.current;
    if (!el || !s) return;
    const current = Math.round(el.scrollLeft / s);
    setPage(clamp(current, 0, pages - 1));
  };

  useEffect(() => {
    // при смене perView пере-выравниваемся
    goTo(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView]);

  return (
    <section className="py-14">
      <div className="mb-5">
        <h2 className="text-2xl md:text-3xl leading-tight font-semibold">
          Экосистема специалистов
        </h2>
        <p className="mt-2 max-w-3xl text-black/70">
          Для решения сложных задач без передачи дела и ответственности
        </p>
      </div>

      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
        {/* Prev */}
        <button
          type="button"
          aria-label="Назад"
          onClick={() => goTo(page - 1)}
          disabled={page <= 0}
          className="h-10 w-10 rounded-xl border border-black/15 bg-white/90 text-xl leading-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ‹
        </button>

        {/* Viewport */}
        <div ref={viewportRef} className="overflow-hidden rounded-2xl">
          {/* Track */}
          <div
            ref={trackRef}
            onScroll={updatePageFromScroll}
            className="flex gap-3 p-1.5 overflow-x-auto scroll-smooth [scrollbar-width:none]"
            style={{
              scrollSnapType: "x mandatory",
            }}
          >
            {SLIDES.map((s, idx) => (
              <article
                key={idx}
                className={[
                  "shrink-0 rounded-2xl border border-black/10 bg-white/90 p-5",
                  "min-h-[220px]",
                  isMobile ? "basis-full" : "basis-[calc(50%-6px)]",
                ].join(" ")}
                style={{ scrollSnapAlign: "start" }}
              >
                <div
                  aria-hidden="true"
                  className="h-10 w-10 rounded-xl border border-black/12 grid place-items-center mb-3 text-black/80"
                >
                  {s.icon}
                </div>

                <h3 className="text-[18px] leading-snug font-semibold">
                  {s.title}
                </h3>

                <p className="mt-2 text-black/80 leading-relaxed">
                  {s.text}
                </p>

                {s.meta ? (
                  <p className="mt-3 text-[13px] text-black/60">{s.meta}</p>
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
          disabled={page >= pages - 1}
          className="h-10 w-10 rounded-xl border border-black/15 bg-white/90 text-xl leading-none
                     disabled:opacity-40 disabled:cursor-not-allowed"
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
                  "h-2 w-2 rounded-full border border-black/30",
                  active ? "bg-black/80" : "bg-transparent",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      <div className="mt-5 max-w-4xl">
        <p className="text-black/85">
          Я остаюсь вашим представителем и координатором дела. Специалисты усиливают позицию клиента,
          но стратегия и ответственность всегда остаются за мной.
        </p>

        <a
          href="/ecosystem"
          className="inline-block mt-3 border-b border-black/25 hover:border-black/60 transition-colors"
        >
          Как выстраивается работа →
        </a>
      </div>
    </section>
  );
}
