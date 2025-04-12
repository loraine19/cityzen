FROM node:20-alpine AS build

# Passer les variables VITE_* via les secrets GitHub
ARG VITE_FETCH_URL
ARG VITE_APP_URL
ARG VITE_STORE_KEY
ARG VITE_DOMAIN
ARG VITE_WS_URL

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

FROM nginx:node:20-alpine 

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
