# ビルドステージ
FROM golang:1.24-alpine3.21 AS build

WORKDIR /app

# go.modとgo.sumを先にコピーして依存解決
COPY ./go/go.mod ./go/go.sum ./
RUN go mod download

RUN apk add curl
RUN go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest

# ソースコードをコピー
COPY ./go .

RUN mkdir -p app

# ビルド
RUN go build -o app/ cmd/todo_app/main.go

# ポートを指定
EXPOSE 8080

# エントリーポイント
CMD ["./app/main"]
