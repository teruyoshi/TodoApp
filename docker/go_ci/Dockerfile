# ビルドステージ
FROM golang:1.24-alpine3.21 AS build

WORKDIR /app

# go.modとgo.sumを先にコピーして依存解決
COPY ./go/go.mod ./go/go.sum ./
RUN go mod download

# ソースコードをコピー
COPY ./go .

RUN mkdir -p app

# ビルド
RUN go build -o app/ cmd/todo_app/main.go


# ランタイム（最小限）ステージ
FROM alpine:3.21

WORKDIR /app

# 必要なものだけ追加
RUN apk add --no-cache curl

# ビルドしたバイナリだけコピー
COPY --from=build /app/app .

# ポートを指定
EXPOSE 8080

# エントリーポイント
CMD ["./main"]
