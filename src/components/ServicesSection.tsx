import React from "react";

type Service = {
  title: string;
  lead: string;
  bullets: string[];
  outcome: string;
  primary?: boolean;
};

const SERVICES: Service[] = [
  {
    title: "Арбитраж / Банкротство",
    lead: "",
    bullets: [
      "судебное взыскание задолженности и убытков",
      "споры по договорам: поставка, подряд, услуги",
      "обеспечительные меры и давление через процесс",
      "субсидиарная ответственность и оспаривание сделок",
    ],
    outcome: "Собранная позиция и управляемый сценарий вместо “хаотичного участия”",
    primary: true,
  },
  {
    title: "Корпоративные конфликты",
    lead: "",
    bullets: [
      "споры между собственниками / участниками",
      "выходы, блокировки, перераспределение долей",
      "документы: собрания, сделки, полномочия, директоры",
      "обеспечительные меры, ограничения, фиксация условий",
    ],
    outcome:
      "Фиксация контроля и условий: договорённость или решение через суд.",
  },
  {
    title: "Защита активов и рисков",
    lead: "",
    bullets: [
      "структура владения и контуры ответственности",
      "коммерческая тайна и интеллектуальная собственность",
      "работа с рисками контрагентов заранее",
      "ограничения, залоги, поручительства: что включать",
    ],
    outcome: "Понимание рисков и план до того, как станет поздно.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="mt-20">
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0D10] shadow-[0_32px_80px_rgba(0,0,0,0.65)]">
        {/* Header */}
        <div className="px-8 pt-12 pb-8 md:px-14">
          <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-[1.02]">
            Юридическая защита бизнеса.
          </h2>

          <p className="mt-4 max-w-3xl text-base md:text-[17px] text-slate-300/90 leading-relaxed">
            Договоры, регламенты, сделки, представительство в суде — но фокус не на формальностях, а на последствиях,
            рисках и результате.
          </p>
        </div>

        {/* Cards */}
        <div className="px-8 pb-12 md:px-14">
          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className={[
                  "relative rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-sm",
                  "shadow-[0_18px_50px_rgba(0,0,0,0.50)]",
                  "p-7 md:p-8",
                  "flex h-full flex-col",
                  s.primary ? "ring-1 ring-inset ring-white/20" : "",
                ].join(" ")}
              >
                {/* soft highlight */}
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/6 blur-3xl" />

                {/* Top */}
                <div className="relative">
                  <h3 className="text-2xl md:text-[28px] font-serif text-white tracking-tight leading-tight">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm md:text-[14px] text-slate-300/70 leading-relaxed">
                    {s.lead}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="relative mt-6 space-y-3.5 text-[15px] leading-relaxed text-slate-200/90">
                  {s.bullets.map((b, idx) => (
                    <li key={idx} className="flex gap-3">
                      <span className="mt-[10px] h-[4px] w-[4px] rounded-full bg-slate-200/60 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom (pins to bottom for equal alignment) */}
                <div className="relative mt-7 pt-7 border-t border-white/10">
                  <div className="rounded-2xl bg-black/28 border border-white/10 px-5 py-5">
                    <div className="text-[10px] tracking-[0.26em] uppercase text-slate-300/55">
                      результат
                    </div>
                    <p className="mt-2 text-[15px] text-white/92 leading-relaxed">
                      {s.outcome}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-xs md:text-[13px] text-slate-400/70">
            Формат работы и условия — после анализа ситуации и документов.
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
