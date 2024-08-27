FROM cgr.dev/chainguard/node-lts:latest

ENV NODE_ENV=production

COPY --chown=node:node ["package.json", "build/", "./"]

CMD [ "index.js" ]

EXPOSE 8080

LABEL org.opencontainers.image.source="https://github.com/hearchco/frontend"