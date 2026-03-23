# Development stage
# Use an official Node runtime as a parent image
FROM node:lts-alpine AS backend-dev-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the app
CMD ["npm", "run", "start"]


# Production stage
FROM node:lts AS prod-stage

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 80

CMD ["npx", "serve", "-s", "dist"]