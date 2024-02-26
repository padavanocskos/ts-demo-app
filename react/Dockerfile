FROM node:lts-alpine3.18 AS development
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
# Add a work directory
WORKDIR /app
# Copy app files
COPY . .
# Cache and Install dependencies
COPY package.json .
RUN npm config set registry https://registry.npmjs.org/
RUN npm i -g pnpm
RUN pnpm i --verbose
# Expose port react server
EXPOSE 8000
# Expose port mocks server
EXPOSE 8100
# Start the app
CMD [ "npm", "start" ]
