# Development stage
FROM node:lts-alpine as frontend-dev-stage

WORKDIR /app

RUN corepack enable

RUN corepack install -g pnpm@latest

COPY package*.json ./

RUN npm install

COPY . .

# Expose the port the app runs on
EXPOSE 3000

RUN npm run dev

# Use a simple static file server for production
FROM node:lts-alpine

RUN npm install -g http-server

WORKDIR /app

COPY --from=frontend-dev-stage /app/dist .

EXPOSE 80

CMD ["http-server", "dist"]