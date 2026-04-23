export type ServiceItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  href: string;
  icon: "scale" | "file" | "briefcase" | "shield";
};

export const SERVICES: ServiceItem[] = [
  {
    id: "arbitration-bankruptcy",
    slug: "arbitration-bankruptcy",
    title: "Арбитраж и банкротство",
    description: "Сопровождение споров и банкротных процедур с контролем рисков на каждом этапе.",
    href: "#contact",
    icon: "scale",
  },
  {
    id: "contract-work",
    slug: "contract-work",
    title: "Договорная работа",
    description: "Проверка и подготовка договоров, чтобы исключить слабые условия и лишние риски.",
    href: "#contact",
    icon: "file",
  },
  {
    id: "corporate-support",
    slug: "corporate",
    title: "Корпоративные вопросы",
    description: "Структурные решения по конфликтам участников, сделкам и управлению компанией.",
    href: "#contact",
    icon: "briefcase",
  },
  {
    id: "asset-protection",
    slug: "asset-protection",
    title: "Защита активов",
    description: "Превентивная защита активов, претензионная работа и снижение уязвимостей бизнеса.",
    href: "#contact",
    icon: "shield",
  },
];

export const getServiceBySlug = (slug: string): ServiceItem | undefined =>
  SERVICES.find((service) => service.slug === slug);
