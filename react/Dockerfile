FROM node:lts-alpine3.18 AS development
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm i
# Copy app files
COPY . .
# Expose port react server
EXPOSE 8000
# Expose port mocks server
EXPOSE 8100
# Start the app
CMD [ "npm", "start" ]
