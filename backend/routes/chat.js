const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

router.get('/rooms', authMiddleware, chatController.getChatRooms);
router.post('/rooms', authMiddleware, chatController.createChatRoom);
router.get('/rooms/:roomId/messages', authMiddleware, chatController.getRoomMessages);
router.post('/messages', authMiddleware, chatController.saveMessage);

module.exports = router;
