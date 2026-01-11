import React from "react";

type ServiceCard = {
  title: string;
  bullets: string[];
  result: string;
};

const cards: ServiceCard[] = [
  {
    title: "Арбитраж / банкротство",
    bullets: [
      "долг / убытки / неисполнение",
      "давление со стороны контрагента",
      "аресты / блокировки / риски потери",
    ],
    result: "Управляемый сценарий вместо хаоса.",
  },
  {
    title: "Корпоративные конфликты",
    bullets: [
      "конфликт собственников / директора",
      "блокировки решений и денег",
      "выход участника / перераспределение долей",
    ],
    result: "Контроль и фиксация условий.",
  },
  {
    title: "Защита активов и рисков",
    bullets: [
      "активы под угрозой",
      "риск требований / проверок",
      "контрагенты и условия сделки",
    ],
    result: "План до того, как стало поздно.",
  },
];

const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="px-6 py-14 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
          <h2 className="font-serif text-[34px] leading-tight tracking-tight text-white sm:text-[40px]">
            Юридическая защита бизнеса.
          </h2>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            Договоры, споры, риски — фокус на последствиях и контроле.
          </p>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {cards.map((c) => (
              <article
                key={c.title}
                className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-md transition hover:border-white/15"
              >
                {/* subtle hover sheen */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />
                </div>

                <h3 className="relative min-h-[56px] font-serif text-xl leading-snug text-white">
                  {c.title}
                </h3>

                <ul className="relative mt-5 min-h-[132px] space-y-3 text-sm text-white/70">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[8px] h-[3px] w-[3px] shrink-0 rounded-full bg-white/35" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                {/* RESULT pinned to bottom */}
                <div className="relative mt-auto rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="text-[10px] tracking-[0.18em] text-white/45">
                    РЕЗУЛЬТАТ
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/85">
                    {c.result}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 text-xs text-white/40">
            Формат работы и условия — после анализа ситуации и документов.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
