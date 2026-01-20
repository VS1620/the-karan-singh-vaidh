const asyncHandler = require('express-async-handler');
const Product = require('../models/ProductModel');
const Order = require('../models/Order');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: 'Pending' });

    const orders = await Order.find({ status: 'Completed' });
    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.json({
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue
    });
});

module.exports = { getDashboardStats };
