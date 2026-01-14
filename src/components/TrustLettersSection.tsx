import { useEffect, useMemo, useState } from "react";
import { publicUrl } from "../utils/publicUrl";

type LetterItem = {
  id: string;
  title: string;      // что это
  from: string;       // от кого (обезличенно можно)
  note: string;       // 1–2 строки смысла
  image: string;      // фото/скан письма
};

const LETTERS: LetterItem[] = [
  {
    id: "l-01",
    title: "Благодарственное письмо",
    from: "контрагент / руководитель проекта",
    note: "Подтверждение качества письменной позиции и скорости реакции в спорной ситуации.",
    image: publicUrl("letters/letter-01.jpg"),
  },
  {
    id: "l-02",
    title: "Рекомендательное письмо",
    from: "собственник бизнеса",
    note: "Подтверждение надёжности, самостоятельности и результата в переговорах.",
    image: publicUrl("letters/letter-02.jpg"),
  },
  {
    id: "l-03",
    title: "Отзыв по сопровождению спора",
    from: "директор / юрист компании",
    note: "Подтверждение подхода: факты → риски → решения → план действий.",
    image: publicUrl("letters/letter-03.jpg"),
  },
];

export default function TrustLettersSection() {
  const items = useMemo(() => LETTERS, []);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);

  const item = items[index];

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  // Esc: закрыть zoom
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setZoom(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zoom]);

  return (
    <section id="letters" className="py-2">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
        <div className="max-w-[760px]">
          <h3 className="text-white text-[16px] font-semibold tracking-wide">
            Благодарственные и рекомендательные письма
          </h3>
          <p className="mt-2 text-sm text-white/60">
            Примеры подтверждений от клиентов и партнёров. Публикуются без лишних деталей.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-sm font-medium text-white">{item.title}</div>
              <div className="mt-1 text-xs text-white/55">{item.from}</div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={prev}
                className="rounded-lg border border-white/10 px-3 py-1 text-white/70 hover:bg-white/5"
                aria-label="Предыдущее письмо"
              >
                ←
              </button>
              <button
                type="button"
                onClick={next}
                className="rounded-lg border border-white/10 px-3 py-1 text-white/70 hover:bg-white/5"
                aria-label="Следующее письмо"
              >
                →
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-5 lg:grid-cols-12">
            {/* image */}
            <div className="lg:col-span-7">
              <button
                type="button"
                onClick={() => setZoom(true)}
                className="group w-full overflow-hidden rounded-xl border border-white/10 bg-black/20"
                aria-label="Увеличить изображение письма"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-contain"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute bottom-3 right-3 rounded-lg border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/80">
                      Увеличить →
                    </div>
                  </div>
                </div>
              </button>
            </div>

            {/* text */}
            <div className="lg:col-span-5">
              <div className="text-sm text-white/80 leading-relaxed">
                {item.note}
              </div>

              <div className="mt-4 text-xs text-white/45 leading-relaxed">
                Письма размещены как подтверждение формата работы. При необходимости —
                предоставлю детали по запросу.
              </div>

              <div className="mt-5 flex gap-2">
                {items.map((it, i) => (
                  <button
                    key={it.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={[
                      "h-1.5 w-8 rounded-full transition",
                      i === index ? "bg-white/40" : "bg-white/10 hover:bg-white/20",
                    ].join(" ")}
                    aria-label={`Перейти к письму ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* zoom lightbox */}
      {zoom && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 p-4"
          onMouseDown={(e) => e.target === e.currentTarget && setZoom(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Просмотр письма"
        >
          <div className="relative w-full max-w-6xl">
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={() => setZoom(false)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5"
              >
                Закрыть
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
              <img
                src={item.image}
                alt={item.title}
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
