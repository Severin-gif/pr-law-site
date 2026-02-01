<!--
  Partners page (single-file example)
  - Clean, minimal, no promises/fees
  - Each "Подробнее" opens a nudge modal: "Получить предложение"
  - Form submits to your backend endpoint that sends email to заявки
  - Replace FORM_ENDPOINT with your real route
-->

<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Партнёрам — Letter Law</title>
  <meta name="description" content="Партнёрам: бухгалтерам, арбитражным управляющим, оценщикам, аудиторам." />
  <style>
    :root{
      --bg:#0b0f14;
      --card:#111824;
      --text:#e7eef7;
      --muted:#a7b4c4;
      --line:rgba(255,255,255,.10);
      --btn:#e7eef7;
      --btnText:#0b0f14;
      --danger:#ff6b6b;
      --shadow: 0 18px 40px rgba(0,0,0,.45);
      --radius: 18px;
    }
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif;
      background: radial-gradient(1000px 700px at 20% 0%, rgba(88,155,255,.18), transparent 55%),
                  radial-gradient(900px 700px at 90% 20%, rgba(255,120,120,.14), transparent 55%),
                  var(--bg);
      color:var(--text);
      line-height:1.5;
    }
    .wrap{max-width:1040px;margin:0 auto;padding:40px 18px 80px}
    header{padding:10px 0 28px;border-bottom:1px solid var(--line);margin-bottom:28px}
    h1{margin:0;font-size:32px;letter-spacing:.2px}
    .sub{margin:8px 0 0;color:var(--muted);max-width:780px}
    .grid{
      display:grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap:16px;
      margin-top:18px;
    }
    @media (max-width: 860px){
      .grid{grid-template-columns: 1fr}
    }
    .card{
      background: linear-gradient(180deg, rgba(255,255,255,.05), rgba(255,255,255,.02));
      border:1px solid var(--line);
      border-radius: var(--radius);
      padding:18px 18px 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,.25);
      position:relative;
      overflow:hidden;
    }
    .card::before{
      content:"";
      position:absolute; inset:-2px -2px auto auto;
      width:220px; height:220px;
      background: radial-gradient(circle at 30% 30%, rgba(120,180,255,.18), transparent 65%);
      transform: translate(40px,-40px);
      pointer-events:none;
    }
    .card h2{
      margin:0 0 10px;
      font-size:18px;
      letter-spacing:.2px;
    }
    .card p{
      margin:0 0 14px;
      color:var(--muted);
      font-size:14.8px;
    }
    .actions{
      display:flex;
      gap:10px;
      align-items:center;
      justify-content:space-between;
      border-top:1px solid var(--line);
      padding-top:12px;
      margin-top:10px;
    }
    .linkbtn{
      appearance:none;
      background: transparent;
      border:none;
      color:var(--text);
      padding:10px 0;
      cursor:pointer;
      font-weight:600;
      letter-spacing:.2px;
      display:inline-flex;
      gap:10px;
      align-items:center;
      text-decoration:none;
    }
    .linkbtn span{opacity:.95}
    .arrow{opacity:.75;transition: transform .16s ease, opacity .16s ease}
    .linkbtn:hover .arrow{transform: translateX(2px); opacity:1}
    .hint{color:var(--muted);font-size:12.8px}

    /* Modal */
    .modal-backdrop{
      position:fixed; inset:0;
      background: rgba(0,0,0,.55);
      display:none;
      align-items:center;
      justify-content:center;
      padding:18px;
      z-index:999;
    }
    .modal-backdrop[aria-hidden="false"]{display:flex}
    .modal{
      width: min(560px, 100%);
      background: rgba(17,24,36,.96);
      border:1px solid var(--line);
      border-radius: 22px;
      box-shadow: var(--shadow);
      overflow:hidden;
    }
    .modal-header{
      padding:18px 18px 14px;
      border-bottom:1px solid var(--line);
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:12px;
    }
    .modal-title{
      margin:0;
      font-size:16px;
      letter-spacing:.2px;
    }
    .modal-sub{
      margin:6px 0 0;
      color:var(--muted);
      font-size:13.5px;
      max-width:430px;
    }
    .close{
      appearance:none;
      background: transparent;
      border:1px solid var(--line);
      color:var(--text);
      width:36px; height:36px;
      border-radius: 12px;
      cursor:pointer;
      display:grid;
      place-items:center;
    }
    .modal-body{padding:16px 18px 18px}
    form{margin:0}
    .row{display:grid; grid-template-columns:1fr; gap:10px}
    label{font-size:12.8px;color:var(--muted)}
    input, textarea{
      width:100%;
      padding:12px 12px;
      border-radius:14px;
      border:1px solid var(--line);
      background: rgba(0,0,0,.18);
      color: var(--text);
      outline:none;
    }
    input::placeholder, textarea::placeholder{color:rgba(167,180,196,.65)}
    textarea{min-height:90px;resize:vertical}
    .two{
      display:grid;
      grid-template-columns: 1fr 1fr;
      gap:10px;
    }
    @media (max-width: 560px){
      .two{grid-template-columns:1fr}
    }
    .modal-actions{
      display:flex;
      gap:10px;
      margin-top:14px;
      align-items:center;
      justify-content:flex-end;
    }
    .btn{
      appearance:none;
      border:none;
      padding:12px 14px;
      border-radius:14px;
      cursor:pointer;
      font-weight:700;
      letter-spacing:.2px;
    }
    .btn-primary{
      background: var(--btn);
      color: var(--btnText);
    }
    .btn-ghost{
      background: transparent;
      border:1px solid var(--line);
      color: var(--text);
    }
    .status{
      margin-top:10px;
      font-size:13px;
      color: var(--muted);
      min-height: 18px;
    }
    .status.error{color: var(--danger)}
    .fineprint{
      margin-top:10px;
      color: var(--muted);
      font-size:12.2px;
      line-height:1.45;
    }
    footer{
      margin-top:26px;
      border-top:1px solid var(--line);
      padding-top:16px;
      color:var(--muted);
      font-size:12.8px;
    }
  </style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>Партнёрам</h1>
      <p class="sub">
        Формат взаимодействия для специалистов, которые фиксируют юридический риск в работе клиента и передают контакт для дальнейшей квалификации и стратегии.
      </p>
    </header>

    <main class="grid">
      <!-- Accountants -->
      <section class="card">
        <h2>Бухгалтерам</h2>
        <p>
          Сопровождение сделок и хозяйственной деятельности клиентов: формулирование условий договоров, правовая оценка и корректировка договорных рисков,
          взыскание дебиторской задолженности, споры с контрагентами, урегулирование требований по договорам подряда и оказания услуг,
          оспаривание действий и решений контролирующих органов (ФНС, ФАС, Роструд, Роскомнадзор и др.). Работа строится на основе актуальной судебной практики.
        </p>
        <div class="actions">
          <button class="linkbtn" type="button" data-open-modal data-partner-type="Бухгалтер" data-topic="Запрос от бухгалтера">
            <span>Подробнее о формате работы</span>
            <span class="arrow">→</span>
          </button>
          <div class="hint">Передача контакта через сайт</div>
        </div>
      </section>

      <!-- Insolvency practitioner -->
      <section class="card">
        <h2>Арбитражным управляющим</h2>
        <p>
          Сопровождение обособленных и смежных судебных споров: включение и оспаривание требований кредиторов, споры по сделкам должника,
          взыскание убытков, вопросы субсидиарной ответственности, защита интересов участников процедуры при конфликте позиций.
          Точечное подключение к спору без вмешательства в процессуальное управление процедурой.
        </p>
        <div class="actions">
          <button class="linkbtn" type="button" data-open-modal data-partner-type="Арбитражный управляющий" data-topic="Запрос от АУ">
            <span>Подробнее о формате работы</span>
            <span class="arrow">→</span>
          </button>
          <div class="hint">Квалификация ситуации</div>
        </div>
      </section>

      <!-- Valuer -->
      <section class="card">
        <h2>Оценщикам</h2>
        <p>
          Правовая поддержка споров, где стоимость является ключевым элементом позиции: защита отчётов об оценке, работа с рецензиями и судебными экспертизами,
          сопровождение споров по залогам, выкупу, арендной плате, убыткам и изъятию имущества. Фокус — юридическая упаковка оценки в судебном процессе.
        </p>
        <div class="actions">
          <button class="linkbtn" type="button" data-open-modal data-partner-type="Оценщик" data-topic="Запрос от оценщика">
            <span>Подробнее о формате работы</span>
            <span class="arrow">→</span>
          </button>
          <div class="hint">Документальная модель</div>
        </div>
      </section>

      <!-- Auditor -->
      <section class="card">
        <h2>Аудиторам</h2>
        <p>
          Юридическое сопровождение ситуаций, выявленных в ходе аудита и финансового анализа: корпоративные конфликты, ответственность руководителя,
          споры между участниками, последствия выявленных нарушений, защита интересов компании при взаимодействии с контрагентами и контролирующими органами.
          Работа начинается там, где финансовый риск переходит в правовой.
        </p>
        <div class="actions">
          <button class="linkbtn" type="button" data-open-modal data-partner-type="Аудитор" data-topic="Запрос от аудитора">
            <span>Подробнее о формате работы</span>
            <span class="arrow">→</span>
          </button>
          <div class="hint">Правовой контур</div>
        </div>
      </section>
    </main>

    <footer>
      Коммуникация по партнёрским обращениям ведётся через сайт. Данные используются только для обработки запроса.
    </footer>
  </div>

  <!-- Modal -->
  <div class="modal-backdrop" id="partnerModal" aria-hidden="true" role="dialog" aria-modal="true">
    <div class="modal" role="document" aria-labelledby="modalTitle">
      <div class="modal-header">
        <div>
          <h3 class="modal-title" id="modalTitle">Получить предложение</h3>
          <p class="modal-sub" id="modalSub">
            Оставьте контакты и кратко опишите профиль клиента/ситуацию. Ответ — на e-mail.
          </p>
        </div>
        <button class="close" type="button" id="modalClose" aria-label="Закрыть">✕</button>
      </div>

      <div class="modal-body">
        <form id="partnerForm">
          <input type="hidden" name="partner_type" id="partner_type" value="" />
          <input type="hidden" name="topic" id="topic" value="" />
          <input type="hidden" name="page" value="/partners" />

          <div class="row">
            <div>
              <label for="company">Напишите название вашей компании</label>
              <input id="company" name="company" placeholder="ООО «___» / ИП ___" autocomplete="organization" required />
            </div>

            <div class="two">
              <div>
                <label for="email">E-mail</label>
                <input id="email" name="email" type="email" placeholder="name@domain.ru" autocomplete="email" required />
              </div>
              <div>
                <label for="telegram">Telegram</label>
                <input id="telegram" name="telegram" placeholder="@username или ссылка" />
              </div>
            </div>

            <div>
              <label for="note">Кратко (что за ситуация / какой профиль клиента)</label>
              <textarea id="note" name="note" placeholder="1–3 предложения, без персональных данных клиента"></textarea>
            </div>
          </div>

          <div class="modal-actions">
            <button class="btn btn-ghost" type="button" id="modalCancel">Отмена</button>
            <button class="btn btn-primary" type="submit" id="submitBtn">Отправить</button>
          </div>

          <div class="status" id="formStatus"></div>
          <div class="fineprint">
            Отправляя форму, вы подтверждаете, что передаёте информацию с согласия клиента и не раскрываете персональные данные без необходимости.
          </div>
        </form>
      </div>
    </div>
  </div>

  <script>
    // === CONFIG ===
    // Replace with your real backend endpoint that sends the email to "заявки"
    // Example: "/api/partner-lead" (Next.js), "/forms/partner" (Nest/Express), etc.
    const FORM_ENDPOINT = "/api/partner-lead";

    // === UI ===
    const modal = document.getElementById("partnerModal");
    const closeBtn = document.getElementById("modalClose");
    const cancelBtn = document.getElementById("modalCancel");
    const statusEl = document.getElementById("formStatus");
    const form = document.getElementById("partnerForm");
    const submitBtn = document.getElementById("submitBtn");

    const partnerTypeInput = document.getElementById("partner_type");
    const topicInput = document.getElementById("topic");

    function openModal(partnerType, topic) {
      partnerTypeInput.value = partnerType || "";
      topicInput.value = topic || "";
      statusEl.textContent = "";
      statusEl.classList.remove("error");

      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Focus first input
      setTimeout(() => {
        const first = document.getElementById("company");
        first && first.focus();
      }, 0);
    }

    function closeModal() {
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    // Open modal buttons
    document.querySelectorAll("[data-open-modal]").forEach(btn => {
      btn.addEventListener("click", () => {
        const partnerType = btn.getAttribute("data-partner-type") || "";
        const topic = btn.getAttribute("data-topic") || "Запрос";
        openModal(partnerType, topic);
      });
    });

    // Close handlers
    closeBtn.addEventListener("click", closeModal);
    cancelBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") closeModal();
    });

    // === SUBMIT ===
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusEl.textContent = "";
      statusEl.classList.remove("error");

      const data = Object.fromEntries(new FormData(form).entries());

      submitBtn.disabled = true;
      submitBtn.textContent = "Отправка…";

      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(text || "Ошибка отправки");
        }

        statusEl.textContent = "Заявка отправлена. Ответ — на e-mail.";
        form.reset();

        // Keep hidden fields after reset
        partnerTypeInput.value = data.partner_type || "";
        topicInput.value = data.topic || "";

        setTimeout(() => {
          closeModal();
        }, 900);

      } catch (err) {
        statusEl.textContent = "Не удалось отправить. Попробуйте ещё раз или используйте e-mail на сайте.";
        statusEl.classList.add("error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Отправить";
      }
    });
  </script>
</body>
</html>
