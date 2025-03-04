# ビルドステージ
FROM golang:1.24-alpine3.21 AS builder

RUN apk add --no-cache git shadow && \
  apk add --no-cache gcc musl-dev

RUN groupadd -g 1000 go && \
  useradd -m -u 1000 -g 1000 go

USER go

RUN mkdir -p ~/src/app

WORKDIR /home/go/src/app
ENV CGO_ENABLED=1

RUN go install github.com/air-verse/air@latest
RUN go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest
RUN go install github.com/swaggo/swag/cmd/swag@latest

# ソースコードをコピー
COPY --chown=go:go ./go .

RUN go mod tidy && \
  go mod download

EXPOSE 8080

CMD ["air"]