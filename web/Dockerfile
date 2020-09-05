FROM node:12-slim

WORKDIR /web
ENV NODE_ENV development

COPY package.json /web/package.json

RUN npm install

COPY . /web

CMD ["npm","start"]

EXPOSE 3000
