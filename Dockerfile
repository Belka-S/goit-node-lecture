FROM node:16.6.1

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

ENV PORT 3000

EXPOSE $PORT

CMD ["npm", "start"]