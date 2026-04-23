import { useEffect } from "react";

const SITE_URL = "https://letter-law.ru";
const PAGE_URL = `${SITE_URL}/bankrotstvo/`;

export default function BankruptcyPage() {
  useEffect(() => {
    document.title =
      "Юрист по банкротству — защита в арбитражных процедурах и спорах";

    setMetaTag(
      "name",
      "description",
      "Банкротство, оспаривание сделок, субсидиарная ответственность. Анализ рисков и защита интересов в арбитражном суде."
    );

    setCanonical(PAGE_URL);

    setMetaTag("property", "og:title", document.title);
    setMetaTag(
      "property",
      "og:description",
      "Банкротство, оспаривание сделок, субсидиарная ответственность. Анализ рисков и защита интересов в арбитражном суде."
    );
    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:url", PAGE_URL);

    injectJsonLd("bankruptcy-legal-service-schema", {
      "@context": "https://schema.org",
      "@type": "LegalService",
      name: "Миронов Вячеслав Владимирович",
      url: PAGE_URL,
      areaServed: "RU",
      serviceType:
        "Юридическое сопровождение банкротства и защита в арбитражных процедурах",
      description:
        "Банкротство, оспаривание сделок, субсидиарная ответственность. Анализ рисков и защита интересов в арбитражном суде.",
      provider: {
        "@type": "Person",
        name: "Миронов Вячеслав Владимирович",
        url: SITE_URL,
      },
    });

    return () => {
      removeJsonLd("bankruptcy-legal-service-schema");
    };
  }, []);

  return (
    <main className="service-page">
      <section className="service-hero container">
        <p className="service-eyebrow">Арбитражные споры и банкротство</p>
        <h1>Юридическое сопровождение банкротства и защита в арбитражных процедурах</h1>
        <p className="service-lead">
          Защита бизнеса и контролирующих лиц в процедурах банкротства.
          Оспаривание сделок, работа с требованиями кредиторов, минимизация
          рисков субсидиарной ответственности.
        </p>

        <div className="service-actions">
          <a href="#contact-form" className="btn btn-primary">
            Получить консультацию
          </a>
          <a href="#contact-form" className="btn btn-secondary">
            Отправить документы
          </a>
        </div>
      </section>

      <section className="service-section container" aria-labelledby="when-needed">
        <h2 id="when-needed">Когда это требуется</h2>
        <ul className="service-list">
          <li>подано заявление о банкротстве</li>
          <li>есть риск привлечения к субсидиарной ответственности</li>
          <li>сделки могут быть оспорены</li>
          <li>кредитор пытается включиться в реестр</li>
          <li>арбитражный управляющий действует в ущерб интересам стороны</li>
          <li>требуется контроль процедуры банкротства</li>
        </ul>
      </section>

      <section className="service-section container" aria-labelledby="about-service">
        <h2 id="about-service">Что входит в работу</h2>
        <p>
          Банкротство требует не формального участия, а точной правовой позиции.
          Ошибки на ранней стадии процедуры могут привести к потере контроля над
          спором, включению необоснованных требований в реестр, оспариванию
          сделок и привлечению к субсидиарной ответственности.
        </p>
        <p>
          Юридическая работа по делам о банкротстве включает анализ финансовой и
          правовой ситуации, оценку рисков, подготовку стратегии защиты,
          представительство в арбитражном суде и взаимодействие с арбитражным
          управляющим. Задача — защитить интересы доверителя в рамках закона,
          сократить потери и выстроить управляемую позицию в процедуре.
        </p>

        <ul className="service-list">
          <li>анализ финансовой и правовой позиции</li>
          <li>подготовка правовой стратегии</li>
          <li>оспаривание сделок или защита от оспаривания</li>
          <li>защита от субсидиарной ответственности</li>
          <li>работа с требованиями кредиторов</li>
          <li>представительство в арбитражном суде</li>
          <li>взаимодействие с арбитражным управляющим</li>
        </ul>
      </section>

      <section className="service-section container" aria-labelledby="result">
        <h2 id="result">Результат работы</h2>
        <ul className="service-list">
          <li>снижение финансовых потерь</li>
          <li>защита активов в пределах закона</li>
          <li>исключение или снижение субсидиарной ответственности</li>
          <li>контроль процедуры банкротства</li>
          <li>юридически выверенная позиция в суде</li>
        </ul>
      </section>

      <section className="service-section container" aria-labelledby="workflow">
        <h2 id="workflow">Формат работы</h2>

        <div className="service-stage">
          <h3>Этап 1 — анализ и стратегия</h3>
          <ul className="service-list">
            <li>изучение документов</li>
            <li>правовое заключение</li>
            <li>план действий</li>
          </ul>
        </div>

        <div className="service-stage">
          <h3>Этап 2 — сопровождение</h3>
          <ul className="service-list">
            <li>подготовка процессуальных документов</li>
            <li>участие в судебных заседаниях</li>
            <li>реализация выбранной стратегии</li>
          </ul>
        </div>

        <p className="service-note">
          Стоимость определяется после анализа ситуации. Возможна поэтапная
          оплата.
        </p>
      </section>

      <section className="service-section container" aria-labelledby="faq">
        <h2 id="faq">Вопросы по банкротству</h2>

        <div className="faq-item">
          <h3>Сроки процедуры</h3>
          <p>
            Сроки процедуры банкротства зависят от стадии дела, позиции
            кредиторов, объема имущества и количества обособленных споров. На
            практике значение имеет не только срок, но и своевременность
            процессуальных действий.
          </p>
        </div>

        <div className="faq-item">
          <h3>Риски субсидиарной ответственности</h3>
          <p>
            Риск субсидиарной ответственности возникает при наличии признаков
            контроля над должником, недобросовестных действий, искажения
            бухгалтерской документации, вывода активов или непередачи документов
            управляющему. Каждая ситуация требует отдельного правового анализа.
          </p>
        </div>

        <div className="faq-item">
          <h3>Оспаривание сделок</h3>
          <p>
            Оспаривание сделок в банкротстве связано с проверкой периода их
            совершения, характера встречного предоставления, осведомленности
            контрагента и влияния сделки на имущественные интересы кредиторов.
          </p>
        </div>

        <div className="faq-item">
          <h3>Роль арбитражного управляющего</h3>
          <p>
            Арбитражный управляющий влияет на ход процедуры, состав имущества,
            анализ сделок, формирование реестра и позицию по обособленным
            спорам. Его действия должны контролироваться процессуальными
            средствами, а при необходимости — оспариваться.
          </p>
        </div>
      </section>

      <section
        id="contact-form"
        className="service-section container service-cta"
        aria-labelledby="contact-title"
      >
        <h2 id="contact-title">Обсудить ситуацию</h2>
        <p>
          Если уже есть заявление, судебные акты, требования кредиторов или иные
          документы по делу — их лучше направить сразу на анализ.
        </p>

        <form className="contact-form">
          <div className="form-row">
            <label htmlFor="name">Имя</label>
            <input id="name" name="name" type="text" autoComplete="name" />
          </div>

          <div className="form-row">
            <label htmlFor="contact">Телефон / Telegram</label>
            <input id="contact" name="contact" type="text" autoComplete="tel" />
          </div>

          <div className="form-row checkbox-row">
            <label>
              <input type="checkbox" name="consent" required /> Согласен на
              обработку персональных данных
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Отправить
          </button>

          <p className="form-note">Ответ в течение рабочего дня</p>
        </form>
      </section>
    </main>
  );
}

function setMetaTag(attrName: "name" | "property", attrValue: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attrName}="${attrValue}"]`
  );

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attrName, attrValue);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }

  link.setAttribute("href", href);
}

function injectJsonLd(id: string, data: Record<string, unknown>) {
  removeJsonLd(id);

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

function removeJsonLd(id: string) {
  const script = document.getElementById(id);
  if (script) script.remove();
}