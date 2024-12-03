FROM node:14

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY public ./public
COPY src ./src

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
