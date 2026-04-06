# pr-law-site

Сайт работает как **SPA (Vite + React)** с единым backend-слоем на **Express**.

## Целевая архитектура (каноничная)

- Frontend: `src/*` (React + Vite).
- Backend runtime: `server/index.js` (Express).
- Прод-выдача: Express раздает `dist/` и обслуживает API.

> Канонический серверный entrypoint: `server/index.js`.

## Runtime API (production)

Express обслуживает следующие endpoint'ы:

- `GET /health` — healthcheck.
- `GET /api` — API info endpoint.
- `POST /api/request-audit` — **единый production endpoint** для всех форм.

### Обработка форм

В проекте используется **один канонический способ** обработки форм: фронтенд отправляет заявку на Express endpoint `POST /api/request-audit`.

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
