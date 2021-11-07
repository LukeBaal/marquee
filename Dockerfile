FROM node:14-alpine

WORKDIR /usr/app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY client/package.json client/.
COPY client/package-lock.json client/.
RUN npm --prefix client install --production

COPY . .

RUN npm run --prefix client build

CMD ["npm", "run", "start"]