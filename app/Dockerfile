# Use lightweight Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

