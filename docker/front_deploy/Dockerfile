FROM node:22.14-slim

# 必要なものをインストール
RUN npm install -g firebase-tools

WORKDIR /app
COPY ./front .

RUN npm ci
# RUN npm run build

# 必要なら、ここで firebase deploy もOK

CMD ["tail", "-f", "/dev/null"]
