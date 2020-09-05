FROM nginx:1.16.0-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

WORKDIR /usr/src/app/nginx
COPY sslcert /usr/src/app/nginx
