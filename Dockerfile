# Dockerfile for Agent Charlie Front End
# Supports web development and testing

FROM node:18-alpine AS base

# Install dependencies for Expo
RUN apk add --no-cache git

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy project files
COPY . .

# Expose Expo dev server ports
# 8081 - Metro bundler
# 19000 - Expo dev server
# 19001 - Expo dev server (legacy)
# 19002 - Expo web
EXPOSE 8081 19000 19001 19002

# Set environment variables
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=localhost

# Default command
CMD ["npm", "start", "--", "--web"]
