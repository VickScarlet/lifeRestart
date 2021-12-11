FROM node:alpine

ENV NPM_CONFIG_LOGLEVEL info

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD ["yarn", "dev"]

