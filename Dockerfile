# build image
FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build-only

# production stage
FROM nginx:stable-alpine as production-stage

RUN mkdir /app

COPY --from=build-stage /app/dist /app

COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
