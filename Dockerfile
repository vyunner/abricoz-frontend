# build environment
FROM node:22-alpine as build
WORKDIR /app

# Добавляем ARG и ENV
ARG BASE_URL=/
ENV VUE_APP_BASE_URL=$BASE_URL

COPY . .
RUN yarn install
RUN yarn build

# production environment
FROM node:22-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
CMD ["serve", "-s", "dist", "-l", "3000"]
