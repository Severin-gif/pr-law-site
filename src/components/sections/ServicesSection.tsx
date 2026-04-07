import ServiceCard from "../cards/ServiceCard";
import { SERVICES } from "../../config/services";

export default function ServicesSection() {
  return (
    <section id="services" className="bg-[#05070b] py-14 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xs font-medium uppercase tracking-[0.28em] text-white/50">
            УСЛУГИ
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
