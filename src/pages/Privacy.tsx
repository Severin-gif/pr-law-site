import React from "react";

const Privacy: React.FC = () => {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16 text-white">
      <h1 className="mb-6 text-2xl font-serif">Политика конфиденциальности</h1>

      <div className="space-y-8 text-sm text-white/80">
        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">1. Общие положения</h2>

          <h3 className="text-sm font-semibold text-white">1.1.</h3>
          <p>
            Настоящая политика определяет порядок обработки и защиты персональных данных пользователей сайта.
          </p>

          <h3 className="text-sm font-semibold text-white">1.2.</h3>
          <p>
            Оператором персональных данных является: Индивидуальный юрист / владелец сайта (ФИО: Миронов
            Вячеслав Владимирович).
          </p>

          <h3 className="text-sm font-semibold text-white">1.3.</h3>
          <p>
            Политика применяется ко всей информации, которую пользователь предоставляет через сайт, включая формы
            обратной связи.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">2. Перечень обрабатываемых данных</h2>
          <p>Оператор может обрабатывать следующие персональные данные:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>имя;</li>
            <li>контактные данные (телефон, email, Telegram);</li>
            <li>содержание обращения (включая описание ситуации, документы, сроки);</li>
            <li>технические данные (IP-адрес, cookies — при наличии аналитики).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">3. Цели обработки персональных данных</h2>
          <p>Персональные данные обрабатываются исключительно для:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>связи с пользователем;</li>
            <li>предварительного анализа юридической ситуации;</li>
            <li>подготовки ответа или предложения услуг;</li>
            <li>исполнения обязательств перед пользователем (при заключении договора);</li>
            <li>соблюдения требований законодательства.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">4. Обработка данных при отправке формы консультации</h2>

          <h3 className="text-sm font-semibold text-white">4.1.</h3>
          <p>
            При заполнении формы «Запросить разбор» пользователь самостоятельно и добровольно предоставляет
            персональные данные.
          </p>

          <h3 className="text-sm font-semibold text-white">4.2.</h3>
          <p>Отправка формы означает:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>согласие на обработку персональных данных;</li>
            <li>подтверждение достоверности предоставленной информации;</li>
            <li>согласие на получение ответа по указанным контактным данным.</li>
          </ul>

          <h3 className="text-sm font-semibold text-white">4.3.</h3>
          <p>Данные, передаваемые через форму, используются исключительно для обработки конкретного запроса и не используются для:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>массовых рассылок;</li>
            <li>передачи третьим лицам;</li>
            <li>публикации.</li>
          </ul>

          <h3 className="text-sm font-semibold text-white">4.4.</h3>
          <p>
            Пользователь вправе не указывать избыточные сведения и несёт ответственность за раскрытие информации
            третьих лиц.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">5. Правовые основания обработки</h2>
          <p>Обработка персональных данных осуществляется на основании:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>ст. 6 Федерального закона №152-ФЗ «О персональных данных»;</li>
            <li>согласия субъекта персональных данных;</li>
            <li>необходимости исполнения обязательств перед пользователем.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">6. Хранение и защита данных</h2>

          <h3 className="text-sm font-semibold text-white">6.1.</h3>
          <p>
            Персональные данные хранятся в форме, позволяющей определить субъекта, не дольше, чем этого требуют
            цели обработки.
          </p>

          <h3 className="text-sm font-semibold text-white">6.2.</h3>
          <p>Оператор принимает необходимые технические и организационные меры для защиты данных:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>ограничение доступа;</li>
            <li>защита каналов передачи;</li>
            <li>контроль доступа к информации.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">7. Передача данных третьим лицам</h2>

          <h3 className="text-sm font-semibold text-white">7.1.</h3>
          <p>Персональные данные не передаются третьим лицам, за исключением случаев:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>исполнения требований законодательства;</li>
            <li>
              необходимости исполнения обязательств перед пользователем (например, при подключении платежных
              сервисов).
            </li>
          </ul>

          <h3 className="text-sm font-semibold text-white">7.2.</h3>
          <p>Передача данных в рекламных или маркетинговых целях не осуществляется.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">8. Права пользователя</h2>
          <p>Пользователь вправе:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>запросить информацию о своих данных;</li>
            <li>требовать уточнения, блокировки или удаления данных;</li>
            <li>отозвать согласие на обработку.</li>
          </ul>
          <p>Запрос направляется по контактам, указанным на сайте.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base font-semibold text-white">9. Заключительные положения</h2>

          <h3 className="text-sm font-semibold text-white">9.1.</h3>
          <p>Оператор вправе изменять настоящую политику без предварительного уведомления.</p>

          <h3 className="text-sm font-semibold text-white">9.2.</h3>
          <p>Актуальная версия политики всегда доступна на сайте.</p>
        </section>
      </div>
    </main>
  );
};

export default Privacy;
