FROM node:18-alpine as builder
WORKDIR /app

COPY  . .
RUN mkdir node_modules 

# RUN npm install yarn 
RUN yarn install --production && yarn build
ENV NEXT-TELEMETRY_DISABLED 1

FROM node:18-alpine 
WORKDIR /app 

COPY --from=builder /app .

EXPOSE 3000

CMD ["yarn", "start"]