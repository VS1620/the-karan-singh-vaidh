const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const otpRoutes = require('./routes/otpRoutes');
const shipmentRoutes = require('./routes/shipmentRoutes');
const imageKitRoutes = require('./routes/imageKitRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
app.use(compression());
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:3000',
    // cPanel live domain (with and without port)
    'https://thekaransinghvaidh.com',
    'https://www.thekaransinghvaidh.com',
    'https://thekaransinghvaidh.com:5000',
    'https://www.thekaransinghvaidh.com:5000',
    // Subdomain backend option
    'https://api.thekaransinghvaidh.com',
    // Old Render deployment
    'https://the-karan-singh-vaidh.onrender.com'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(
    helmet({
        crossOriginResourcePolicy: false,
        crossOriginEmbedderPolicy: false,
    })
);
app.use(morgan('dev'));

// Ensure uploads directory exists
const fs = require('fs');
const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
    console.log('✅ Created uploads directory');
}

// ── Serve uploaded images ─────────────────────────────────────────────────────
// Accessible at: https://the-karan-singh-vaidh.onrender.com/uploads/<filename>
app.use('/uploads',
    // Set permissive CORS so any frontend origin can load images
    (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type');
        res.header('Cross-Origin-Resource-Policy', 'cross-origin');
        res.header('Vary', 'Origin');
        if (req.method === 'OPTIONS') return res.sendStatus(200);
        next();
    },
    express.static(uploadsPath, {
        maxAge: '1y',
        etag: true,
        lastModified: true,
        setHeaders: (res) => {
            res.set('Cache-Control', 'public, max-age=31536000, immutable');
        },
        fallthrough: false
    }),
    // 404 handler for missing images — return JSON, not HTML
    (err, req, res, next) => {
        if (err.status === 404 || err.statusCode === 404) {
            return res.status(404).json({ message: `Image not found: ${req.path}` });
        }
        next(err);
    }
);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/otp', otpRoutes);
app.use('/api/shipment', shipmentRoutes);
app.use('/api/imagekit', imageKitRoutes);

// ── Specific Requested Routes (Aliases) ──────────────────────────────────────
app.post('/api/create-order', (req, res, next) => { req.url = '/'; next(); }, orderRoutes);
app.post('/api/verify-payment', (req, res, next) => { req.url = '/verify'; next(); }, paymentRoutes);
app.post('/api/create-shipment', (req, res, next) => { req.url = '/create'; next(); }, shipmentRoutes);

console.log('✅ ALL Server Routes (Users, Products, Orders, OTP, Shipment, etc.) loaded');
console.log('🚀 DEPLOYMENT TIMESTAMP: ' + new Date().toLocaleString());

// Confirm route registration
console.log('✅ Server routes initialized successfully');

// Routes
app.get('/api/diag', (req, res) => {
    try {
        const fs = require('fs');
        const path = require('path');
        const uploadDir = path.join(__dirname, 'uploads');
        res.json({
            dirname: __dirname,
            uploadDirExists: fs.existsSync(uploadDir),
            files: fs.existsSync(uploadDir) ? fs.readdirSync(uploadDir) : []
        });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'The Karan Singh  Vaidh API is running [v1.2.3]...' });
});

app.get('/api/version', (req, res) => {
    res.json({
        version: '1.3.1',
        deployedAt: new Date().toLocaleString(),
        status: 'Complete Shiprocket Automation Implemented',
        database: mongoose.connection.name
    });
});

app.get('/api/diagnose', (req, res) => {
    const Product = require('./models/ProductModel');
    const paths = [];
    Product.schema.eachPath((path, type) => {
        paths.push({ path, instance: type.instance });
    });
    res.json({
        paths,
        mongooseVersion: require('mongoose').version,
        nodeVersion: process.version,
        now: new Date().toLocaleString()
    });
});

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Database Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        console.log('Connecting to MongoDB Atlas...');
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        // Don't exit immediately - server can still respond to health checks
        console.error('Server will continue running but database operations will fail');
    }
};

// Start Server FIRST (so Render detects the port)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`🚀 DEPLOYMENT TIMESTAMP: ${new Date().toLocaleString()}`);
    console.log('✅ Local disk storage is configured for uploads');

    // Connect to database AFTER server is listening
    connectDB();

    // Keep Alive Logic for Render Free Tier (ping every 14 minutes)
    const url = process.env.RENDER_EXTERNAL_URL || 'https://the-karan-singh-vaidh.onrender.com';
    if (url) {
        setInterval(() => {
            const https = require('https');
            https.get(url, (res) => {
                console.log(`[Keep-Alive] Self-ping to ${url} status: ${res.statusCode}`);
            }).on('error', (err) => {
                console.error(`[Keep-Alive] Self-ping error: ${err.message}`);
            });
        }, 840000); // 14 minutes
        console.log(`✅ Keep-alive mechanism started for: ${url}`);
    }
});
