# Use official Node.js LTS image
FROM node:20-slim

# Set working directory
WORKDIR /app

COPY package*.json ./

# Install dependencies 
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "development" ]; then npm install; else npm install --only=production; fi

# Set environment
ENV NODE_ENV=$NODE_ENV

# Copy remaining app files
COPY . .

# Build TypeScript code
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

# Prisma
RUN npx prisma generate

# Expose app port
EXPOSE 3000

# Run the app
CMD ["node", "dist/server.js"]
