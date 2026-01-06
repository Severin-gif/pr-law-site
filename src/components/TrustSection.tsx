import React, { useMemo, useState } from "react";

type TabKey = "cases" | "credentials" | "letters";

type TrustItem = {
  title: string;
  text?: string;
};

export default function TrustSection() {
  const tabs = useMemo(
    () => [
      { key: "cases" as const, label: "Консультации" },
      { key: "credentials" as const, label: "Дипломы" },
      { key: "letters" as const, label: "Письма" },
    ],
    []
  );

  const [active, setActive] = useState<TabKey>("cases");

  const content: Record<TabKey, { subtitle: string; items: TrustItem[] }> = {
    cases: {
      subtitle: "Пример того, как выглядит разбор ситуации.",
      items: [
        {
          title: "Ситуация: контрагент не платит",
          text:
            "Коротко: фиксируем позицию, документы, риски по срокам и обеспечительным мерам. Дальше — сценарий взыскания или переговоров.",
        },
        {
          title: "Ситуация: конфликт собственников",
          text:
            "Коротко: собираем фактуру, проверяем полномочия, фиксацию решений и контроль активов. Цель — управляемая конструкция, а не хаос.",
        },
      ],
    },
    credentials: {
      subtitle: "Квалификация и документы (короткий перечень).",
      items: [
        { title: "Юридическое образование — (добавишь название ВУЗа и год)" },
        { title: "Повышение квалификации — (курс/программа, год)" },
        { title: "Сертификаты — (если нужно, добавишь)" },
      ],
    },
    letters: {
      subtitle: "Благодарственные письма и подтверждения от клиентов.",
      items: [
        { title: "Коммерческий спор — (год), (обезличено)" },
        { title: "Корпоративный конфликт — (год), (обезличено)" },
        { title: "Взыскание / банкротство — (год), (обезличено)" },
      ],
    },
  };

  const current = content[active];

  return (
    <section id="trust" className="py-2">
      {/* header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-serif text-[28px] leading-tight tracking-tight text-white sm:text-[34px]">
            Почему мне доверяют
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
            Без обещаний. Только то, что можно проверить.
          </p>
        </div>

        {/* tabs */}
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={[
                  "rounded-xl px-4 py-2 text-xs sm:text-sm transition",
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

    {/* content */}
<div className="mt-6 rounded-2xl bg-white/[0.02] p-5 sm:p-6">
  <p className="text-sm text-white/60">{current.subtitle}</p>

  <div className="mt-4 grid gap-3 sm:grid-cols-2">
    {current.items.map((it) => (
      <div
        key={it.title}
        className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4"
      >
        <div className="text-sm font-medium text-white">{it.title}</div>
        {it.text ? (
          <div className="mt-2 text-sm leading-relaxed text-white/65">
            {it.text}
          </div>
        ) : null}
      </div>
    ))}
  </div>
</div>

    </section>
  );
}
