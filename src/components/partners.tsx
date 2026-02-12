import { useMemo, useState } from "react";

type PartnerType = "Бухгалтер" | "Арбитражный управляющий" | "Оценщик" | "Аудитор";

const FORM_ENDPOINT = "/api/partner-lead";

export default function PartnersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [partnerType, setPartnerType] = useState<PartnerType>("Бухгалтер");
  const [topic, setTopic] = useState<string>("Запрос");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "ok" | "error"; text: string }>({
    kind: "idle",
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const cards = useMemo(
    () => [
      {
        title: "Бухгалтерам",
        type: "Бухгалтер" as const,
        topic: "Запрос от бухгалтера",
        text:
          "Сопровождение сделок и хозяйственной деятельности клиентов: формулирование условий договоров, правовая оценка и корректировка договорных рисков, взыскание дебиторской задолженности, споры с контрагентами, урегулирование требований по договорам подряда и оказания услуг, оспаривание действий и решений контролирующих органов (ФНС, ФАС, Роструд, Роскомнадзор и др.). Работа строится на основе актуальной судебной практики.",
        hint: "Передача контакта через сайт",
      },
      {
        title: "Арбитражным управляющим",
        type: "Арбитражный управляющий" as const,
        topic: "Запрос от АУ",
        text:
          "Сопровождение обособленных и смежных судебных споров: включение и оспаривание требований кредиторов, споры по сделкам должника, взыскание убытков, вопросы субсидиарной ответственности, защита интересов участников процедуры при конфликте позиций. Точечное подключение к спору без вмешательства в процессуальное управление процедурой.",
        hint: "Квалификация ситуации",
      },
      {
        title: "Оценщикам",
        type: "Оценщик" as const,
        topic: "Запрос от оценщика",
        text:
          "Правовая поддержка споров, где стоимость является ключевым элементом позиции: защита отчётов об оценке, работа с рецензиями и судебными экспертизами, сопровождение споров по залогам, выкупу, арендной плате, убыткам и изъятию имущества. Фокус — юридическая упаковка оценки в судебном процессе.",
        hint: "Документальная модель",
      },
      {
        title: "Аудиторам",
        type: "Аудитор" as const,
        topic: "Запрос от аудитора",
        text:
          "Юридическое сопровождение ситуаций, выявленных в ходе аудита и финансового анализа: корпоративные конфликты, ответственность руководителя, споры между участниками, последствия выявленных нарушений, защита интересов компании при взаимодействии с контрагентами и контролирующими органами. Работа начинается там, где финансовый риск переходит в правовой.",
        hint: "Правовой контур",
      },
    ],
    []
  );

  function openModal(t: PartnerType, tp: string) {
    setPartnerType(t);
    setTopic(tp);
    setStatus({ kind: "idle", text: "" });
    setIsOpen(true);
  }

  function closeModal() {
    if (loading) return;
    setIsOpen(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ kind: "idle", text: "" });

    if (!company.trim() || !email.trim()) {
      setStatus({ kind: "error", text: "Укажите название компании и e-mail." });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        partner_type: partnerType,
        topic,
        company: company.trim(),
        email: email.trim(),
        telegram: telegram.trim(),
        note: note.trim(),
        page: "/partners",
      };

      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text().catch(() => "Ошибка отправки"));

      setStatus({ kind: "ok", text: "Заявка отправлена. Ответ — на e-mail." });

      // reset inputs (keep partner type/topic)
      setCompany("");
      setEmail("");
      setTelegram("");
      setNote("");

      setTimeout(() => setIsOpen(false), 700);
    } catch {
      setStatus({ kind: "error", text: "Не удалось отправить. Попробуйте ещё раз позже." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Партнёрам</h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Формат взаимодействия для специалистов, которые фиксируют юридический риск в работе клиента и передают контакт
            для дальнейшей квалификации и стратегии.
          </p>
        </header>

        <main className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {cards.map((c) => (
            <section
              key={c.title}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              <h2 className="text-base font-semibold tracking-tight">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{c.text}</p>

              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                <button
                  type="button"
                  onClick={() => openModal(c.type, c.topic)}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-slate-100 hover:opacity-90"
                >
                  Подробнее о формате работы <span className="opacity-70">→</span>
                </button>
                <div className="text-xs text-slate-400">{c.hint}</div>
              </div>
            </section>
          ))}
        </main>

        <footer className="mt-6 border-t border-white/10 pt-4 text-xs text-slate-400">
          Коммуникация по партнёрским обращениям ведётся через сайт. Данные используются только для обработки запроса.
        </footer>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 shadow-[0_18px_40px_rgba(0,0,0,0.45)]">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <h3 className="text-sm font-semibold tracking-tight">Получить предложение</h3>
                <p className="mt-1 text-xs text-slate-300">
                  Оставьте контакты и кратко опишите профиль клиента/ситуацию. Ответ — на e-mail.
                </p>
              </div>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 text-slate-100 hover:bg-white/5"
                onClick={closeModal}
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            <form className="p-5" onSubmit={onSubmit}>
              <input type="hidden" name="partner_type" value={partnerType} />
              <input type="hidden" name="topic" value={topic} />

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-300">Напишите название вашей компании</label>
                  <input
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ООО «___» / ИП ___"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-300">E-mail</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@domain.ru"
                      type="email"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-300">Telegram</label>
                    <input
                      className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                      value={telegram}
                      onChange={(e) => setTelegram(e.target.value)}
                      placeholder="@username или ссылка"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-300">Кратко (что за ситуация / какой профиль клиента)</label>
                  <textarea
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/20"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="1–3 предложения, без персональных данных клиента"
                    rows={4}
                  />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-100 hover:bg-white/5"
                  onClick={closeModal}
                  disabled={loading}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-950 hover:opacity-90 disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Отправка…" : "Отправить"}
                </button>
              </div>

              <div className="mt-3 min-h-[18px] text-xs">
                {status.kind === "ok" && <span className="text-slate-300">{status.text}</span>}
                {status.kind === "error" && <span className="text-red-300">{status.text}</span>}
              </div>

              <p className="mt-2 text-[11px] leading-relaxed text-slate-400">
                Отправляя форму, вы подтверждаете, что передаёте информацию с согласия клиента и не раскрываете
                персональные данные без необходимости.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
