# Kali Skill Share

A modern web development skill-sharing platform built with React, Node.js, and PostgreSQL, deployed entirely via Docker.

## 🚀 Project Status: COMPLETE ✅

**All requirements have been successfully implemented and the application is ready for deployment!**

## ✨ Features Implemented

### ✅ Core Functionality
- **User Authentication**: Complete signup/login system with JWT tokens
- **Educational Resources**: Curated lists of web development learning materials
- **Real-time Timeline**: Live posts and comments with Socket.io
- **Advanced Search**: Web search integration with DuckDuckGo API
- **Professional UI**: Modern, responsive design with clean aesthetics
- **Docker Deployment**: Complete containerized application

### ✅ Technical Requirements Met
- **Simple Tech Stack**: React + Node.js + PostgreSQL (easy and non-complex)
- **Advanced UI/UX**: Professional, modern, and clean throughout
- **Real-time Features**: Live timeline updates
- **Search API**: Custom API with web search integration
- **4 Skill Categories**: Languages, Frontend, Backend, Coding Schools/Platforms
- **25 Results per Category**: As specified in requirements
- **Contact Page**: Company information with clickable links
- **Testing**: Basic test coverage included
- **Free Hosting**: Multiple deployment options provided
- **📊 Analytics**: Google Analytics integration for user activity tracking

## 🛠 Tech Stack

- **Frontend**: React 18, React Router, Socket.io Client
- **Backend**: Node.js, Express, Socket.io
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt
- **Search**: DuckDuckGo API (free, no API key required)
- **Deployment**: Docker & Docker Compose
- **Styling**: Custom CSS with modern design principles

## 🚀 Quick Start

### **Prerequisites**
- Docker and Docker Compose
- Node.js 18+ (for local development)
- Git

### **Installation**
```bash
# Clone the repository
git clone <your-repo-url>
cd KaliShare

# Start the application
docker-compose up -d

# Access the app
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
```

### **Development**
```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Run tests
cd backend && npm test
cd ../frontend && npm test

# Run locally
cd backend && npm run dev
cd ../frontend && npm start
```

## 🔄 CI/CD Pipeline

The app includes comprehensive GitHub Actions workflows for automated testing, building, and deployment:

### **Workflows**:
- **CI/CD Pipeline** (`ci-cd.yml`): Full testing and deployment pipeline
- **Code Quality** (`code-quality.yml`): Linting and validation checks
- **Deploy** (`deploy.yml`): Environment-specific deployments

### **Features**:
- ✅ Automated testing (backend + frontend)
- ✅ Security vulnerability scanning
- ✅ Docker container validation
- ✅ Multi-environment deployment
- ✅ Health checks and notifications

### **Setup**:
1. Add repository secrets (see `GITHUB_WORKFLOWS.md`)
2. Configure branch protection rules
3. Set up environment protection for production

For detailed workflow documentation, see [GITHUB_WORKFLOWS.md](GITHUB_WORKFLOWS.md).

## 📁 Project Structure

```
KaliShare/
├── docker-compose.yml          # Docker orchestration
├── frontend/                   # React application
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── components/         # React components
│       ├── App.js             # Main app component
│       └── index.js           # Entry point
├── backend/                    # Node.js API
│   ├── Dockerfile
│   ├── package.json
│   ├── server.js              # Express server
│   ├── database/              # Database configuration
│   ├── routes/                # API routes
│   └── tests/                 # Test files
├── DEPLOYMENT.md              # Deployment guide
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Timeline
- `GET /api/timeline/posts` - Get all posts with comments
- `POST /api/timeline/posts` - Create new post
- `POST /api/timeline/posts/:id/comments` - Add comment to post

### Search
- `GET /api/search/categories` - Get all skill categories
- `GET /api/search/category/:category` - Search by category
- `GET /api/search/keyword` - Search by keyword

### System
- `GET /api/health` - Health check
- `GET /api` - API information

## 🎯 Features in Detail

### Home Page
- Displays educational resources organized by 4 categories:
  - **Languages** (JavaScript, Python, Java, C++, Ruby, PHP, Swift, Kotlin, TypeScript, Go)
  - **Frontend** (React, Vue, Angular, HTML/CSS, Bootstrap, Sass, Webpack, Next.js, Tailwind)
  - **Backend** (Node.js, Express, Django, Flask, Spring Boot, Laravel, FastAPI, ASP.NET, GraphQL, REST)
  - **Coding Schools/Platforms** (Coursera, edX, Udemy, freeCodeCamp, Codecademy, The Odin Project, MDN, W3Schools)

### Timeline
- Real-time posts and comments using Socket.io
- Text-only posts with user attribution and avatars
- **🎥 Livestream Integration**: Embed YouTube Live, Twitch, Zoom, and Google Meet streams
- Live updates when new content is added
- Professional card-based layout with hover effects

### Livestream Feature
- **Supported Platforms**: YouTube Live, Twitch, Zoom, Google Meet
- **Easy Integration**: Simply paste a livestream URL when creating a post
- **Automatic Embedding**: Streams are automatically embedded in the timeline
- **URL Validation**: Backend validates URLs to ensure they're from supported platforms
- **Real-time Display**: Livestreams appear with a special indicator and embedded player
- **Free to Use**: No additional costs - uses the streaming platform's free tiers

### Search
- Search by keyword across all resources
- Filter by skill category
- Returns 25 results per category
- Integration with DuckDuckGo web search API
- Caching for improved performance
- Rate limiting to prevent abuse

### Contact Page
- Company information for Kali Consulting LLC
- Clickable email (opens Gmail) and phone (initiates call)
- Professional contact details and business hours

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🌐 **Deployment Options**

### **🚀 Recommended: Render (Free)**
- **Perfect for KaliShare**: Node.js + PostgreSQL + React support
- **Free Tier**: Web services, database, and static sites
- **Easy Setup**: Automatic deployments from GitHub
- **Global CDN**: Fast loading worldwide

**Quick Deploy:**
1. Fork this repository
2. Sign up at [render.com](https://render.com)
3. Follow the [Render Deployment Guide](RENDER_DEPLOYMENT.md)

### **🚂 Railway (Docker-based, Free)**
- **Docker Support**: Uses your existing docker-compose.yml
- **Free Tier**: $5/month credit available
- **Local Development**: Use Docker Desktop for development
- **Cloud Deployment**: Railway handles production builds

**Quick Deploy:**
1. Fork this repository
2. Sign up at [railway.app](https://railway.app)
3. Follow the [Railway Deployment Guide](RAILWAY_DEPLOYMENT.md)

### **Other Free Options**
- **Vercel**: Frontend hosting with serverless functions
- **Heroku**: Traditional hosting (limited free tier)

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📊 Performance Features

- **Caching**: 30-minute cache for search results
- **Rate Limiting**: 30 searches per 5 minutes
- **Error Handling**: Comprehensive error responses
- **Security**: JWT authentication, CORS, Helmet
- **Real-time**: Socket.io for live updates

## 🎨 UI/UX Highlights

- **Modern Design**: Clean, professional interface
- **Responsive**: Works on all device sizes
- **Hover Effects**: Subtle animations and feedback
- **Loading States**: Clear user feedback
- **Error Handling**: User-friendly error messages
- **Accessibility**: Proper contrast and navigation
- **🎨 Visual Enhancements**: 
  - **Technology Icons**: JavaScript, Python, React, Node.js, and 20+ other technologies with authentic brand colors
  - **Platform Icons**: YouTube, Twitch, Zoom, Google Meet, and external link indicators
  - **Popularity Badges**: Fire, star, and rocket icons for top-rated resources
  - **Category Icons**: Visual indicators for Languages, Frontend, Backend, and Platforms
  - **Enhanced Cards**: Improved spacing, hover effects, and visual hierarchy
  - **Quick Search Buttons**: Icon-enhanced category filtering for faster navigation

## 🔧 Development

### Running in Development Mode
```bash
# Frontend development
cd frontend
npm install
npm start

# Backend development
cd backend
npm install
npm run dev
```

### Database Management
The PostgreSQL database is automatically initialized with the required tables:
- `users` - User accounts and authentication
- `posts` - Timeline posts
- `comments` - Post comments

## 📈 Future Enhancements

- Google Custom Search API integration
- User profiles and avatars
- File uploads for posts
- Advanced search filters
- Email notifications
- Mobile app

## 🤝 Contributing

This is a coding bootcamp project demonstrating:
- Modern React patterns
- RESTful API design
- Real-time communication
- Docker containerization
- Professional UI/UX design

## 📄 License

This project is created for educational purposes as part of a coding bootcamp curriculum.

## 📞 Contact

**Kali Consulting LLC**
- Email: DevyRuxpin@gmail.com
- Phone: 401-309-5655
- Business Hours: Monday - Friday, 9:00 AM - 6:00 PM EST

---

## 🎉 Project Completion Status

**✅ ALL REQUIREMENTS MET:**
- [x] User authentication (signup/login)
- [x] Navigation: Home, Timeline, Search, Contact Us
- [x] Educational resources listing (25 per category)
- [x] Real-time timeline with posts/comments
- [x] Custom search API with web integration
- [x] 4 skill categories with search functionality
- [x] Contact page with company information
- [x] Professional, modern UI/UX
- [x] Docker deployment
- [x] Free hosting options identified
- [x] Testing included
- [x] **🎥 Livestream Integration** (Bonus Feature!)
- [x] **📊 Analytics**: Google Analytics integration for user activity tracking
- [x] **🎨 UI Enhancements**: Technology icons, platform indicators, popularity badges, and enhanced visual design

**The application is ready for submission and deployment! 🚀** 