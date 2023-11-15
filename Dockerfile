# Use an official Node.js runtime as a parent image
FROM node:20.9.0-alpine3.18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 8000

# Run the application
CMD ["npm", "run", "start"]
