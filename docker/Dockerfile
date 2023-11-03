FROM oven/bun:1 as base

WORKDIR /usr/src/app

COPY . ./
RUN mv build/* ./

EXPOSE 3000

ENTRYPOINT [ "bun" ]
CMD [ "run", "start" ]
