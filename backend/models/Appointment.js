const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Therapist = require('./Therapist');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  therapistId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Therapist,
      key: 'id'
    }
  },
  clientId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'no_show'),
    defaultValue: 'scheduled'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  tableName: 'appointments'
});

Appointment.belongsTo(Therapist, { foreignKey: 'therapistId' });
Appointment.belongsTo(User, { foreignKey: 'clientId', as: 'client' });

module.exports = Appointment;
