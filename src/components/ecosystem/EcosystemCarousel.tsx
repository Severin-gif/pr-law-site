import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  icon: string; // моно-символ (не цветной эмоджи)
  title: string;
  text: string;
  meta?: string;
};

const SLIDES: Slide[] = [
  {
    icon: "▦",
  title: "Бухгалтер / налоговый консультант",
  text:
    "Подключаю при налоговых спорах и проверках.\n" +
    "1) Проверяем учёт и первичку, закрываем слабые места.\n" +
    "2) Собираем расчёты, сверки и пояснения — чтобы позиция выдержала ФНС и суд.",
  meta: "НДС · вычеты · доначисления · доказательства",
  },
  {
    icon: "◩", // документ/блок
    title: "Арбитражный управляющий",
    text: "В банкротстве: анализ процедур, оспаривание сделок, субсидиарная ответственность. Всё в одной стратегии.",
    meta: "Банкротство · корпоративные споры",
  },
  {
    icon: "◧", // форма/лист
    title: "Оценщик / эксперт",
    text: "Когда спор про имущество, доли или ущерб. Готовим заключения и сопровождаем экспертизу.",
    meta: "Оценка · экспертиза · суд",
  },
  {
    icon: "≋", // данные/поток
    title: "Финансовый аналитик",
    text: "Анализ активов и движения средств. Усиливаем доказательства финансовой частью позиции.",
    meta: "Анализ · доказательства",
  },
  {
    icon: "◎", // точка/фокус
    title: "Узкий специалист под задачу",
    text: "При необходимости подключаю эксперта под конкретный кейс. Точечно, без расширения команды.",
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
    <section id="partners" className="py-16">
      {/* Заголовок */}
      <div className="mb-8">
        <h2 className="text-3xl leading-tight font-semibold text-white">
          Работаю в партнёрстве с профильными специалистами
        </h2>
        <p className="mt-3 max-w-3xl text-white/70">
          Бухгалтерия, оценка, экспертиза, банкротство — по задаче
        </p>
      </div>

      {/* Обёртка с “дорогой” подложкой */}
      <div className="relative">
        {/* мягкое свечение/градиент сзади */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -inset-6
            rounded-[28px]
            bg-[radial-gradient(60%_60%_at_50%_20%,rgba(255,255,255,0.10),rgba(255,255,255,0.00))]
            blur-2xl
          "
        />

        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 relative">
          {/* Prev */}
          <button
            type="button"
            aria-label="Назад"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="
              h-12 w-12 rounded-2xl
              border border-white/15 bg-white/[0.06] backdrop-blur
              text-white/85 hover:bg-white/[0.10]
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              transition
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            ‹
          </button>

          {/* Viewport */}
          <div ref={viewportRef} className="overflow-hidden rounded-[26px]">
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
                    rounded-[26px]
                    border border-white/12
                    bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))]
                    backdrop-blur
                    px-8 py-7
                    shadow-[0_22px_70px_rgba(0,0,0,0.55)]
                    relative
                  "
                  style={{ scrollSnapAlign: "start" }}
                >
                  {/* внутренний “свет” сверху карточки */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute inset-x-0 -top-10 h-24
                      bg-[radial-gradient(40%_60%_at_20%_50%,rgba(255,255,255,0.12),rgba(255,255,255,0.00))]
                      blur-xl
                    "
                  />

                  <div className="relative">
                    <div className="flex items-start gap-4 mb-5">
                      {/* моно-иконка в рамке */}
                      <div
                        aria-hidden="true"
                        className="
                          h-12 w-12 rounded-2xl
                          border border-white/15
                          bg-white/[0.06]
                          grid place-items-center
                          text-white/90
                          shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]
                        "
                      >
                        <span className="text-[18px] leading-none">{s.icon}</span>
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-[20px] md:text-[22px] leading-snug font-semibold text-white">
                          {s.title}
                        </h3>
                        {s.meta ? (
                          <p className="mt-2 text-[13px] text-white/55">
                            {s.meta}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <p className="text-[16px] md:text-[17px] leading-relaxed text-white/75 max-w-[70ch]">
                      {s.text}
                    </p>
                  </div>
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
              h-12 w-12 rounded-2xl
              border border-white/15 bg-white/[0.06] backdrop-blur
              text-white/85 hover:bg-white/[0.10]
              shadow-[0_10px_30px_rgba(0,0,0,0.35)]
              transition
              disabled:opacity-40 disabled:cursor-not-allowed
            "
          >
            ›
          </button>

          {/* Точки */}
          <div className="col-span-3 flex justify-center gap-2 mt-5">
            {SLIDES.map((_, i) => {
              const active = i === page;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Слайд ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={[
                    "h-2 w-2 rounded-full transition",
                    active
                      ? "bg-white/80"
                      : "border border-white/30 hover:border-white/60",
                  ].join(" ")}
                />
              );
            })}
          </div>
        </div>
      </div>     
    </section>
  );
}
