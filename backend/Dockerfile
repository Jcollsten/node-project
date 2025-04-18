# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "production" ]; then npm install --production; else npm install; fi

# Set the default environment to production
ENV NODE_ENV=$NODE_ENV

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code 
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Expose the port your application runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/server.js"]