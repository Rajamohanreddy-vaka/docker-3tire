FROM node:20-alpine
WORKDIR /app
COPY package.json .
COPY *.js .
ENV MONGO_URI=mongodb://mongodb:27017/tasksdb
RUN npm install
CMD [ "node", "server.js" ]