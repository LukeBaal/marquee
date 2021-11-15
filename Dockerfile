FROM node:14-alpine3.11 as builder

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache --virtual build-dependencies add python make g++ \
    && npm install --production

COPY . .

RUN npm run build

FROM node:14-alpine3.11

COPY --from=builder /app /app

WORKDIR /app

EXPOSE 5051

ENV NODE_ENV=production

CMD ["node", "run", "start"]
