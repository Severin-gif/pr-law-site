# pr-law-site

Сайт в production работает как **SPA (Vite + React) + Express runtime**.

## Фактический production runtime

На **2026-04-27** в проде активен только следующий путь запуска:

- `npm run build` → собирается Vite SPA в `dist/`.
- `npm run start` / контейнерный `CMD` → запускается `node server/index.js`.
- `server/index.js` отдает статику из `dist/` и API endpoint'ы.

Что важно:

- `server/app/*` (включая `server/app/layout.tsx`) сейчас **не участвует** в production runtime.
- В `package.json` отсутствует `next`, а в Docker/runtime стартует только `server/index.js`, поэтому `server/app` не является активной прод-веткой рендера.

## Источник истины для SEO (текущее состояние)

Поскольку в проде активен SPA runtime, источником истины являются:

- Базовые (дефолтные) SEO-теги: `index.html`.
- Пер-страничные title/description/canonical: React-страницы (`Helmet` / прямые обновления `document.head`).

`server/app/layout.tsx` содержит SEO-метаданные для Next App Router, но это **резерв/заготовка**, не используемая текущим прод-рантаймом.

## Целевая архитектура (каноничная)

- Frontend: `src/*` (React + Vite).
- Backend runtime: `server/index.js` (Express).
- Прод-выдача: Express раздает `dist/` и обслуживает API.

> Канонический серверный entrypoint: `server/index.js`.

## Runtime API (production)

Express обслуживает следующие endpoint'ы:

- `GET /health` — healthcheck.
- `GET /api` — API info endpoint.
- `POST /form-handler.php` — **единый production endpoint** для всех форм.

### Обработка форм

В проекте используется **один канонический способ** обработки форм: фронтенд отправляет заявку на endpoint `POST /form-handler.php`.

### Единый JSON-контракт `POST /form-handler.php`

Контракт зафиксирован в коде фронтенда: `src/config/requestAudit.ts`.

**Request (`Content-Type: application/json`)**

```json
{
  "name": "string (min 2)",
  "contact": "string (min 5)",
  "message": "string (min 10)",
  "consent": true,
  "hp": "string (honeypot, обычно пустая строка)",
  "ts": 1712400000000
}
```

**Success response**

```json
{
  "ok": true
}
```

**Error response (валидация, rate limit, server error)**

```json
{
  "ok": false,
  "error": "invalid_payload | rate_limited | internal_error | ..."
}
```

На фронтенде успех показывается только при `HTTP 2xx` **и** `ok: true`; для `HTTP 4xx/5xx` и любых `ok: false` отображается ошибка.

### SMTP переменные окружения

Для отправки заявок через SMTP должны быть заданы переменные окружения (без хардкода в репозитории):

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_TO` (например, `lead@letter-law.ru`)
- `MAIL_FROM` (почтовый ящик вашего домена)

## Локальный запуск

```bash
npm install
npm run build
npm run start
```

После запуска:

```bash
curl -f http://localhost:3000/health
```

## SEO-чеклист для новых страниц

- [ ] **Title**: добавить/обновить на странице через `Helmet` (или аналогично, где страница управляет `document.title`).
- [ ] **Description**: добавить/обновить `<meta name="description">` на уровне конкретной страницы.
- [ ] **Canonical**: задать корректный canonical URL на уровне страницы (через `Helmet` или явное обновление `<link rel="canonical">`).
- [ ] **Базовые дефолты** (fallback для SPA): при необходимости править в `index.html`:
  - `<title>`
  - `<meta name="description">`
  - `<link rel="icon" ...>`
  - `<link rel="canonical" ...>`
- [ ] Если когда-либо будет включен Next runtime (`server/app/*`) в production, синхронизировать те же базовые SEO-настройки в `server/app/layout.tsx` и обновить этот README.

## CI/CD и деплой-проверки

- В CI добавлена проверка `npm run ci:build-verify`, которая после сборки сканирует JS/source map в `dist/assets` и фейлит пайплайн, если найден legacy endpoint `/api/request-audit`.
- Перед публикацией выполняется очистка старых статических артефактов (включая директорию `assets`), чтобы исключить отдачу устаревших хэшированных файлов.
- Для `index.html` выставляется `no-cache, no-store, must-revalidate`, чтобы браузер всегда подтягивал актуальные ссылки на новые hashed bundle-файлы.

### Post-deploy smoke-check в браузере

1. Откройте сайт в Chrome DevTools (вкладка **Network**) и включите **Disable cache**.
2. Перезагрузите страницу и откройте основной JS bundle (тип `script`, путь `assets/index-*.js`).
3. Убедитесь, что в **Response/Preview/Source map** присутствует новый endpoint `/form-handler.php`.
4. Убедитесь, что строка `/api/request-audit` отсутствует в загруженном bundle/source map.
