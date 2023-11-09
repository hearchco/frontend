FROM node:lts-slim

WORKDIR /usr/src/app

COPY . ./
RUN mv build/* ./

EXPOSE 3000

ENTRYPOINT [ "npm" ]
CMD [ "run", "start" ]
