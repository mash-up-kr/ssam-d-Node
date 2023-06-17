FROM node:16-alpine

RUN npm install -g npm@9.6.7
RUN npm i -g pnpm
WORKDIR /app

COPY ./package.json /app
RUN pnpm i

RUN sudo chmod 777 node_modules/.pnpm/mecab-ya@0.1.1/node_modules/mecab-ya/bin/install-mecab

COPY prisma /app/prisma
RUN pnpm prisma generate 

COPY . /app
RUN pnpm tspec generate --outputPath openapi.json
RUN pnpm build