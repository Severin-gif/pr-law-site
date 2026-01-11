import React, { useState } from "react";

type LetterItem = {
  id: string;
  title: string;
  note: string;
  preview: string;
};

const LETTERS: LetterItem[] = [
  {
    id: "letter-01",
    title: "Претензия по договору подряда",
    note: "срыв сроков, удержание оплаты",
    preview: "/letters/letter-01.jpg",
  },
  {
    id: "letter-02",
    title: "Досудебная позиция по взысканию",
    note: "подготовка к иску",
    preview: "/letters/letter-02.jpg",
  },
  {
    id: "letter-03",
    title: "Ответ на претензию контрагента",
    note: "нейтрализация рисков",
    preview: "/letters/letter-03.jpg",
  },
];

export default function TrustLettersCarousel() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + LETTERS.length) % LETTERS.length);
  const next = () => setIndex((i) => (i + 1) % LETTERS.length);

  const item = LETTERS[index];

  return (
    <div className="mt-20 max-w-5xl">
      <h3 className="text-white text-[16px] font-semibold">
        Письма и правовые позиции
      </h3>

      <p className="mt-2 max-w-[640px] text-sm text-white/60">
        Примеры письменной работы. Формат, логика и структура — без раскрытия
        конфиденциальных данных.
      </p>

      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-white">
              {item.title}
            </div>
            <div className="mt-1 text-xs text-white/55">
              {item.note}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={prev}
              className="rounded-lg border border-white/10 px-3 py-1 text-white/70 hover:bg-white/5"
            >
              ←
            </button>
            <button
              onClick={next}
              className="rounded-lg border border-white/10 px-3 py-1 text-white/70 hover:bg-white/5"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
          <img
            src={item.preview}
            alt={item.title}
            className="w-full object-contain"
            loading="lazy"
          />
        </div>

        <div className="mt-3 text-xs text-white/45">
          Образец демонстрирует формат и стиль письменной работы.
        </div>
      </div>
    </div>
  );
}
