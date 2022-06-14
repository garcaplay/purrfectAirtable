FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
# Do we really want to copy everything?
COPY ./ ./
RUN npm i
CMD ["node", "server.js"]