# Kali Skill Share - Deployment Guide

## Free Hosting Options

### 1. Railway (Recommended - Free Tier)
**Best for:** Full-stack applications with database
- **Free tier:** $5 credit monthly
- **Features:** Automatic deployments, PostgreSQL database, custom domains
- **Deployment time:** ~5 minutes

#### Railway Deployment Steps:
1. **Sign up** at [railway.app](https://railway.app)
2. **Connect GitHub** repository
3. **Create new project** from GitHub repo
4. **Add PostgreSQL** service
5. **Configure environment variables:**
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-production-secret-key
   NODE_ENV=production
   ```
6. **Deploy** - Railway will auto-detect Docker setup

### 2. Render (Free Tier)
**Best for:** Simple deployments
- **Free tier:** 750 hours/month
- **Features:** Automatic deployments, PostgreSQL
- **Limitations:** Sleeps after 15 minutes of inactivity

#### Render Deployment Steps:
1. **Sign up** at [render.com](https://render.com)
2. **Create new Web Service** from GitHub
3. **Configure build command:** `docker-compose up --build`
4. **Add PostgreSQL** database service
5. **Set environment variables**
6. **Deploy**

### 3. Heroku (Free Tier Discontinued)
**Alternative:** Heroku paid plans or migrate to Railway/Render

### 4. Vercel + Railway (Frontend + Backend)
**Best for:** Maximum performance
- **Frontend:** Deploy React app to Vercel
- **Backend:** Deploy API to Railway
- **Database:** Railway PostgreSQL

## Production Environment Variables

```bash
# Database
DATABASE_URL=postgresql://username:password@host:port/database

# Security
JWT_SECRET=your-super-secure-jwt-secret-key-here
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-app.railway.app

# Optional: Google Custom Search API (for enhanced search)
GOOGLE_SEARCH_API_KEY=your-google-api-key
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id
```

## Docker Production Build

### 1. Production Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Production Dockerfile (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### 3. Production docker-compose.yml
```yaml
version: '3.8'
services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - REACT_APP_API_URL=https://your-backend-url.com
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - JWT_SECRET=${JWT_SECRET}
      - NODE_ENV=production
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Testing Before Deployment

### 1. Run Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### 2. Build Test
```bash
# Test production build
docker-compose -f docker-compose.prod.yml up --build
```

### 3. Security Checklist
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure
- [ ] CORS is properly configured
- [ ] Rate limiting is enabled
- [ ] Environment variables are set
- [ ] No sensitive data in code

## Monitoring & Maintenance

### 1. Health Checks
- Monitor `/api/health` endpoint
- Set up uptime monitoring (UptimeRobot, Pingdom)

### 2. Logs
- Railway: Built-in log viewer
- Render: Logs in dashboard
- Set up error tracking (Sentry)

### 3. Database Backups
- Railway: Automatic backups
- Render: Manual backups available
- Consider external backup service

## Performance Optimization

### 1. Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images

### 2. Backend
- Enable caching (Redis in production)
- Optimize database queries
- Use connection pooling
- Implement pagination

### 3. Database
- Add indexes for frequently queried columns
- Regular maintenance
- Monitor query performance

## Troubleshooting

### Common Issues:
1. **CORS errors:** Check FRONTEND_URL environment variable
2. **Database connection:** Verify DATABASE_URL format
3. **JWT errors:** Ensure JWT_SECRET is set
4. **Build failures:** Check Node.js version compatibility

### Debug Commands:
```bash
# Check container logs
docker-compose logs

# Check specific service
docker-compose logs backend

# Access database
docker-compose exec db psql -U postgres -d kalishare

# Restart services
docker-compose restart
```

## Cost Optimization

### Free Tier Limits:
- **Railway:** $5/month credit
- **Render:** 750 hours/month
- **Vercel:** 100GB bandwidth/month

### Scaling Considerations:
- Monitor usage and upgrade when needed
- Consider serverless functions for cost efficiency
- Use CDN for static assets

## Support

For deployment issues:
1. Check the logs in your hosting platform
2. Verify environment variables
3. Test locally with production settings
4. Contact hosting platform support

---

**Note:** This deployment guide is designed for educational purposes. For production use, consider additional security measures and monitoring tools. 