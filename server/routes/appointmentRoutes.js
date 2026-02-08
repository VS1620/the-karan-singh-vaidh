const express = require('express');
const router = express.Router();
console.log('--- Appointment Routes File Executing ---');
const {
    createAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
} = require('../controllers/appointmentController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(createAppointment)
    .get(protect, admin, getAllAppointments);

router.route('/:id')
    .put(protect, admin, updateAppointmentStatus)
    .delete(protect, admin, deleteAppointment);

module.exports = router;
