import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  icon: string; // моно-символ
  title: string;
  text: string; // можно с \n
  meta?: string;
};

const SLIDES: Slide[] = [
  {
    icon: "▦",
    title: "Бухгалтер / налоговый консультант",
    meta: "НДС · вычеты · доначисления · доказательства",
    text:
      "Подключаю при налоговых спорах и проверках.\n" +
      "1) Проверяем учёт и первичку, закрываем слабые места.\n" +
      "2) Собираем расчёты, сверки и пояснения — чтобы позиция выдержала ФНС и суд.",
  },
  {
    icon: "◩",
    title: "Арбитражный управляющий",
    meta: "Банкротство · корпоративные споры",
    text:
      "Подключаю в банкротстве.\n" +
      "1) Оцениваем процедуру и тактику (кредитор/должник).\n" +
      "2) Готовим базу под оспаривание сделок и субсидиарную ответственность.",
  },
  {
    icon: "◧",
    title: "Оценщик / эксперт",
    meta: "Оценка · экспертиза · суд",
    text:
      "Когда спор про имущество, доли или ущерб.\n" +
      "1) Подбираем формат заключения под предмет спора.\n" +
      "2) Сопровождаем экспертизу и вопросы эксперту в суде.",
  },
  {
    icon: "≋",
    title: "Финансовый аналитик",
    meta: "Анализ · активы · трассировка",
    text:
      "Когда важно доказать движение денег и активов.\n" +
      "1) Анализируем отчётность и операции.\n" +
      "2) Формируем финансовую часть доказательной базы для суда.",
  },
  {
    icon: "◎",
    title: "Узкий специалист под задачу",
    meta: "Точечно · по необходимости",
    text:
      "Если нужен эксперт по конкретной отрасли.\n" +
      "1) Подключаем специалиста под узкий вопрос.\n" +
      "2) Получаем вывод, который можно положить в материалы дела.",
  },
];

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export default function EcosystemCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const pages = useMemo(() => SLIDES.length, []);
  const [page, setPage] = useState(0);

  const step = () => viewportRef.current?.clientWidth ?? 0;

  const goTo = (p: number) => {
    const next = ((p % pages) + pages) % pages;
    setPage(next);
    trackRef.current?.scrollTo({
      left: next * step(),
      behavior: "smooth",
    });
  };

  // синхронизация индекса при ручном скролле
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

  // поддержка клавиатуры (влево/вправо)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(page - 1);
      if (e.key === "ArrowRight") goTo(page + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [page]);

  return (
    <section id="partners" className="py-16">
      {/* Head */}
      <div className="mb-8">
        <h2 className="text-3xl leading-tight font-semibold text-white">
          Работаю в партнёрстве с профильными специалистами
        </h2>
        <p className="mt-3 max-w-3xl text-white/70">
          Бухгалтерия, оценка, экспертиза, банкротство — по задаче
        </p>
      </div>

      {/* Background glow */}
      <div className="relative">
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute -inset-6
            rounded-[28px]
            bg-[radial-gradient(60%_60%_at_50%_20%,rgba(255,255,255,0.10),rgba(255,255,255,0.00))]
            blur-2xl
          "
        />

        {/* Viewport */}
        <div ref={viewportRef} className="overflow-hidden rounded-[26px] relative">
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
                  group
                  shrink-0 basis-full
                  rounded-[26px]
                  bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))]
                  backdrop-blur
                  shadow-[0_22px_70px_rgba(0,0,0,0.55)]
                  relative
                  px-16 pt-8 pb-16
                  min-h-[260px] md:min-h-[280px]
                "
                style={{ scrollSnapAlign: "start" }}
              >
                {/* top inner light */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-x-0 -top-10 h-24
                    bg-[radial-gradient(40%_60%_at_20%_50%,rgba(255,255,255,0.12),rgba(255,255,255,0.00))]
                    blur-xl
                  "
                />
                {/* subtle inset highlight (без обводки) */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0 rounded-[26px]
                    shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
                    pointer-events-none
                  "
                />

                {/* arrows INSIDE card */}
                <button
                  type="button"
                  aria-label="Назад"
                  onClick={() => goTo(page - 1)}
                  disabled={page === 0}
                  className="
                    absolute left-6 bottom-6
                    h-11 w-11 rounded-2xl
                    border border-white/12 bg-black/25 backdrop-blur
                    text-white/80 hover:bg-black/40
                    transition
                    opacity-0 pointer-events-none
                    group-hover:opacity-100 group-hover:pointer-events-auto
                    focus:opacity-100 focus:pointer-events-auto
                  "
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Вперёд"
                  onClick={() => goTo(page + 1)}
                  disabled={page === pages - 1}
                  className="
                    absolute right-6 bottom-6
                    h-11 w-11 rounded-2xl
                    border border-white/12 bg-black/25 backdrop-blur
                    text-white/80 hover:bg-black/40
                    transition
                    opacity-0 pointer-events-none
                    group-hover:opacity-100 group-hover:pointer-events-auto
                    focus:opacity-100 focus:pointer-events-auto
                  "
                >
                  ›
                </button>

                {/* content */}
                <div className="relative">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      aria-hidden="true"
                      className="
                        h-12 w-12 rounded-2xl
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
                      {s.meta ? <p className="mt-2 text-[13px] text-white/55">{s.meta}</p> : null}
                    </div>
                  </div>

                  {/* FULL WIDTH text */}
                  <p className="whitespace-pre-line text-[16px] md:text-[17px] leading-relaxed text-white/78">
                    {s.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* progress bar (вместо точек) */}
        <div className="mt-5 flex items-center justify-center">
          <div className="h-[2px] w-[220px] md:w-[280px] bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/70 rounded-full transition-all"
              style={{ width: `${((page + 1) / pages) * 100}%` }}
            />
          </div>
          <div className="ml-3 text-[12px] text-white/45 tabular-nums">
            {page + 1}/{pages}
          </div>
        </div>
      </div>
    </section>
  );
}
