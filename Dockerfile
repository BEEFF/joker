# syntax=docker/dockerfile:1

FROM node:8
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN npm i
EXPOSE 3306
CMD [ "node", "app.js" ]