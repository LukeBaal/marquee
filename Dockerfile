FROM node:14-alpine3.11 as builder

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache --virtual build-dependencies add python make g++ \
    && npm install

COPY . .

RUN npm run build

FROM node:14-alpine3.11

RUN apk add --no-cache darkhttpd

COPY --from=builder /app /app

WORKDIR /app

EXPOSE 5000

ENV NODE_ENV=production

CMD ["darkhttpd", "public", "--no-listing"]
