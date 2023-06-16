FROM node:16-alpine

RUN npm install -g npm@9.6.7
RUN npm i -g pnpm
WORKDIR /app

COPY ./package.json /app
RUN pnpm i

RUN pnpm tspec generate --outputPath openapi.json

COPY prisma /app/prisma
RUN pnpm prisma generate 

COPY . /app
RUN pnpm build