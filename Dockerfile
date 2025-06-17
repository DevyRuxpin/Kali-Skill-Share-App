# Multi-stage build for KaliShare app
FROM node:18-alpine as base

# Install Docker CLI for docker-compose
RUN apk add --no-cache docker-cli

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY docker-compose.yml ./

# Copy source code
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Install dependencies
RUN cd backend && npm ci --only=production
RUN cd frontend && npm ci

# Build frontend
RUN cd frontend && npm run build

# Expose ports
EXPOSE 3000 5001 5432

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5001/health || exit 1

# Start command
CMD ["docker-compose", "up", "-d"] 