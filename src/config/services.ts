export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "scale" | "file" | "briefcase" | "shield";
};

export const SERVICES: ServiceItem[] = [
  {
    id: "arbitration-bankruptcy",
    title: "Арбитраж и банкротство",
    description: "Сопровождение споров и банкротных процедур с контролем рисков на каждом этапе.",
    href: "#contact",
    icon: "scale",
  },
  {
    id: "contract-work",
    title: "Договорная работа",
    description: "Проверка и подготовка договоров, чтобы исключить слабые условия и лишние риски.",
    href: "#contact",
    icon: "file",
  },
  {
    id: "corporate-support",
    title: "Корпоративные вопросы",
    description: "Структурные решения по конфликтам участников, сделкам и управлению компанией.",
    href: "#contact",
    icon: "briefcase",
  },
  {
    id: "asset-protection",
    title: "Защита активов",
    description: "Превентивная защита активов, претензионная работа и снижение уязвимостей бизнеса.",
    href: "#contact",
    icon: "shield",
  },
];
