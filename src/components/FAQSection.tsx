// FAQSection.tsx
export default function FAQSection() {
  return (
    <section className="mt-20 px-8">
      <div className="max-w-5xl">
        <h3 className="text-xl font-semibold text-white">
          Частые вопросы
        </h3>

        <div className="mt-6 space-y-4 text-slate-300 text-sm">
          <p><strong>Сколько стоит?</strong><br />Зависит от стадии и объёма. После анализа.</p>
          <p><strong>Берёте ли все дела?</strong><br />Нет. Только с управляемой перспективой.</p>
          <p><strong>Можно просто проконсультироваться?</strong><br />Если вопрос действительно консультационный.</p>
          <p><strong>Работаете дистанционно?</strong><br />Да, если это не снижает контроль.</p>
          <p><strong>Гарантии?</strong><br />Гарантирую работу, позицию и контроль процесса.</p>
        </div>
      </div>
    </section>
  );
}
