const { ChatRoom, Message, User, Therapist } = require('../models');

exports.getChatRooms = async (req, res) => {
  try {
    const rooms = await ChatRoom.findAll({
      where: { isActive: true },
      include: [{ model: Therapist, as: 'moderator', include: [User] }],
      order: [['createdAt', 'DESC']]
    });
    res.json({ rooms });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
};

exports.createChatRoom = async (req, res) => {
  try {
    const { roomName, topic, description } = req.body;
    const user = await User.findByPk(req.userId);
    if (user.userType !== 'therapist') {
      return res.status(403).json({ error: 'Only therapists can create rooms' });
    }
    const therapist = await Therapist.findOne({ where: { userId: req.userId } });
    const room = await ChatRoom.create({ roomName, topic, description, moderatorId: therapist.id });
    res.status(201).json({ message: 'Chat room created successfully', room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create chat room' });
  }
};

exports.getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    const messages = await Message.findAll({
      where: { roomId },
      include: [{ model: User, attributes: ['id', 'name', 'userType'] }],
      order: [['createdAt', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
    res.json({ messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

exports.saveMessage = async (req, res) => {
  try {
    const { roomId, content, messageType } = req.body;
    const message = await Message.create({
      roomId, userId: req.userId, content, messageType: messageType || 'text'
    });
    const messageWithUser = await Message.findByPk(message.id, {
      include: [{ model: User, attributes: ['id', 'name', 'userType'] }]
    });
    res.status(201).json({ message: 'Message saved successfully', data: messageWithUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message' });
  }
};
