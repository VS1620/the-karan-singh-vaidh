const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');
const Order = require('../models/Order');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    // Default order status in Order model might be 'Processing'
    const pendingOrders = await Order.countDocuments({ orderStatus: { $in: ['Processing', 'Pending'] } }); // Let's safely check for multiple values.

    // Also include pending appointments
    const Appointment = require('../models/Appointment');
    const pendingAppointments = await Appointment.countDocuments({ status: 'Pending' });

    const orders = await Order.find({ status: 'Completed' });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
        totalProducts,
        totalOrders,
        pendingOrders,
        pendingAppointments,
        totalRevenue
    });
});

module.exports = { getDashboardStats };
