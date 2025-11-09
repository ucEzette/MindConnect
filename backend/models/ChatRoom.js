const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Therapist = require('./Therapist');

const ChatRoom = sequelize.define('ChatRoom', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  roomName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  moderatorId: {
    type: DataTypes.UUID,
    references: {
      model: Therapist,
      key: 'id'
    }
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  maxParticipants: {
    type: DataTypes.INTEGER,
    defaultValue: 50
  }
}, {
  timestamps: true,
  tableName: 'chat_rooms'
});

ChatRoom.belongsTo(Therapist, { foreignKey: 'moderatorId', as: 'moderator' });

module.exports = ChatRoom;
