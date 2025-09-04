<<<<<<< HEAD
# Use lightweight Node.js 18 Alpine image
=======
# Use official Node.js 18 image
>>>>>>> 7a98fb3 (v3)
FROM node:18-alpine

# Set working directory
WORKDIR /app

<<<<<<< HEAD
# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install --production --no-cache

# Copy the rest of the application code
COPY . .

# Expose the app port
EXPOSE 3000

# Start the Node.js application
=======
# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the rest of the app
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
>>>>>>> 7a98fb3 (v3)
CMD ["npm", "start"]

