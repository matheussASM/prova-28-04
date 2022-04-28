FROM node:16-alpine AS build

WORKDIR /app
COPY ./package.json /app/package.json

RUN yarn install

COPY . /app/

RUN yarn build

FROM nginx:alpine AS production

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=build /app/dist .

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]