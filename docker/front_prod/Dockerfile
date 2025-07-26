# 1. Build Step
FROM node:22.14-slim

WORKDIR /app

# 依存ファイルを先にコピー
COPY ./front/package.json ./front/package-lock.json* ./
RUN npm ci

# ソースコードをコピー
COPY ./front .

# ビルド（E2Eで previewサーバー使う場合は必要）
RUN npm run build

# デフォルトでVite開発サーバーを起動（E2Eのため5173ポート解放）
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

