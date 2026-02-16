export default function ProBono() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16 text-neutral-200">
      <h1 className="text-4xl font-semibold mb-8 tracking-tight">
        Pro Bono
      </h1>

      <p className="text-lg mb-6 text-neutral-300">
        Юридическая помощь, оказываемая на безвозмездной основе
        в отдельных случаях общественной или системной значимости.
      </p>

      <p className="mb-6 leading-relaxed">
        Не каждое дело измеряется гонораром.<br />
        Есть ситуации, которые формируют практику.<br />
        Есть дела, в которых важно отстоять принцип.<br />
        Есть случаи, где профессиональная юридическая поддержка
        необходима вне стандартной коммерческой модели.
      </p>

      <p className="mb-10">
        Pro Bono — это работа в таких проектах на основе личного решения.
      </p>

      <h2 className="text-xl font-semibold mb-4">Критерии рассмотрения</h2>

      <ul className="space-y-3 mb-8 list-disc pl-6 text-neutral-300">
        <li>защита прав в системных правовых конфликтах;</li>
        <li>дела, способные повлиять на судебную практику;</li>
        <li>проекты культурной, образовательной или научной значимости;</li>
        <li>
          ситуации, где юридическая защита объективно необходима,
          а коммерческий формат затруднителен.
        </li>
      </ul>

      <p className="mb-10 text-neutral-400">
        Каждое обращение проходит предварительную юридическую оценку.
        Решение принимается индивидуально с учётом текущей загрузки.
      </p>

      <h2 className="text-xl font-semibold mb-4">Обращение</h2>

      <p>
        Направьте письмо на{" "}
        <a
          href="mailto:LEGAL@LIVE.RU?subject=Pro%20Bono"
          className="underline hover:text-white transition"
        >
          LEGAL@LIVE.RU
        </a>{" "}
        с темой «Pro Bono».
      </p>
    </section>
  );
}
