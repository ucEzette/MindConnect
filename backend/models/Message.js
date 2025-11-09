const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const ChatRoom = require('./ChatRoom');

const Message = sequelize.define('Message', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  roomId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: ChatRoom,
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  messageType: {
    type: DataTypes.ENUM('text', 'system', 'crisis'),
    defaultValue: 'text'
  },
  isFlagged: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  tableName: 'messages'
});

Message.belongsTo(User, { foreignKey: 'userId' });
Message.belongsTo(ChatRoom, { foreignKey: 'roomId' });

module.exports = Message;
