# FROM node:16.17.1-alpine3.16 as build

# WORKDIR /usr/app

# # COPY package*.json ./  
# COPY . .

# # RUN npm ci

# # COPY . .

# # RUN npm run build



FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# COPY --from=build /usr/app/dist 
COPY ./dist/ /usr/app/dist 

EXPOSE 80
# run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"] 