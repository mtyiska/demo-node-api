# Use Node.js LTS as base image
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . .

# Build TypeScript files
RUN npm run build

# Expose port 3000
EXPOSE 4400

# Start application
CMD ["node", "dist/index.js"]
