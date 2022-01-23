#FROM node:alpine

# https://github.com/hirosystems/explorer/pull/582/commits/045e01f9405d5073a914f53e796dcb0bf66c39e2
FROM node:16-alpine AS deps


# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Install app dependencies
COPY package.json /usr/src/
COPY package-lock.json /usr/src/
RUN npm install

# Bundle app source
COPY . /usr/src

RUN npm run build
EXPOSE 3000

CMD ["npm", "start"]