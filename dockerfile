# Use the official Node.js image
FROM node:14

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Clean and install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Rebuild bcrypt for the correct environment
RUN npm rebuild bcrypt --build-from-source

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
