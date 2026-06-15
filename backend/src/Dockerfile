# Development stage
# Use an official Node runtime as a parent image
FROM node:lts-alpine AS backend-dev-stage

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./app

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./app

COPY --from=shared-context . ./shared

# Expose the port the app runs on
EXPOSE 80

# Define the command to run the app
RUN npm run build

CMD ["node","index.js"]

# Production stage
#FROM node:lts AS prod-stage

#WORKDIR /app

#COPY package*.json ./

#RUN npm ci --only=production

#COPY . .

#RUN npm run build

#EXPOSE 80

#CMD ["npx", "serve", "-s", "dist"]