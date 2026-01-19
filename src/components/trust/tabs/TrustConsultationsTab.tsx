import { useCallback, useEffect, useMemo, useState } from "react";
import { publicUrl } from "../../../utils/publicUrl";

type ConsultationItem = {
  id: string;
  title: string;
  topic: string;
  desc: string;
  bullets: string[];
  previewImage: string; // одно изображение
  pdf?: string; // опционально
};

const CONSULTATIONS: ConsultationItem[] = [
  {
    id: "consultation-01",
    title: "Письменная консультация: оценка судебных перспектив",
    topic: "Суд / позиция",
    desc:
      "Подходит, если спор уже возник и нужно понять перспективы, риски и варианты действий до подачи иска.",
    bullets: [
      "краткие факты и вопрос",
      "позиция и слабые места",
      "риски и сценарии",
      "что делать / чего не делать",
    ],
    previewImage: publicUrl("compr1.jpg"),
    pdf: publicUrl("arbitr-pra.pdf"),
  },
  {
    id: "consultation-02",
    title: "Консультация: конфликт по договору подряда/субподряда",
    topic: "Подряд / субподряд",
    desc:
      "Когда есть спор по объёму/качеству/срокам работ, удержания, акты, переписка и риск претензии/иска.",
    bullets: [
      "какие документы критичны (акты, письма, переписка)",
      "какие формулировки вредят позиции",
      "сценарии: претензия / переговоры / суд",
      "план действий на 7–14 дней",
    ],
    previewImage: publicUrl("compr2.jpeg"),
  },
  {
    id: "consultation-03",
    title: "Консультация: неоплата выполненных работ",
    topic: "Взыскание / оплата",
    desc:
      "Когда работы выполнены, но оплаты нет (или частичная). Цель — подготовить позицию и действия без лишних ошибок.",
    bullets: [
      "как фиксировать объём и сдачу работ",
      "как считать сумму требований",
      "как правильно начать переписку/претензию",
      "когда имеет смысл суд",
    ],
    previewImage: publicUrl("compr3.jpg"),
  },
];

export default function TrustConsultationsTab() {
  const [active, setActive] = useState<ConsultationItem | null>(null);
  const list = useMemo(() => CONSULTATIONS, []);

  return (
    <div className="max-w-4xl space-y-6 text-sm sm:text-base">
      {/* intro */}
      <div className="space-y-2 text-white/70">
        <div className="text-white/80">
          Полноценные письменные консультации и документы, основанные на судебной практике и проверенные
          в реальной работе.
        </div>
        <div className="text-white/55">
          Ниже — образцы формата. Внутри: выводы и шаги, без теории.
        </div>
      </div>

      {/* list */}
      <div className="space-y-3">
        {list.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className="w-full text-left rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white/80 hover:bg-white/[0.05] transition"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs text-white/55">{item.topic}</div>
                <div className="mt-1 text-base font-semibold text-white">
                  {item.title}
                </div>
                <div className="mt-2 text-sm text-white/65 line-clamp-2">
                  {item.desc}
                </div>
              </div>

              <div className="shrink-0 text-xs text-white/50">Открыть →</div>
            </div>
          </button>
        ))}
      </div>

      <ConsultationModal open={!!active} item={active} onClose={() => setActive(null)} />
    </div>
  );
}

function ConsultationModal({
  open,
  item,
  onClose,
}: {
  open: boolean;
  item: ConsultationItem | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(false);

  const handleClose = useCallback(() => {
    setZoom(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (zoom) setZoom(false);
        else handleClose();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, zoom, handleClose]);

  // блокируем прокрутку body когда открыта модалка (стабильность на проде)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onMouseDown={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/70" />

      {/* MODAL */}
      <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-[#0B0D10] text-white shadow-2xl max-h-[78vh] overflow-hidden">
        {/* header */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-xs text-white/55">{item.topic}</div>
              <div className="mt-1 text-lg font-semibold">{item.title}</div>
              <div className="mt-2 text-sm text-white/70">{item.desc}</div>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="shrink-0 rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white/80 hover:bg-white/5"
            >
              Закрыть
            </button>
          </div>
        </div>

        {/* body (scroll container) */}
        <div className="px-6 pb-6">
          <div className="grid gap-6 lg:grid-cols-12 min-h-0">
            {/* left */}
            <div className="lg:col-span-4 min-h-0">
              <div className="max-h-[58vh] lg:max-h-[60vh] overflow-auto pr-1">
                <div className="text-sm font-semibold text-white/90">Что внутри</div>

                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 rounded-full bg-white/40" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-3">
                  {item.pdf && (
                    <a
                      href={item.pdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-[#4B8BFF] px-5 py-3 text-sm font-medium text-white hover:brightness-110 transition"
                    >
                      Открыть PDF
                    </a>
                  )}

                  <div className="text-xs text-white/45 leading-relaxed">
                    Образец демонстрирует формат. Не является консультацией по вашей ситуации
                    и не заменяет анализ документов.
                  </div>
                </div>
              </div>
            </div>

            {/* right */}
            <div className="lg:col-span-8 min-h-0">
              <div className="flex items-center justify-between">
                <div className="text-xs text-white/55">Превью (нажмите, чтобы увеличить)</div>

                <button
                  type="button"
                  onClick={() => setZoom(true)}
                  className="text-xs text-white/60 hover:text-white transition"
                >
                  Увеличить →
                </button>
              </div>

              <button
                type="button"
                onClick={() => setZoom(true)}
                className="mt-3 w-full overflow-hidden rounded-xl border border-white/10 bg-black/20"
                aria-label="Открыть увеличенное превью"
              >
                {/* фиксируем фрейм: стабильно на 100% масштабе */}
                <div className="relative w-full aspect-[4/3] max-h-[60vh]">
                  <img
                    src={item.previewImage}
                    alt={`${item.title} — превью`}
                    className="absolute inset-0 h-full w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ZOOM */}
      {zoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          onMouseDown={(e) => e.target === e.currentTarget && setZoom(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-black/85" />

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
                src={item.previewImage}
                alt={`${item.title} — увеличено`}
                className="w-full max-h-[85vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
