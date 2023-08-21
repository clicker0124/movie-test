# Use the official Node.js image as the base image for development
FROM node:18 as development-stage

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Start the development server
CMD ["npm", "run", "start"]