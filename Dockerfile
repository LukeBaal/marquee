FROM node:14-alpine3.11 as builder

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/

RUN apk --no-cache --virtual build-dependencies add python make g++ \
    && npm install \
    && npm --prefix client install

COPY . .

RUN npm run --prefix client build

FROM node:14-alpine3.11

COPY --from=builder /app /app

WORKDIR /app

EXPOSE 5001

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
