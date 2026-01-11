import React from "react";

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="mt-16 border-t border-white/5 pt-12">
      <h2 className="text-2xl font-serif tracking-tight text-white">
        ОБРАТНАЯ СВЯЗЬ
      </h2>
      <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr,1fr]">
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            Опишите ситуацию и приложите, по возможности, краткий перечень
            документов. Я отвечу после анализа фактов и предложу варианты
            действий.
          </p>
          <div>
           <div className="text-xs text-slate-400">E-mail</div>
            <div className="text-sm text-slate-100">LEGAL@LIVE.ru</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">Telegram</div>
            <div className="text-sm text-slate-100">@slava_vest</div>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.6)]">
          <form className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-xs text-slate-300">Имя</label>
              <input
                type="text"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-[#B0202F]"
                placeholder="Как к вам обращаться"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-300">
                Контакт
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-[#B0202F]"
                placeholder="Телефон или e-mail"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-slate-300">
                Кратко о вопросе
              </label>
              <textarea
                rows={3}
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-slate-50 outline-none placeholder:text-slate-500 focus:border-[#B0202F]"
                placeholder="Тип спора, сумма, стадия (досудебная / суд)…"
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full rounded-full bg-[#B0202F] px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-[#B0202F]/40 transition hover:bg-[#d1283b]"
            >
              Отправить заявку
            </button>
            <p className="pt-1 text-[11px] leading-snug text-slate-500">
              Отправка формы не создаёт договорных отношений. Условия работы
              фиксируются в письменном соглашении.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
