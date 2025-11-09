# MindConnect - Mental Health Support Platform

A comprehensive mental health web platform integrating professional therapy, AI assistance, and peer community support.

## 🌟 Features

- **User Authentication**: Secure registration and login with JWT
- **Real-time Chat Rooms**: Community support with Socket.io
- **AI Mental Health Assistant**: OpenAI-powered therapeutic support
- **Therapist Appointments**: Book and manage therapy sessions
- **Crisis Detection**: Automatic detection with emergency resource links
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- OpenAI API Key (for AI assistant)

### Installation

1. **Clone or extract this project**

2. **Set up PostgreSQL database**
```bash
sudo -u postgres psql
CREATE DATABASE mindconnect_db;
\q
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Configure backend environment**
Edit `backend/.env` and add your database credentials and OpenAI API key

5. **Initialize database**
```bash
cd backend
npm run init-db
```

6. **Install frontend dependencies**
```bash
cd frontend
npm install
```

7. **Start the application**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm start
```

8. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Test Credentials

- **User Account**: user@mindconnect.com / password123
- **Therapist Account**: therapist@mindconnect.com / password123

## 📁 Project Structure

```
mindconnect-platform/
├── backend/               # Node.js Express backend
│   ├── config/           # Database configuration
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Auth middleware
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── services/        # Business logic (AI service)
│   ├── scripts/         # Database initialization
│   └── server.js        # Main server file
└── frontend/            # React frontend
    ├── public/          # Static files
    └── src/
        ├── context/     # React context (Auth)
        ├── pages/       # Page components
        └── services/    # API and Socket services

```

## 🔧 Configuration

### Backend (.env)
```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=mindconnect_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

## 🛠️ Technology Stack

### Backend
- Node.js & Express.js
- PostgreSQL & Sequelize ORM
- Socket.io (real-time communication)
- JWT (authentication)
- OpenAI API (AI assistant)
- Helmet & Express Rate Limit (security)

### Frontend
- React 18
- Material-UI (components)
- React Router (routing)
- Axios (HTTP client)
- Socket.io Client (WebSocket)

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile

### Chat
- `GET /api/chat/rooms` - Get all chat rooms
- `POST /api/chat/rooms` - Create room (therapist only)
- `GET /api/chat/rooms/:id/messages` - Get messages
- `POST /api/chat/messages` - Send message

### Appointments
- `GET /api/appointments/therapists` - Get therapists
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/user` - Get user appointments
- `PUT /api/appointments/:id` - Update appointment

### AI
- `POST /api/ai/chat` - Chat with AI assistant

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 req/15min)
- CORS protection
- Helmet.js security headers
- SQL injection prevention (Sequelize ORM)

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL status
sudo service postgresql status

# Restart PostgreSQL
sudo service postgresql restart
```

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

### OpenAI API Errors
Get your API key from https://platform.openai.com/api-keys and add to backend/.env

## 📖 Usage Guide

1. **Register**: Create an account as therapy seeker or therapist
2. **Dashboard**: Access chat rooms, AI assistant, and appointments
3. **Chat Rooms**: Join community discussions for support
4. **AI Assistant**: Get 24/7 mental health support
5. **Book Appointments**: Schedule sessions with therapists

## 🚀 Deployment

### Backend (Heroku)
```bash
heroku create mindconnect-api
heroku addons:create heroku-postgresql
git push heroku main
```

### Frontend (Vercel)
```bash
npm install -g vercel
cd frontend
vercel
```

## 📝 License

MIT License - feel free to use this project for learning or production

## 🤝 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 👥 Team

Mental Health Innovators Team

## 📧 Support

For issues or questions, open an issue on GitHub or contact support.

---

**Note**: This is a educational project. For production use, ensure compliance with healthcare regulations (HIPAA, GDPR) and conduct security audits.
