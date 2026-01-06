// PersonalFormatSection.tsx
export default function PersonalFormatSection() {
  return (
    <section className="mt-20 px-8">
      <div className="max-w-5xl">
        <h3 className="text-xl font-semibold text-white">
          Персональный формат работы
        </h3>

        <ul className="mt-6 space-y-2 text-slate-300">
          <li>— личное участие в стратегии</li>
          <li>— ограниченное количество клиентов</li>
          <li>— приоритет по времени и решениям</li>
          <li>— вход в сложные и конфликтные дела</li>
        </ul>

        <p className="mt-6 text-sm text-slate-400">
          Стоимость и формат обсуждаются только после анализа.
        </p>
      </div>
    </section>
  );
}
