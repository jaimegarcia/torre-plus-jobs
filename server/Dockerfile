FROM node:12-slim

WORKDIR /server
ENV NODE_ENV development

COPY package.json /server/package.json

RUN npm install --production

COPY .env.example /server/.env.example
COPY . /server

CMD ["npm","start"]

EXPOSE 8080
