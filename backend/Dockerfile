FROM node:18-slim
WORKDIR /usr/src/app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "app.js" ]