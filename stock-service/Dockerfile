FROM node:18-alpine

WORKDIR /user/src/app

RUN npm i -g @nestjs/cli

# Copy files we need
COPY src ./
COPY package*.json ./
COPY tsconfig.json ./
COPY nest-cli.json ./

# npm install meant for automated environments
RUN npm install

RUN npm run build
