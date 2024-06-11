# Use the official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app files
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]
