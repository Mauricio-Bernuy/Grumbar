# Use a lighter version of Node as a parent image
FROM node:14.16.0-alpine3.10
# Set the working directory to /api
WORKDIR /usr/scr/app
# copy package.json into the container at /api
COPY package*.json ./
# install dependencies
RUN npm install -qy
# Copy the current directory contents into the container at /api
COPY . .
# Make port 80 available to the world outside this container
EXPOSE 9000
EXPOSE 80
# Run the app when the container launches
CMD ["npm", "start"]


