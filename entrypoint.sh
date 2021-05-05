#!/bin/sh

migrate() {
    echo "Updating db schema..."
    yarn migrate:up
}

development() {
    migrate
    echo "Starting DEVELOPMENT server..."
    ./node_modules/.bin/nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' src/index.ts
}

production() {
    echo "Starting PRODUCTION server..."
    yarn serve
}

"$@"

