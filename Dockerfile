FROM node:8-slim
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
COPY . ./app
CMD ["npm", "start"]


# docker build -t node-joker .

# docker run -it -p 9000:3000 node-joker