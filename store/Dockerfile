FROM node:18 as build
WORKDIR /app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

EXPOSE 80

FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/ /usr/share/nginx/html

