FROM gcr.io/distroless/nodejs20-debian12:nonroot

WORKDIR /app

COPY package.json build/ ./

CMD [ "index.js" ]

EXPOSE 3000

LABEL org.opencontainers.image.source="https://github.com/hearchco/frontend"
