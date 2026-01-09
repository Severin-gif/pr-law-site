import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#EDEAE2]">
      <main className="mx-auto max-w-3xl px-6 py-12">
        {/* Header */}
        <header>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Обо мне
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
            Я частный юрист. Работаю с уже возникшими спорами и конфликтами —
            когда есть претензия, иск, давление со стороны контрагента или риск
            финансовых потерь. Моя задача — разобраться в ситуации, оценить
            позицию и предложить рабочий вариант действий.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#4B8BFF] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#4B8BFF]/25 hover:brightness-110 transition"
            >
              Обсудить задачу
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/80 hover:bg-white/5 transition"
            >
              На главную
            </Link>
          </div>
        </header>

        <Divider className="my-10" />

        {/* What I do */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold">
            Чем я занимаюсь
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
            Основной фокус — <strong className="text-white/90">споры и обязательства</strong>:
          </p>

          <ul className="mt-4 space-y-2 text-sm sm:text-base text-white/75">
            {[
              "судебные споры (арбитраж, общая юрисдикция)",
              "договорные конфликты: подряд, субподряд, аренда, поставка",
              "госконтракты, взыскания, неустойки",
              "налоговые и административные споры",
              "корпоративные разногласия",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1 w-1 rounded-full bg-white/40" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
            Я работаю с ситуациями, где цена ошибки — деньги, контроль или
            дальнейшие ограничения.
          </p>
        </section>

        <Divider className="my-10" />

        {/* Approach */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold">
            Как я подхожу к делу
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
            Я не начинаю действия без понимания последствий. Сначала анализирую
            документы и факты, затем — риски и возможные сценарии. После этого
            выбирается позиция и формат защиты: переговоры, процесс или
            комбинированный вариант.
          </p>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
            Опыт работы в бизнесе и взаимодействия с государственными органами
            позволяет видеть ситуацию шире, чем только по нормам закона.
          </p>
        </section>

        <Divider className="my-10" />

        {/* Format */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold">
            Формат работы
          </h2>

          <ul className="mt-4 space-y-2 text-sm sm:text-base text-white/75">
            {[
              "консультация по конкретной ситуации",
              "ведение спора или процесса",
              "сопровождение до результата",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-3 h-1 w-1 rounded-full bg-white/40" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
            Формат определяется задачей, а не заранее заданной услугой.
          </p>
        </section>

        <Divider className="my-10" />

        {/* CTA */}
        <section id="contact">
          <h2 className="text-lg sm:text-xl font-semibold">
            Если коротко
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-white/70">
            Если у вас уже есть юридическая проблема и нужно понять, что
            происходит и что делать дальше, — можно обсудить задачу.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/#contact"
              className="inline-flex items-center justify-center rounded-xl bg-[#4B8BFF] px-5 py-3 text-sm font-medium text-white shadow-sm shadow-[#4B8BFF]/25 hover:brightness-110 transition"
            >
              Обсудить задачу
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-white/80 hover:bg-white/5 transition"
            >
              Вернуться на главную
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

/* helpers */

function Divider({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-white/10 ${className}`} />;
}
