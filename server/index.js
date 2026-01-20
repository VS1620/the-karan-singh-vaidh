const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    })
);
app.use(morgan('dev'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Static folder for uploads
const uploadsPath = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(uploadsPath));

// Ensure uploads directory exists
const fs = require('fs');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'The Karan Singh Vaidh API is running...' });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Database Connection
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/karansinghvaidh';
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error('Server is running without Database Connection. Some features may fail.');
    }
};

// Start Server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
// Force restart: Removed Price Field Schema Update
