FROM node:18
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN yarn generate
RUN yarn build
EXPOSE 9301
CMD [ "yarn", "start:prod" ]
