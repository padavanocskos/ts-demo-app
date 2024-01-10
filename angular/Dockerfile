FROM node:20-alpine3.18 AS development
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
RUN npm i
# Copy app files
COPY . .
# Expose port
EXPOSE 4200
# Start the app
CMD [ "npm", "start" ]
