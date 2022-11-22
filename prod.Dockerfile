FROM node:16.17.1-alpine3.16 as build
WORKDIR /usr/app
COPY . /usr/app

RUN npm ci
RUN npm run build

FROM nginx:1.23.1-alpine
EXPOSE 800
COPY COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html