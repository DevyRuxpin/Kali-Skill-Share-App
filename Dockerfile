# KaliShare Dockerfile (fixed for cloud build)
FROM node:18-alpine as base

WORKDIR /app

# Copy backend and frontend separately for better layer caching
COPY backend ./backend
COPY frontend ./frontend

# Install backend dependencies
WORKDIR /app/backend
RUN npm ci --only=production

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# Go back to /app for docker-compose compatibility
WORKDIR /app

# Expose ports for backend, frontend, and db
EXPOSE 3000 5001 5432

# Health check for backend
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --spider -q http://localhost:5001/health || exit 1

# Default command (for docker-compose or cloud)
CMD ["docker-compose", "up", "-d"] 