FROM mhart/alpine-node:14 AS base
ARG NODE_ENV
ENV NODE_ENV ${NODE_ENV}
ENV HOME /app
WORKDIR ${HOME}
COPY package.json tsconfig.json yarn.lock ${HOME}/

FROM base AS dependencies
RUN yarn install --production
RUN cp -R node_modules prod_node_modules
RUN yarn install --production=false
COPY src/ ${HOME}/src

FROM dependencies AS development
RUN npm install -g nodemon
CMD nodemon --watch 'src/**/*.ts' --ignore 'src/**/*.spec.ts' --exec 'ts-node' src/index.ts

FROM dependencies AS builder
RUN yarn build

FROM base AS release
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prod_node_modules ./node_modules
CMD yarn serve
