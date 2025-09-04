# Use lightweight Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production --no-cache

# Copy the rest of the application code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the Node.js application
CMD ["npm", "start"]
