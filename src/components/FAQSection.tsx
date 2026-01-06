import React, { useState } from "react";

type QA = {
  q: string;
  a: string;
};

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
    a: "Сроки зависят от задачи и количества документов. Срочные ситуации беру в приоритет, но подтверждаю срок сразу — без обещаний “сделаю завтра”, если это нереалистично.",
  },
  {
    q: "Вы работаете лично?",
    a: "Да. Я веду работу сам, без передачи дела “внутрь команды”.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden rounded-[28px] border border-white/10"
      style={{
        backgroundImage: "url(/biblio.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
      <div className="absolute inset-0 bg-black/30" />

      {/* content */}
      <div className="relative z-10 p-8 sm:p-10 lg:p-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-sm sm:p-10">
          <h2 className="font-serif text-[30px] leading-tight tracking-tight text-white sm:text-[36px]">
            Вопросы
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
            Коротко. По делу.
          </p>

          <div className="mt-8 space-y-3">
            {items.map((it, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={it.q}
                  className="rounded-2xl border border-white/10 bg-black/35"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-medium text-white sm:text-base">
                      {it.q}
                    </span>

                    <span
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-white/70 transition",
                        isOpen ? "bg-white/[0.08]" : "bg-transparent",
                      ].join(" ")}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={[
                      "grid transition-[grid-template-rows] duration-200 ease-out",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 text-sm leading-relaxed text-white/70 sm:text-base">
                        {it.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* subtle footer note */}
          <p className="mt-6 text-xs text-white/45">
            Если вопрос нестандартный — опиши ситуацию в двух абзацах, этого достаточно для первичного ответа.
          </p>
        </div>
      </div>
    </section>
  );
}
