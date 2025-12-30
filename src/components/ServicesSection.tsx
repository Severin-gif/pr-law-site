import React from "react";

type Service = {
  title: string;
  bullets: string[];
  outcome: string;
  primary?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Арбитраж",
    bullets: [
      "формирование правовой позиции и логики спора",
      "иски, отзывы, доказательства, процессуальные документы",
      "заседания, ходатайства, обеспечительные меры",
      "переговоры и фиксация условий",
    ],
    outcome: "Контроль процесса и результата, а не участие ради участия.",
    primary: true,
  },
  {
    title: "Договоры и сделки",
    bullets: [
      "договоры, допсоглашения, протоколы разногласий",
      "правки контрагента без потери вашей позиции",
      "структура рисков: сроки, штрафы, гарантии",
    ],
    outcome: "Текст, который выдерживает проверку и конфликт.",
  },
  {
    title: "Защита активов",
    bullets: [
      "анализ контуров владения и обязательств",
      "обеспечения, поручительства, залоги, ограничения",
      "сценарии на случай конфликта заранее",
    ],
    outcome: "Понимание рисков и план действий до того, как станет поздно.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="mt-20">
      <div className="rounded-[32px] border border-white/10 bg-[#0B0D10] shadow-[0_32px_80px_rgba(0,0,0,0.65)] overflow-hidden">
        {/* HEADER */}
        <div className="px-10 pt-12 pb-10 md:px-14">
          <h2 className="text-4xl md:text-5xl font-serif text-white tracking-tight">
            Юридическая защита бизнеса
          </h2>

          <p className="mt-4 max-w-3xl text-base text-slate-300/90 leading-relaxed">
            Арбитраж. Договоры и сделки. Защита активов.
            <br />
            Работаю не с формальностями — а с последствиями и результатом.
          </p>
        </div>

        {/* SERVICES */}
        <div className="px-10 pb-12 md:px-14">
          <div className="grid gap-8 md:grid-cols-3">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className={[
                  "relative rounded-3xl p-8",
                  "bg-white/[0.03] border border-white/10",
                  "shadow-[0_20px_60px_rgba(0,0,0,0.45)]",
                  "transition",
                  s.primary
                    ? "ring-1 ring-inset ring-white/20 bg-white/[0.04]"
                    : "",
                ].join(" ")}
              >
                {/* soft light */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

                <h3 className="relative text-2xl font-serif text-white">
                  {s.title}
                </h3>

                <ul className="relative mt-6 space-y-3 text-sm leading-relaxed text-slate-200/85">
                  {s.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-[9px] h-[3px] w-[3px] rounded-full bg-slate-300/70 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-8 rounded-2xl bg-black/30 px-5 py-4 border border-white/10">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-slate-300/60">
                    результат
                  </div>
                  <p className="mt-2 text-sm text-white/90 leading-relaxed">
                    {s.outcome}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-xs text-slate-400/70">
            Формат работы и условия обсуждаются после анализа ситуации и документов.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
