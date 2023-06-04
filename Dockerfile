# BACKEND DOCKER

FROM node:18.12.1 AS backend

WORKDIR /backend

COPY backend/package*.json .

RUN npm install

COPY backend/ .

EXPOSE 8000

CMD ["npm", "start"]

# FRONTEND DOCKER

FROM node:18.12.1 AS frontend 

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

RUN npm run

CMD ["npm", "start"]