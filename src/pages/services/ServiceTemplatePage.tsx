import { Navigate } from "react-router-dom";

import type { ServiceItem } from "../../config/services";

type ServiceTemplatePageProps = {
  service?: ServiceItem;
};

const ServiceTemplatePage = ({ service }: ServiceTemplatePageProps) => {
  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
      <p className="text-sm uppercase tracking-[0.18em] text-[#B08B57]">Услуги</p>
      <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-5xl">{service.title}</h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#CFC9BE] sm:text-lg">
        {service.description}
      </p>
    </section>
  );
};

export default ServiceTemplatePage;
