FROM node:20-alpine3.18 AS development
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
# Expose port
EXPOSE 4200
# Start the app
CMD [ "npm", "start" ]
