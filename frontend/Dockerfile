#use a lighter version of Node as a parent image
FROM node:16.15-alpine
# Set the working directory to /client
WORKDIR /usr/src/app
# copy package.json into the container at /client
COPY package*.json ./
# install dependencies
RUN npm install -qy
# Copy the current directory contents into the container at /client
COPY . .
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]
