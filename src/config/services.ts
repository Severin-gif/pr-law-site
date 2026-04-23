export type ServiceSeo = {
  title: string;
  description: string;
};

export type ServiceFaqItem = {
  question: string;
  answer: string;
};

export type ServicePlaceholders = {
  heroTag: string;
  heroNote: string;
  summary: string;
  situations: string[];
  included: string[];
  process: string[];
  faq: ServiceFaqItem[];
  finalCta: string;
};

export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  href: string;
  icon: "scale" | "file" | "briefcase" | "shield";
  seo: ServiceSeo;
  placeholders: ServicePlaceholders;
};

const defaultPlaceholders = (label: string): ServicePlaceholders => ({
  heroTag: "Услуга",
  heroNote: `Короткий placeholder по услуге «${label}».`,
  summary: "Блок summary: краткое описание пользы и формата работы.",
  situations: [
    "Ситуация 1: placeholder кейс.",
    "Ситуация 2: placeholder кейс.",
    "Ситуация 3: placeholder кейс.",
  ],
  included: [
    "Что входит 1: placeholder пункт.",
    "Что входит 2: placeholder пункт.",
    "Что входит 3: placeholder пункт.",
  ],
  process: [
    "Шаг 1: placeholder.",
    "Шаг 2: placeholder.",
    "Шаг 3: placeholder.",
  ],
  faq: [
    {
      question: "Вопрос 1?",
      answer: "Короткий ответ-заглушка.",
    },
    {
      question: "Вопрос 2?",
      answer: "Короткий ответ-заглушка.",
    },
  ],
  finalCta: "Финальный CTA: обсудить задачу в удобном формате.",
});

export const SERVICES: ServiceItem[] = [
  {
    id: "arbitration-bankruptcy",
    slug: "arbitration-bankruptcy",
    title: "Арбитраж и банкротство",
    h1: "Арбитраж и банкротство",
    description: "Сопровождение споров и банкротных процедур с контролем рисков на каждом этапе.",
    href: "/services/arbitration-bankruptcy",
    icon: "scale",
    seo: {
      title: "Арбитраж и банкротство — шаблон страницы услуги",
      description: "Черновой SEO-блок для страницы услуги «Арбитраж и банкротство».",
    },
    placeholders: defaultPlaceholders("Арбитраж и банкротство"),
  },
  {
    id: "contract-work",
    slug: "contract-work",
    title: "Договорная работа",
    h1: "Договорная работа",
    description: "Проверка и подготовка договоров, чтобы исключить слабые условия и лишние риски.",
    href: "/services/contract-work",
    icon: "file",
    seo: {
      title: "Договорная работа — шаблон страницы услуги",
      description: "Черновой SEO-блок для страницы услуги «Договорная работа».",
    },
    placeholders: defaultPlaceholders("Договорная работа"),
  },
  {
    id: "corporate",
    slug: "corporate",
    title: "Корпоративные вопросы",
    h1: "Корпоративные вопросы",
    description: "Структурные решения по конфликтам участников, сделкам и управлению компанией.",
    href: "/services/corporate",
    icon: "briefcase",
    seo: {
      title: "Корпоративные вопросы — шаблон страницы услуги",
      description: "Черновой SEO-блок для страницы услуги «Корпоративные вопросы».",
    },
    placeholders: defaultPlaceholders("Корпоративные вопросы"),
  },
  {
    id: "asset-protection",
    slug: "asset-protection",
    title: "Защита активов",
    h1: "Защита активов",
    description: "Превентивная защита активов, претензионная работа и снижение уязвимостей бизнеса.",
    href: "/services/asset-protection",
    icon: "shield",
    seo: {
      title: "Защита активов — шаблон страницы услуги",
      description: "Черновой SEO-блок для страницы услуги «Защита активов».",
    },
    placeholders: defaultPlaceholders("Защита активов"),
  },
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined =>
  SERVICES.find((service) => service.slug === slug);
