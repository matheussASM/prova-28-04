FROM node:16-alpine AS build

WORKDIR /app
COPY ./package.json /app/package.json

RUN yarn install

COPY . /app/

RUN yarn build

FROM node:16-alpine AS production

WORKDIR /app
COPY --from=build /app/package.json /app/package.json

RUN npm install --only=prod --force
RUN npm install pm2

COPY --from=build /app/dist /app/src

CMD npx pm2-runtime ./src/server.js