# Simple KaliShare Dockerfile for Railway
FROM node:18-alpine

# Install necessary tools
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files first for better caching
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm ci --only=production

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm ci
RUN npm run build

# Copy all source code
WORKDIR /app
COPY . .

# Expose ports
EXPOSE 3000 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5001/health || exit 1

# Start command
CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm start"] 