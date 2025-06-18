# Railway-compatible Dockerfile for KaliShare Backend
FROM node:18-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy all source code
COPY . .

# Install backend dependencies
WORKDIR /app/backend
RUN npm ci --only=production

# Set working directory to backend for running the app
WORKDIR /app/backend

# Expose backend port
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5001/health || exit 1

# Start backend service directly
CMD ["npm", "start"] 