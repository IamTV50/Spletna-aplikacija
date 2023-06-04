# FRONTEND DOCKER

FROM node:18.12.1

WORKDIR /

COPY /package*.json ./

RUN npm install

COPY / /.

#EXPOSE 3000

RUN npm run

CMD ["npm", "start"]