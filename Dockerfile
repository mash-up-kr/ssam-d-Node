FROM node:16-alpine

RUN npm install -g npm@9.6.7
RUN npm i -g pnpm

COPY .package.json /app

RUN pnpm i

COPY . /app

WORKDIR /app