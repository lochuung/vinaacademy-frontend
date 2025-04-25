# Stage 1: Build the application
# Use an official Node.js runtime as a parent image
FROM node:20.13.1-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application with environment variables
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN npm run build

# Stage 2: Serve the application
FROM node:20.13.1-alpine AS runner

WORKDIR /app

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
RUN npm install --omit=dev

# Expose the default port
EXPOSE 3000

# Set environment variables for production (can be overridden at runtime)
ENV NODE_ENV=production

CMD [ "npm", "start" ]