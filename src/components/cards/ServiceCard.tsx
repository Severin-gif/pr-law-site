import { BriefcaseBusiness, FileText, Scale, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import type { ServiceItem } from "../../config/services";

type ServiceCardProps = {
  service: ServiceItem;
};

const ICON_BY_NAME: Record<ServiceItem["icon"], LucideIcon> = {
  scale: Scale,
  file: FileText,
  briefcase: BriefcaseBusiness,
  shield: Shield,
};

const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = ICON_BY_NAME[service.icon];

  return (
    <Link
      to={service.href}
      className="group flex h-full min-h-[168px] items-start gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-150 hover:border-white/20 hover:bg-white/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/35 sm:p-5"
      aria-label={service.title}
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-white/[0.03]">
        <Icon className="h-[18px] w-[18px] text-white/80" strokeWidth={1.8} />
      </span>

      <span className="min-w-0">
        <span className="block text-base font-medium leading-6 text-white">
          {service.title}
        </span>
        <span className="mt-1.5 block text-sm leading-6 text-white/60">
          {service.description}
        </span>
      </span>
    </Link>
  );
};

export default ServiceCard;
