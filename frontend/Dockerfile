FROM node:22.0.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3031

CMD ["npm", "start"]
