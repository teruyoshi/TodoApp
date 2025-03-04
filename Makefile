# Makefile
include .env

# 環境変数の定義
DOCKER_COMPOSE = docker compose
DOCKER_COMPOSE_FILE = compose.yaml
FEATURE_DIR = 
TEST_DIR = $(if $(FEATURE_DIR),./internal/features/$(FEATURE_DIR)/,./)...

# ターゲット一覧
.PHONY: build up down destroy rebuild restart stop ps front go db logs go-lint lint go-fmt format go-test go-coverage open-go-coverage test clean

# Docker関連
build:down
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build

up:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) up -d

down:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down

destroy:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) down --rmi all --volumes

rebuild: down
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) build --no-cache

restart:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) restart

stop:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) stop

ps:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) ps

front:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec front bash

go: 
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec go ash

db:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec db mysql ${MYSQL_DATABASE} -u ${MYSQL_USER} -p

logs:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) logs -f

# コード品質関連

lint:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec front npm run lint

format:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec front npm run format
	
# テスト関連
test:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec front npm run test

# go 関連
go-lint: 
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec go golangci-lint run

go-fmt: 
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec go go fmt ./...

go-test:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec go go test -coverprofile=coverage.out $(TEST_DIR)

go-coverage: go-test
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec go go tool cover -html=coverage.out -o coverage.html

open-go-coverage: go-coverage
	@wslview ./go/coverage.html || echo "ブラウザを開けませんでした。coverage.html を直接開いてください。"

# キャッシュクリアなど
clean:
	$(DOCKER_COMPOSE) -f $(DOCKER_COMPOSE_FILE) exec front npm run clean
