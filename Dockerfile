FROM node:16.17.1-alpine3.16 as build

RUN mkdir -p /usr/src/app

WORKDIR /app

COPY package*.json ./  

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 80
COPY ./docker/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html