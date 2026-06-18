# Use official Node.js Alpine image
FROM node:lts-alpine  AS backend-dev-stage

RUN apk update && apk add bash

RUN apk add git

# Set working directory
WORKDIR /app

#RUN corepack enable

#RUN corepack install -g pnpm@latest

# Copy dependency files first to leverage Docker cache
COPY package*.json ./

# Install production dependencies only
RUN npm install

#RUN npm install db-migrate-pg

COPY . .

#COPY entrypoint.sh /docker-entrypoint-initdb.d/

COPY --from=shared-context . ./shared

#RUN npm run build
RUN git clone https://github.com/vishnubob/wait-for-it.git

#ENTRYPOINT [ "./create-dbs.sh" ]

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["npm", "start"]

#CMD ["node","index.ts"]