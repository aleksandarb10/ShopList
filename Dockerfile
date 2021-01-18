FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 5000

CMD [ "node", "server.ts" ]