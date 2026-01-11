import React, { useState } from "react";
import TrustConsultationsTab from "./tabs/TrustConsultationsTab";
import TrustDiplomasTab from "./tabs/TrustDiplomasTab";
import TrustLettersTab from "./tabs/TrustLettersTab";
import TrustCourtPracticeTab from "./tabs/TrustCourtPracticeTab";

type TabKey = "consult" | "docs" | "letters" | "practice";

export default function TrustSection() {
  const [tab, setTab] = useState<TabKey>("consult");

  return (
    <section id="trust" className="py-2">
      <div className="rounded-[28px] border border-white/10 bg-white/[0.02] p-8 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-[28px] text-white sm:text-[34px]">
              Почему мне доверяют
            </h2>
            <p className="mt-2 text-sm text-white/60 sm:text-base">
              Без обещаний. Только то, что можно проверить.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-black/30 p-1">
            <TabButton active={tab === "consult"} onClick={() => setTab("consult")}>
              Консультации
            </TabButton>

            <TabButton active={tab === "docs"} onClick={() => setTab("docs")}>
              Дипломы
            </TabButton>

            <TabButton active={tab === "letters"} onClick={() => setTab("letters")}>
              Письма
            </TabButton>

            <TabButton active={tab === "practice"} onClick={() => setTab("practice")}>
              Судебная практика
            </TabButton>
          </div>
        </div>

        <div className="mt-8">
          {tab === "consult" && <TrustConsultationsTab />}
          {tab === "docs" && <TrustDiplomasTab />}
          {tab === "letters" && <TrustLettersTab />}
          {tab === "practice" && <TrustCourtPracticeTab />}
        </div>
      </div>
    </section>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-xl px-4 py-2 text-sm transition",
        active ? "bg-white/[0.08] text-white" : "text-white/70 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
