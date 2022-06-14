FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./public ./
RUN npm i
CMD ["npm", "start"]