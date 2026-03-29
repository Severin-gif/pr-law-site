import ServiceCard from "../cards/ServiceCard";
import { SERVICES } from "../../config/services";

const ServicesSection = () => {
  return (
    <section id="services" className="py-14 sm:py-16 lg:py-20">
      <div className="rounded-[30px] bg-white/[0.02] px-5 py-8 ring-1 ring-white/10 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <header className="max-w-3xl">
          <h2 className="font-serif text-[32px] leading-[1.1] tracking-tight text-white sm:text-[38px] lg:text-[42px]">
            Юридическая защита бизнеса
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            Договоры, споры и риски — четкая архитектура решений без лишнего шума.
          </p>
        </header>

        <div className="mt-8 lg:hidden">
          <div
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Услуги: мобильный слайдер"
          >
            {SERVICES.map((service) => (
              <div key={service.id} className="w-[86%] shrink-0 snap-start sm:w-[62%]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 hidden gap-5 lg:grid lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        <p className="mt-8 text-xs text-white/45">
          Формат сопровождения определяется после анализа ситуации и документов.
        </p>
      </div>
    </section>
  );
};

export default ServicesSection;
