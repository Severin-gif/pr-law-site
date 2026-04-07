import { FileText, Scale, BriefcaseBusiness, Shield } from "lucide-react";

const services = [
  {
    title: "Арбитраж и банкротство",
    description: "Споры, взыскание задолженности, защита в банкротных процедурах.",
    icon: Scale,
    href: "#contact",
  },
  {
    title: "Договорная работа",
    description: "Проверка, согласование и подготовка договоров без лишнего риска.",
    icon: FileText,
    href: "#contact",
  },
  {
    title: "Корпоративное сопровождение",
    description: "Конфликты участников, сделки, управление рисками и структура решений.",
    icon: BriefcaseBusiness,
    href: "#contact",
  },
  {
    title: "Защита активов",
    description: "Претензионная работа, оспаривание давления и проверка уязвимых зон.",
    icon: Shield,
    href: "#contact",
  },
];

export function BusinessServicesSection() {
  return (
    <section className="bg-[#05070b] py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <p className="text-xs uppercase tracking-[0.28em] text-white/45">Услуги</p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Юридическая защита бизнеса
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">
            Структурная правовая работа для бизнеса: без визуального шума, без лишних обещаний, с понятным следующим шагом.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <a
                key={item.title}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition duration-200 hover:border-white/16 hover:bg-white/[0.04]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <Icon className="h-5 w-5 text-white/80" strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-medium leading-6 text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-[34ch] text-sm leading-6 text-white/58">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex items-center text-sm font-medium text-white/82">
                  Обсудить задачу
                  <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}