# 1. Build Stage
FROM golang:1.24-alpine3.21 AS builder
WORKDIR /app
COPY ./go .
RUN go build -ldflags="-s -w" -trimpath -o app cmd/todo_app/main.go

# 2. Run Stage（超軽量イメージ。AlpineでもOK、最小ならscratch）
FROM scratch
COPY --from=builder /app/app /app/app
EXPOSE 8080
ENTRYPOINT ["/app/app"]
