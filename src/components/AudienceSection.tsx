export default function AudienceSection() {
  return (
    <section className="mt-24 px-8">
      <div className="max-w-4xl">
        <h3 className="text-xl font-medium text-white">
          Кому подходит этот формат
        </h3>

        <ul className="mt-8 space-y-3 text-slate-300 leading-relaxed">
          <li>— владельцам бизнеса и долей</li>
          <li>— директорам и управляющим</li>
          <li>— тем, кто находится внутри конфликта</li>
          <li>— тем, у кого риск уже возник</li>
          <li>— тем, кто понимает цену ошибки</li>
        </ul>

        <div className="mt-10 max-w-md border-l border-slate-700 pl-6">
          <p className="text-sm text-slate-400 leading-relaxed">
            Не подойдёт, если вы ищете шаблон, разовый совет
            или сопровождение без ответственности за результат.
          </p>
        </div>
      </div>
    </section>
  );
}
