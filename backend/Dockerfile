# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Set the default environment to production
ENV NODE_ENV=production

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# Expose the port your application runs on
EXPOSE 3000

# Run Prisma migrations before starting the application
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]