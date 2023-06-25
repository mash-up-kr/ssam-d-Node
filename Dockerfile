FROM node:18-alpine

RUN npm install -g npm@9.6.7
RUN npm i -g pnpm
WORKDIR /app

COPY ./package.json /app
RUN pnpm i

COPY prisma /app/prisma
RUN npx prisma generate 

COPY . /app
RUN pnpm run build