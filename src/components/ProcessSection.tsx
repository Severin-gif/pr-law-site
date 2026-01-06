// ProcessSection.tsx
export default function ProcessSection() {
  return (
    <section className="mt-20 px-8">
      <div className="max-w-5xl">
        <h3 className="text-xl font-semibold text-white">
          Как мы работаем
        </h3>

        <ol className="mt-6 space-y-2 text-slate-300 list-decimal list-inside">
          <li>Анализ ситуации и документов</li>
          <li>Формирование позиции и сценариев</li>
          <li>Выбор инструментов: переговоры / суд / меры</li>
          <li>Контроль процесса и корректировка стратегии</li>
        </ol>

        <p className="mt-6 text-sm text-slate-400">
          Без потоков, чатов и вебинаров.  
          Формат определяется задачей.
        </p>
      </div>
    </section>
  );
}
