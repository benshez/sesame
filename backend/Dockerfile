# Use official Node.js Alpine image
FROM node:lts-alpine  AS backend-dev-stage

# Set working directory
WORKDIR /app

RUN corepack enable

RUN corepack install -g pnpm@latest

# Copy dependency files first to leverage Docker cache
COPY package*.json ./

# Install production dependencies only
RUN npm install

COPY . .

COPY --from=shared-context . ./shared

#RUN npm run build

# Expose the application port
EXPOSE 80

# Start the application
#CMD ["npm", "start"]

CMD ["node","index.js"]