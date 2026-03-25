# Development stage
FROM node:lts-alpine as frontend-dev-stage

WORKDIR /app

RUN corepack enable

RUN corepack install -g pnpm@latest

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-only

FROM nginx:alpine AS production

COPY --from=frontend-dev-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]