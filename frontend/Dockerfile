#use a lighter version of Node as a parent image
FROM node:14.16.0-alpine3.10
# Set the working directory to /client
WORKDIR /frontend
# copy package.json into the container at /client
COPY package*.json /frontend/
# install dependencies
RUN npm install -qy
# Copy the current directory contents into the container at /client
COPY . /frontend/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]
