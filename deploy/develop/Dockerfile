FROM node:16-alpine

RUN npm i -g pnpm

COPY .package.json /app

RUN pnpm i

COPY . /app

WORKDIR /app