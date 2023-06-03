# Use an official Node.js runtime as the parent image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port 3000 to the Docker daemon
EXPOSE 3000

# The command to start the Next.js app
CMD [ "npm", "run", "dev" ]
