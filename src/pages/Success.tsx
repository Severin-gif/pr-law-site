import { Helmet } from "react-helmet-async";

export default function Success() {
  return (
    <>
      <Helmet>
        <title>Заявка отправлена | Подтверждение обращения к юристу</title>
        <meta
          name="description"
          content="Страница подтверждения отправки обращения: заявка получена, данные зафиксированы, ответ по юридическому запросу направляется в течение 24 часов."
        />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="max-w-xl text-center">
          <h1 className="text-2xl font-semibold mb-4">
            Заявка отправлена
          </h1>

          <p className="text-gray-400 mb-6">
            Ваше обращение получено и зафиксировано.
            Ответ поступит в течение 24 часов.
          </p>

          <a
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 rounded-lg"
          >
            Вернуться на сайт
          </a>
        </div>
      </div>
    </>
  );
}
