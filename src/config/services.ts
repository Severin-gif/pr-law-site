export type ServiceItem = {
  id: string;
  title: string;
  bullets: [string, string, string];
  result: string;
  ctaLabel: string;
  ctaHref: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: "arbitration-bankruptcy",
    title: "Арбитраж и банкротство",
    bullets: [
      "Долг, убытки и срыв обязательств.",
      "Давление контрагентов и риск арестов.",
      "Сценарий защиты до суда и в процессе.",
    ],
    result: "Управляемая стратегия вместо реактивных действий.",
    ctaLabel: "Обсудить кейс",
    ctaHref: "#contact",
  },
  {
    id: "corporate-disputes",
    title: "Корпоративные конфликты",
    bullets: [
      "Споры между участниками и директором.",
      "Блокировки решений, счетов и управления.",
      "Выход участника и перераспределение долей.",
    ],
    result: "Контроль переговорной и процессуальной позиции.",
    ctaLabel: "Получить план действий",
    ctaHref: "#contact",
  },
  {
    id: "asset-protection",
    title: "Защита активов и рисков",
    bullets: [
      "Активы под угрозой взыскания.",
      "Претензии, проверки и регуляторные риски.",
      "Проверка условий сделки до подписания.",
    ],
    result: "Риски структурированы, критичные зоны закрыты заранее.",
    ctaLabel: "Запросить аудит рисков",
    ctaHref: "#contact",
  },
];
