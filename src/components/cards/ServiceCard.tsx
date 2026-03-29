import type { ServiceItem } from "../../config/services";

type ServiceCardProps = {
  service: ServiceItem;
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <article
      className="group flex h-full min-h-[360px] flex-col rounded-3xl bg-white/[0.03] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] ring-1 ring-white/10 transition-colors duration-200 hover:bg-white/[0.05] hover:ring-white/20"
      aria-label={service.title}
    >
      <h3 className="text-[24px] font-semibold leading-tight tracking-tight text-white md:text-[26px]">
        {service.title}
      </h3>

      <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-white/72">
        {service.bullets.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 rounded-2xl bg-black/30 px-4 py-4 ring-1 ring-white/10">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
          Результат
        </p>
        <p className="mt-2 text-[15px] leading-relaxed text-white/88">{service.result}</p>
      </div>

      <a
        href={service.ctaHref}
        className="mt-auto inline-flex pt-7 text-sm font-medium text-white/85 underline decoration-white/30 underline-offset-4 transition-colors duration-200 hover:text-white hover:decoration-white"
      >
        {service.ctaLabel}
      </a>
    </article>
  );
};

export default ServiceCard;
