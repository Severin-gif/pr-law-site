import React from "react";
import { Helmet } from "react-helmet-async";

const ArbitrationBankruptcy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Арбитраж и банкротство | Юрист</title>
        <meta
          name="description"
          content="Юрист по арбитражным спорам и банкротству. Представительство в суде, защита активов."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-200">
        <h1 className="text-3xl font-semibold mb-4">
          Арбитраж и банкротство
        </h1>

        <p className="text-gray-400 mb-6">
          Юридическое сопровождение арбитражных споров и процедур банкротства
          с фокусом на защиту активов, управление рисками и достижение результата.
        </p>

        <section className="mb-8">
          <h2 className="text-xl font-medium mb-3">Арбитражные споры</h2>
          <p className="text-gray-400 mb-3">
            Представительство в арбитражных судах по спорам между юридическими лицами.
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-1">
            <li>подготовка исков, отзывов, встречных исков</li>
            <li>ведение дел в суде</li>
            <li>обжалование судебных решений</li>
            <li>контроль исполнения</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium mb-3">Банкротство</h2>
          <p className="text-gray-400 mb-3">
            Сопровождение процедур банкротства и защита интересов кредиторов.
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-1">
            <li>инициирование процедуры</li>
            <li>включение требований в реестр</li>
            <li>оспаривание сделок</li>
            <li>субсидиарная ответственность</li>
            <li>контроль управляющего</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium mb-3">Когда это актуально</h2>
          <ul className="list-disc pl-5 text-gray-400 space-y-1">
            <li>контрагент не исполняет обязательства</li>
            <li>возник судебный спор</li>
            <li>есть риск взыскания задолженности</li>
            <li>запущена процедура банкротства</li>
            <li>необходимо защитить бизнес</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium mb-3">Порядок работы</h2>
          <ol className="list-decimal pl-5 text-gray-400 space-y-1">
            <li>анализ ситуации</li>
            <li>формирование позиции</li>
            <li>разработка стратегии</li>
            <li>представительство в суде</li>
            <li>контроль результата</li>
          </ol>
        </section>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-2">Следующий шаг</h2>
          <p className="text-gray-400 mb-4">
            Опишите ситуацию — будет предложена стратегия и формат сопровождения.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white">
            Обсудить задачу
          </button>
        </section>
      </div>
    </>
  );
};

export default ArbitrationBankruptcy;