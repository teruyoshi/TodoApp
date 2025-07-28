# ビルドステージ
FROM node:22.14-slim AS build

WORKDIR /app

COPY ./front/package*.json ./
RUN npm ci

COPY ./front ./
RUN npm run build

# 実行（配信）ステージ
FROM nginx:1.28-alpine3.21

RUN apk add --no-cache curl

# ビルド成果物（例: Viteなら /app/dist）をNginx公開ディレクトリにコピー
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
