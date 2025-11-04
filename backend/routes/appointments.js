const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/auth');

router.get('/therapists', authMiddleware, appointmentController.getTherapists);
router.post('/', authMiddleware, appointmentController.createAppointment);
router.get('/user', authMiddleware, appointmentController.getUserAppointments);
router.get('/therapist', authMiddleware, appointmentController.getTherapistAppointments);
router.put('/:appointmentId', authMiddleware, appointmentController.updateAppointmentStatus);

module.exports = router;
