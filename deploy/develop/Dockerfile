FROM node:16-alpine

COPY .package.json /app
RUN yarn install --frozen-lockfile
COPY . /app
WORKDIR /app