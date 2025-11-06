const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const sequelize = require('./config/database');
const { User, Message } = require('./models');

const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const appointmentRoutes = require('./routes/appointments');
const aiRoutes = require('./routes/ai');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000' }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/ai', aiRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'MindConnect API is running' });
});

const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('user-connected', (userId) => {
    connectedUsers.set(socket.id, userId);
    console.log(`User ${userId} connected`);
  });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', {
      userId: connectedUsers.get(socket.id),
      socketId: socket.id
    });
  });

   socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
  });

  socket.on('send-message', async (data) => {
    const { roomId, content, userId, userName } = data;
    try {
      const message = await Message.create({
        roomId, userId, content, messageType: 'text'
      });
      const messageData = {
        id: message.id,
        content: message.content,
        userId, userName,
        messageType: message.messageType,
        createdAt: message.createdAt
      };