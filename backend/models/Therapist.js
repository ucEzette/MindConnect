const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Therapist = sequelize.define('Therapist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  licenseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  specializations: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  bio: {
    type: DataTypes.TEXT
  },
  hourlyRate: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  verificationStatus: {
    type: DataTypes.ENUM('pending', 'verified', 'rejected'),
    defaultValue: 'pending'
  },
  yearsExperience: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  tableName: 'therapists'
});

User.hasOne(Therapist, { foreignKey: 'userId' });
Therapist.belongsTo(User, { foreignKey: 'userId' });

module.exports = Therapist;
