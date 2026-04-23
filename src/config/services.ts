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
  name: string;
  summary: string;
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  icon: "scale" | "file" | "briefcase" | "shield";
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
    name: "Арбитраж и банкротство",
    summary: "Сопровождение споров и банкротных процедур с контролем рисков на каждом этапе.",
    slug: "arbitration-bankruptcy",
    path: "/services/arbitration-bankruptcy",
    title: "Арбитраж и банкротство для бизнеса — Letter Law",
    description:
      "Представление в арбитражных спорах и процедурах банкротства: стратегия, документы и защита интересов компании.",
    h1: "Арбитраж и банкротство",
    icon: "scale",
    placeholders: defaultPlaceholders("Арбитраж и банкротство"),
  },
  {
    id: "contract-work",
    name: "Договорная работа",
    summary: "Проверка и подготовка договоров, чтобы исключить слабые условия и лишние риски.",
    slug: "contract-work",
    path: "/services/contract-work",
    title: "Договорная работа и правовая экспертиза договоров — Letter Law",
    description:
      "Готовим и проверяем договоры под задачи бизнеса: формулировки, ответственность сторон, минимизация спорных рисков.",
    h1: "Договорная работа",
    icon: "file",
    placeholders: defaultPlaceholders("Договорная работа"),
  },
  {
    id: "corporate",
    name: "Корпоративные вопросы",
    summary: "Структурные решения по конфликтам участников, сделкам и управлению компанией.",
    slug: "corporate",
    path: "/services/corporate",
    title: "Корпоративные вопросы и сопровождение сделок — Letter Law",
    description:
      "Юридическое сопровождение корпоративных изменений: сделки с долями, споры участников, защита управленческих решений.",
    h1: "Корпоративные вопросы",
    icon: "briefcase",
    placeholders: defaultPlaceholders("Корпоративные вопросы"),
  },
  {
    id: "asset-protection",
    name: "Защита активов",
    summary: "Превентивная защита активов, претензионная работа и снижение уязвимостей бизнеса.",
    slug: "asset-protection",
    path: "/services/asset-protection",
    title: "Защита активов компании и бенефициаров — Letter Law",
    description:
      "Выстраиваем превентивную защиту активов: аудит рисков, претензионная работа и правовые меры против потерь бизнеса.",
    h1: "Защита активов",
    icon: "shield",
    placeholders: defaultPlaceholders("Защита активов"),
  },
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined =>
  SERVICES.find((service) => service.slug === slug);
