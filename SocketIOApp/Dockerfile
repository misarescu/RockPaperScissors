FROM node:18-alpine as builder
WORKDIR /app

COPY . .

RUN yarn install --production

FROM node:18-alpine
WORKDIR /app

COPY --from=builder /app .

EXPOSE 8080

CMD ["yarn", "start"]