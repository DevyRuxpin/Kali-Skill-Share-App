# 🚀 KaliShare - Web Development Skill Sharing Platform

A modern web development skill-sharing platform built with React, Node.js, and PostgreSQL, featuring real-time collaboration, educational resources, and professional UI/UX.

## ✨ **Features**

- 🔐 **User Authentication** - Secure signup/login with JWT
- 📚 **Educational Resources** - 100+ curated web development resources
- ⚡ **Real-time Timeline** - Live posts and comments with Socket.io
- 🔍 **Advanced Search** - Web search integration with DuckDuckGo API
- 🎥 **Livestream Integration** - Embed YouTube, Twitch, Zoom streams
- 📊 **Analytics** - Google Analytics for user activity tracking
- 🐳 **Docker Ready** - Complete containerized deployment
- 🎨 **Modern UI/UX** - Professional design with technology icons

## 🛠 **Tech Stack**

- **Frontend**: React 18, Socket.io Client
- **Backend**: Node.js, Express, Socket.io
- **Database**: PostgreSQL
- **Authentication**: JWT with bcrypt
- **Search**: DuckDuckGo API (free)
- **Deployment**: Docker & Docker Compose
- **Styling**: Custom CSS with modern design

## 🚀 **Quick Start**

### **Local Development**
```bash
# Clone the repository
git clone https://github.com/DevyRuxpin/Kali-Skill-Share-App.git
cd KaliShare

# Start with Docker
docker-compose up -d

# Access the app
# Frontend: http://localhost:3000
# Backend: http://localhost:5001
```

### **Manual Setup**
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (new terminal)
cd frontend && npm install && npm start
```

## 🌐 **Deployment**

### **Free Hosting Options**

- **🚂 Railway** (Recommended) - Docker-based deployment
- **🚀 Render** - Node.js + PostgreSQL support
- **☁️ Vercel** - Frontend hosting
- **🔧 Heroku** - Traditional hosting

**📖 For detailed deployment guides, see [docs/](./docs/)**

## 📁 **Project Structure**

```
KaliShare/
├── docs/                    # 📚 Complete documentation
├── backend/                 # 🖥️ Node.js/Express API
├── frontend/               # ⚛️ React application
├── docker-compose.yml      # 🐳 Local development
├── Dockerfile              # 🐳 Production build
├── Dockerfile.railway      # 🚂 Railway-specific build
└── railway.json           # 🚂 Railway configuration
```

## 📚 **Documentation**

All documentation is organized in the `docs/` folder:

- **[📖 Documentation Index](./docs/README.md)** - Complete documentation overview
- **[🚀 Setup Guide](./docs/SETUP_COMPLETE.md)** - Full setup instructions
- **[🌐 Deployment Guides](./docs/DEPLOYMENT.md)** - Multiple hosting options
- **[🔧 Development Workflows](./docs/GITHUB_WORKFLOWS.md)** - CI/CD pipelines
- **[📊 Analytics Guide](./docs/ANALYTICS_GUIDE.md)** - Google Analytics setup

## 🎯 **API Endpoints**

- **Authentication**: `/api/auth/*`
- **Timeline**: `/api/timeline/*`
- **Search**: `/api/search/*`
- **Health**: `/health`, `/api/health`

## 🧪 **Testing**

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## 🤝 **Contributing**

This is a coding bootcamp project demonstrating modern web development practices.

## 📞 **Contact**

**Kali Consulting LLC**
- Email: DevyRuxpin@gmail.com
- Phone: 401-309-5655
- Business Hours: Monday - Friday, 9:00 AM - 6:00 PM EST

## 📄 **License**

Educational project created for coding bootcamp curriculum.

---

**🎉 Project Status: COMPLETE** - All requirements implemented and ready for deployment!

**📖 For complete documentation, visit [docs/](./docs/)** 