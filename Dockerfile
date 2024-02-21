# Stage 1: Build
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /usr/app

# Install dependencies
COPY ./package*.json ./
# Using yarn without setting a custom registry
RUN yarn

# Copy the rest of your application code
COPY . .

# Build your app
RUN yarn build

# Stage 2: Runtime
FROM node:16-alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
RUN npm install --global pm2

# Copy built assets from the builder stage
COPY --from=builder /usr/app/dist ./dist
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/ecosystem.config.js .

# Use non-root user
USER node

# Expose the port your app runs on
EXPOSE 8888

# Run your app using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
