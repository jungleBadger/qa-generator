# Use the official Node.js 20.16.0 image
FROM node:20.16.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Copy the .env file to the container
COPY .env ./

RUN npm install --only=development

# Expose the port the app runs on (default 4025, can be overridden by .env)
EXPOSE 4025
EXPOSE 5173

# Start the application
CMD ["sh", "docker_start.sh"]

