const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = asyncHandler(async (req, res) => {
    console.log('--- NEW APPOINTMENT REQUEST ---');
    console.log('Request Body:', req.body);

    const { name, phone, email, concern, preferredDate, preferredTime } = req.body;

    // Clean up empty strings for optional fields
    const appointmentData = {
        name,
        phone,
        email: email || undefined,
        concern,
        preferredDate: preferredDate || null,
        preferredTime
    };

    console.log('Data to Save:', appointmentData);

    const appointment = await Appointment.create(appointmentData);

    console.log('✅ Appointment Created:', appointment._id);

    res.status(201).json({
        success: true,
        message: 'Appointment request submitted successfully',
        data: appointment
    });
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAllAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({}).sort({ createdAt: -1 });
    res.json(appointments);
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private/Admin
const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
        appointment.status = req.body.status || appointment.status;
        const updatedAppointment = await appointment.save();
        res.json(updatedAppointment);
    } else {
        res.status(404);
        throw new Error('Appointment not found');
    }
});

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = asyncHandler(async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment) {
        await appointment.deleteOne();
        res.json({ message: 'Appointment removed' });
    } else {
        res.status(404);
        throw new Error('Appointment not found');
    }
});

module.exports = {
    createAppointment,
    getAllAppointments,
    updateAppointmentStatus,
    deleteAppointment
};
