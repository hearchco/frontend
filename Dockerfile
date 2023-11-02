# use dumb-init to add graceful shutdown
FROM building5/dumb-init:1.2.1 as init

# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1-distroless as base
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
FROM base AS prerelease
COPY --from=install /temp/node_modules node_modules
COPY . .

# build
ENV NODE_ENV=production
RUN bun run build

# copy production dependencies and source code into final image
FROM base AS release
COPY --from=init /dumb-init /usr/local/bin/
COPY --from=prerelease /usr/src/app/node_modules node_modules
COPY --from=prerelease /usr/src/app/build ./
COPY --from=prerelease /usr/src/app/package.json ./

# switch to nonroot user
USER bun
EXPOSE 3000

# run the app
ENTRYPOINT [ "/usr/local/bin/dumb-init", "--" ]
CMD [ "bun", "run", "start" ]