# pr-law-site

Сайт работает как **SPA (Vite + React)** с единым backend-слоем на **Express**.

## Целевая архитектура (каноничная)

- Frontend: `src/*` (React + Vite).
- Backend runtime: `server/index.js` (Express).
- Прод-выдача: Express раздает `dist/` и обслуживает API.

> Канонический серверный entrypoint: `server/index.js`.

## Runtime API (единый набор)

Express обслуживает следующие endpoint'ы:

- `GET /health` — healthcheck.
- `GET /api/health` — API healthcheck.
- `POST /api/request-audit` — основной endpoint обработки формы.
- `POST /api/lead` — алиас на тот же обработчик (совместимость).

### Обработка форм

В проекте используется **один способ** обработки форм: фронтенд отправляет заявку на Express endpoint `POST /api/request-audit`.

## Архив legacy-роутов (не участвуют в runtime)

Ранее в репозитории были Next-style route handlers. Они изолированы в архив и **не подключаются в текущем runtime**:

- `legacy/next-routes/app/api/request-audit/route.ts`
- `legacy/next-routes/app/api/__ping/route.ts`
- `legacy/next-routes/server/app/api/lead/route.tsx`

Использовать эти файлы в текущей архитектуре не нужно.

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
