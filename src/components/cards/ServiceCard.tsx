import type { ServiceItem } from "../../config/services";

type ServiceCardProps = {
  service: ServiceItem;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <article
      className="flex h-full min-h-[340px] flex-col rounded-2xl bg-white/[0.03] p-6 ring-1 ring-white/10 sm:p-7"
      aria-label={service.title}
    >
      <h3 className="text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[24px]">
        {service.title}
      </h3>

      <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/75">
        {service.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/45" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-white/45">Результат</p>
      <p className="mt-2 text-[15px] leading-relaxed text-white/88">{service.result}</p>

      <a
        href={service.ctaHref}
        className="mt-auto inline-flex pt-7 text-sm font-medium text-white/90 transition-colors duration-150 hover:text-white"
      >
        {service.ctaLabel}
      </a>
    </article>
  );
};

export default ServiceCard;
