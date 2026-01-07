import React from "react";

export default function TrustConsultationsTab() {
  return (
    <div className="max-w-3xl space-y-3 text-sm text-white/70 sm:text-base">
      <div className="text-white/80">
        Формат: разбор → риски → варианты действий → план.
      </div>
      <ul className="list-disc pl-5 text-white/65">
        <li>первичный анализ документов и позиции</li>
        <li>оценка рисков и сценариев</li>
        <li>что делать сейчас, что не делать</li>
      </ul>
      <p className="text-white/55">
        Стоимость и сроки подтверждаю до начала работы.
      </p>
    </div>
  );
}
