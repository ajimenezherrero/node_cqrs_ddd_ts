COLOR_NC := \033[0m
COLOR_WHITE := \033[1;37m
COLOR_BLACK := \033[0;30m
COLOR_BLUE := \033[0;34m
COLOR_LIGHT_BLUE := \033[1;34m
COLOR_GREEN := \033[0;32m
COLOR_LIGHT_GREEN := \033[1;32m
COLOR_CYAN := \033[0;36m
COLOR_LIGHT_CYAN := \033[1;36m
COLOR_RED := \033[0;31m
COLOR_LIGHT_RED := \033[1;31m
COLOR_PURPLE := \033[0;35m
COLOR_LIGHT_PURPLE := \033[1;35m
COLOR_BROWN := \033[0;33m
COLOR_YELLOW := \033[1;33m
COLOR_GRAY := \033[0;30m
COLOR_LIGHT_GRAY := \033[0;37m

include .env

help: ## This help dialog.
	@echo "\n$(COLOR_GREEN)Environment configuration:$(COLOR_NC)\n"
	@echo "$(COLOR_BROWN)NODE_ENV $(COLOR_PURPLE)-> $(COLOR_LIGHT_GRAY)$(NODE_ENV)$(COLOR_NC)\n"	
	@IFS=$$'\n' ; \
    help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
    for help_line in $${help_lines[@]}; do \
        IFS=$$'#' ; \
        help_split=($$help_line) ; \
        help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
        help_info=`echo $${help_split[2]}` ; \
        printf "%-30s %s\n" $$help_command $$help_info ; \
    done
.PHONY: help

install: ## Installs all dependencies (docker for mac should be preinstalled)
	make create-docker-network
	make build
.PHONY: install

build: ## Builds the docker image
	docker-compose build
.PHONY: build

start: ## Starts the application
	docker-compose up --build
.PHONY: start

restart: ## Restarts the application
.PHONY: restart

test: ## Run tests for the file passed as parameter or the entire suite if none passed.
.PHONY: test

init: ## Init app
.PHONY: init

## -------
## Utils
## -------

create-docker-network: ## Creates the docker network	
	@if [ "$(shell docker network ls | grep kukku-bukku-network)" = "" ]; then \
		echo "Creating kukku-bukku-network network"; \
		docker network create kukku-bukku-network; \
	else \
		echo "Kukku-bukku-network network already exists, skipping creation"; \
	fi
.PHONY: create-docker-network

db-migrate: ## Update db schema.
	docker-compose exec recipe-app yarn migrate:up
.PHONY: db-migrate
