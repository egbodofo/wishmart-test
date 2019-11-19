# Specify a base image
FROM node:alpine as builder

WORKDIR /usr/app

# Install some dependencies
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
# test
