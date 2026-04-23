import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import type { ServiceItem } from "../../config/services";

type ServiceTemplatePageProps = {
  service?: ServiceItem;
};

const sectionTitleClass = "text-lg font-semibold tracking-tight sm:text-xl";
const sectionCardClass = "rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5";

const ServiceTemplatePage = ({ service }: ServiceTemplatePageProps) => {
  useEffect(() => {
    if (!service) {
      return;
    }

    document.title = service.seo.title;

    const descriptionTag = upsertMetaTag("name", "description");
    descriptionTag.setAttribute("content", service.seo.description);
  }, [service]);

  if (!service) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#B08B57]">{service.placeholders.heroTag}</p>
        <h1 className="mt-3 text-3xl font-light tracking-tight sm:text-5xl">{service.h1}</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
          {service.placeholders.heroNote}
        </p>
      </section>

      <section className="mt-6 sm:mt-8">
        <h2 className={sectionTitleClass}>Summary</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
          {service.placeholders.summary}
        </p>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className={sectionTitleClass}>Situations</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {service.placeholders.situations.map((item) => (
            <article key={item} className={sectionCardClass}>
              <p className="text-sm text-white/80">{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className={sectionTitleClass}>Included</h2>
        <ul className="mt-3 space-y-2 text-sm text-white/80 sm:text-base">
          {service.placeholders.included.map((item) => (
            <li key={item} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#B08B57]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className={sectionTitleClass}>Process</h2>
        <ol className="mt-3 space-y-3">
          {service.placeholders.process.map((item, index) => (
            <li key={item} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/20 text-xs text-white/70">
                {index + 1}
              </span>
              <p className="text-sm text-white/80 sm:text-base">{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 sm:mt-10">
        <h2 className={sectionTitleClass}>FAQ</h2>
        <div className="mt-3 space-y-3">
          {service.placeholders.faq.map((item) => (
            <article key={item.question} className={sectionCardClass}>
              <h3 className="text-sm font-medium text-white sm:text-base">{item.question}</h3>
              <p className="mt-2 text-sm text-white/70">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 sm:mt-10 sm:p-8">
        <h2 className={sectionTitleClass}>Final CTA</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
          {service.placeholders.finalCta}
        </p>
        <a
          href="/#contact"
          className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#4B8BFF] px-5 py-3 text-sm font-medium text-white transition hover:brightness-110"
        >
          Обсудить задачу
        </a>
      </section>
    </div>
  );
};

const upsertMetaTag = (attrName: "name" | "property", attrValue: string): HTMLMetaElement => {
  const selector = `meta[${attrName}="${attrValue}"]`;
  let tag: HTMLMetaElement | null = document.querySelector(selector);

  if (tag instanceof HTMLMetaElement) {
    return tag;
  }

  tag = document.createElement("meta");
  tag.setAttribute(attrName, attrValue);
  document.head.appendChild(tag);

  return tag;
};

export default ServiceTemplatePage;
