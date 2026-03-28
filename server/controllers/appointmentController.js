const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = asyncHandler(async (req, res) => {
    console.log('--- NEW APPOINTMENT REQUEST ---');
    console.log('Request Body:', req.body);

    const { 
        name, phone, email, service, concern, preferredDate, preferredTime,
        razorpay_order_id, razorpay_payment_id, razorpay_signature 
    } = req.body;

    // Verify Payment Signature if payment details are provided
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
        const body = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            res.status(400);
            throw new Error('Invalid payment signature');
        }
    } else {
        res.status(400);
        throw new Error('Payment details are required');
    }

    // Clean up empty strings for optional fields
    const appointmentData = {
        name,
        phone,
        email: email || undefined,
        service,
        concern,
        preferredDate: preferredDate || null,
        preferredTime,
        status: 'Pending',
        paymentStatus: 'Completed',
        paymentId: razorpay_payment_id
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

// @desc    Create Razorpay order for appointment (600 INR)
// @route   POST /api/appointments/create-payment
// @access  Public
const createPaymentOrder = asyncHandler(async (req, res) => {
    const options = {
        amount: 600 * 100, // 600 INR in paise
        currency: 'INR',
        receipt: `appt_rcpt_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(201).json(order);
    } catch (error) {
        console.error('❌ Razorpay Appointment Order Error:', error);
        res.status(500);
        throw new Error('Razorpay order creation failed');
    }
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
    deleteAppointment,
    createPaymentOrder
};
