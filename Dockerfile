FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build-only

# production stage
FROM nginx:1.25.3-alpine as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx/prod.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]