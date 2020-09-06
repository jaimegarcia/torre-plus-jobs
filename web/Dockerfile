FROM node:12-slim

WORKDIR /web

COPY ./web/package.json /web

RUN npm install

COPY ./web /web

RUN npm run build