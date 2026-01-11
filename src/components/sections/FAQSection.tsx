import { useState } from "react";

type QA = { q: string; a: string };

const items: QA[] = [
  {
    q: "Сколько стоит разбор?",
    a: "Стоимость зависит от объёма материалов и срочности. После короткого описания ситуации я подтверждаю формат и цену до начала работы.",
  },
  {
    q: "Как проходит работа?",
    a: "Вы присылаете вводные и документы. Я анализирую ситуацию, обозначаю риски и варианты действий. Дальше — либо точечная работа, либо сопровождение.",
  },
  {
    q: "Какие сроки?",
    a: "Сроки зависят от задачи и количества документов. Срочные ситуации беру в приоритет, но срок подтверждаю сразу.",
  },
  {
    q: "Вы работаете лично?",
    a: "Да. Я веду работу сам, без передачи дела младшим специалистам.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden rounded-[28px]"
      style={{
        backgroundImage: "url(/biblio.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* общий фон: мягко, но с читабельностью */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/70" />
      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 mx-auto max-w-5xl px-8 py-16 sm:px-12 sm:py-20">
        <h2 className="font-serif text-[32px] leading-tight text-[#F2EFEA] sm:text-[40px]">
          Вопросы
        </h2>
        <p className="mt-3 text-sm text-[#CFCAC2] sm:text-base">
          Коротко. По делу.
        </p>

        {/* локальная подложка под текстом — БЕЗ рамок */}
        <div className="mt-10 max-w-3xl rounded-2xl bg-black/35 px-6 py-8 backdrop-blur-[2px] sm:px-8 sm:py-10">
          <div className="space-y-6">
            {items.map((it, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div key={it.q}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-start justify-between gap-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] font-medium text-[#F2EFEA] sm:text-lg">
                      {it.q}
                    </span>

                    {/* минимальный индикатор без рамок */}
                    <span className="mt-1 text-[#CFCAC2]/70">
                      {isOpen ? "—" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#CFCAC2] sm:text-base">
                      {it.a}
                    </p>
                  )}

                  {/* тонкий разделитель */}
                  <div className="mt-6 h-px w-full bg-white/10" />
                </div>
              );
            })}
          </div>

          <p className="mt-10 max-w-xl text-xs text-[#CFCAC2]/70">
            Если вопрос нестандартный — опиши ситуацию в двух абзацах, этого достаточно для первичного ответа.
          </p>
        </div>
      </div>
    </section>
  );
}
