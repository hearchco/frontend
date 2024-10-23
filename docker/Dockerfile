FROM gcr.io/distroless/nodejs22-debian12:nonroot

WORKDIR /app

ENV NODE_ENV=production

COPY ["package.json", "build/", "./"]

CMD [ "index.js" ]

EXPOSE 3000

LABEL org.opencontainers.image.source="https://github.com/hearchco/frontend"
