FROM node:18.5.0

WORKDIR /app

COPY package*.json /app/

RUN npm install -g serve

COPY . /app/

EXPOSE 3000

CMD ["serve", "-s", "build"]