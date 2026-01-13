import React, { useMemo, useState } from "react";
import DocumentsModal from "../../modals/DocumentsModal";
import type { DocSlide } from "../../modals/DocumentsModal";

export default function TrustDiplomasTab() {
  const slides = useMemo<DocSlide[]>(
    () => [
      {
        src: "/docs/diploma-law.png",
        title: "Высшее юридическое образование",
        note: "гос. диплом",
      },
      {
        src: "/docs/rosreestr-au-2024-front.png",
        title: "Арбитраж / банкротство",
        note: "свидетельство (экзамен)",
      },
      {
        src: "/docs/uniweb-gr-2014.png",
        title: "GR: поддержка интересов бизнеса",
        note: "доп. подготовка",
      },
    ],
    []
  );

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const onPrev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const onNext = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-sm text-white/60">
          Квалификация и документы (короткий перечень).
        </div>

        <button
          type="button"
          onClick={() => openAt(0)}
          className="inline-flex items-center justify-center rounded-xl bg-white/[0.06] px-4 py-2 text-sm text-white/85 hover:bg-white/[0.10]"
        >
          Показать документы
        </button>
      </div>

      <div className="mt-6 divide-y divide-white/10">
        <RowButton onClick={() => openAt(0)}>Высшее юридическое образование</RowButton>
        <RowButton onClick={() => openAt(1)}>
          Арбитраж / банкротство (свидетельство)
        </RowButton>
        <RowButton onClick={() => openAt(2)}>
          GR / поддержка интересов бизнеса (доп. подготовка)
        </RowButton>
      </div>

      <DocumentsModal
        open={open}
        slides={slides}
        index={index}
        onClose={() => setOpen(false)}
        onPrev={onPrev}
        onNext={onNext}
        onGoTo={(i) => setIndex(i)}
      />
    </div>
  );
}

function RowButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between py-4 text-left text-sm text-white/80 hover:text-white sm:text-base"
    >
      <span>{children}</span>
      <span className="text-white/40">→</span>
    </button>
  );
}
