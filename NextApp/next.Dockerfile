FROM node:18-alpine
WORKDIR /app

COPY . .

RUN npm install yarn 
RUN yarn install
RUN yarn build

ENV NEXT-TELEMETRY_DISABLED 1

EXPOSE 3000

CMD yarn start