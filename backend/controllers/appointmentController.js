const { Appointment, User, Therapist } = require('../models');

exports.getTherapists = async (req, res) => {
  try {
    const therapists = await Therapist.findAll({
      where: { verificationStatus: 'verified' },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json({ therapists });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch therapists' });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    const { therapistId, appointmentDate, duration } = req.body;
    if (!therapistId || !appointmentDate) {
      return res.status(400).json({ error: 'Therapist ID and appointment date are required' });
    }
    const appointment = await Appointment.create({
      therapistId, clientId: req.userId, appointmentDate, duration: duration || 60, status: 'scheduled'
    });
    res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { clientId: req.userId },
      include: [{ model: Therapist, include: [User] }],
      order: [['appointmentDate', 'ASC']]
    });
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

exports.getTherapistAppointments = async (req, res) => {
  try {
    const therapist = await Therapist.findOne({ where: { userId: req.userId } });
    if (!therapist) {
      return res.status(404).json({ error: 'Therapist profile not found' });
    }
    const appointments = await Appointment.findAll({
      where: { therapistId: therapist.id },
      include: [{ model: User, as: 'client', attributes: ['id', 'name', 'email'] }],
      order: [['appointmentDate', 'ASC']]
    });
    res.json({ appointments });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status, notes } = req.body;
    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    await appointment.update({ status: status || appointment.status, notes: notes || appointment.notes });
    res.json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};
