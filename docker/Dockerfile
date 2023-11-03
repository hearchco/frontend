# use tini to add graceful shutdown
FROM debian:stable-slim as init
RUN apt-get -qq update \
    && apt-get -qq install -y tini

# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
# copy production dependencies and source code into final image
FROM oven/bun:1 as base
WORKDIR /usr/src/app

COPY --from=init /usr/bin/tini /usr/bin/
COPY . .

EXPOSE 3000

# run the app
ENTRYPOINT [ "tini", "--" ]
CMD [ "bun", "run", "start" ]
