FROM node:14-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

RUN mkdir -p /home/node-app

# Set the working directory to /home/node-app
WORKDIR /home/node-app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Start your Node.js application
CMD ["node", "index.js"]
