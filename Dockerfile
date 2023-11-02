# use tini to add graceful shutdown
FROM debian:stable-slim as init
RUN apt-get -qq update \
    && apt-get -qq install -y tini

# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/src/app

# use the official Node image until Bun fixes bug for static assets
# install dependencies into temp directory
# this will cache them and speed up future builds
FROM node:lts-slim AS install
WORKDIR /usr/src/app
RUN mkdir -p /temp
COPY package.json package-lock.json /temp/
RUN cd /temp && npm ci

# copy node_modules from temp directory
# then copy all (non-ignored) project files into the image
FROM base AS build
COPY --from=install /temp/node_modules node_modules
COPY . .

# build
ENV NODE_ENV=production
RUN [ "bun", "run", "build" ]

# copy production dependencies and source code into final image
FROM oven/bun:1-distroless AS release
WORKDIR /usr/src/app

COPY --from=init /usr/bin/tini /usr/bin/
COPY --from=build /usr/src/app/node_modules node_modules/20.9.0
COPY --from=build /usr/src/app/build ./
COPY --from=build /usr/src/app/package.json ./

EXPOSE 3000

# run the app
ENTRYPOINT [ "tini", "--" ]
CMD [ "bun", "run", "start" ]