# ビルドステージ
FROM golang:1.24-alpine3.21 AS build

WORKDIR /app

# go.modとgo.sumを先にコピーして依存解決
COPY ./go/go.mod ./go/go.sum ./
RUN go mod download

# ソースコードをコピー
COPY ./go .

# ビルド（main.go をエントリーポイントにしている場合）
RUN go build -o app/cmd/todo_app

# 実行ステージ
FROM alpine:3.21

WORKDIR /root/

# ビルドしたバイナリだけをコピー
COPY --from=build /app/app .

# 必要に応じてポートを指定（例：8080）
EXPOSE 8080

# エントリーポイント
CMD ["./app"]
