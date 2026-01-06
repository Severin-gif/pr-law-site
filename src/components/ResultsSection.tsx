// ResultsSection.tsx
export default function ResultsSection() {
  return (
    <section className="mt-20 px-8">
      <div className="max-w-5xl">
        <h3 className="text-xl font-semibold text-white">
          Результаты работы
        </h3>

        <div className="mt-8 space-y-6 text-slate-300">
          <div>
            <strong>Арбитражный спор</strong>
            <p className="text-sm mt-1">
              Взыскание задолженности. Защита позиции через процесс.
            </p>
          </div>

          <div>
            <strong>Корпоративный конфликт</strong>
            <p className="text-sm mt-1">
              Фиксация контроля и условий выхода.
            </p>
          </div>

          <div>
            <strong>Банкротство</strong>
            <p className="text-sm mt-1">
              Работа с субсидиарной ответственностью.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
