FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server

RUN apk add --no-cache nginx && mkdir -p /run/nginx
COPY nginx/default.conf /etc/nginx/http.d/default.conf

EXPOSE 80

CMD ["sh", "-c", "node server/index.js & nginx -g 'daemon off;'"]
