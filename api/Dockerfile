FROM node:14-alpine

RUN mkdir -p /usr/src/api

WORKDIR /usr/src/api

RUN yarn install

COPY  . ./

CMD [ "node", "app.js" ]