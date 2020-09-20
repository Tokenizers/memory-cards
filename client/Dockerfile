FROM node:14-alpine

RUN mkdir -p /usr/src/client
RUN chown 1000:1000 /usr/src/client

USER 1000
WORKDIR /usr/src/client

# Prevent the reinstallation of node modules at every changes in the source code
COPY --chown=1000:1000 package.json yarn.lock ./
RUN yarn install

COPY --chown=1000:1000 . ./

CMD [ "yarn", "dev-docker" ]