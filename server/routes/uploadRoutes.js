const path = require('path');
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'the-karan-singh-vaidh/products',
        allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        public_id: (req, file) => `${file.fieldname}-${Date.now()}`,
    },
});

const upload = multer({ storage });

router.post('/', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: (err instanceof multer.MulterError) ? `Multer error: ${err.message}` : (err.message || err)
            });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded or incorrect field name. Use "image".' });
        }

        try {
            // Cloudinary returns the full URL in path or secure_url
            // We use the full URL directly as it's persistent across environments
            const finalPath = req.file.path || req.file.secure_url;
            res.send(finalPath);
        } catch (error) {
            console.error('Path construction error:', error);
            res.status(500).json({ message: 'Error processing file path' });
        }
    });
});

router.post('/multiple', (req, res) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err) {
            return res.status(400).json({
                message: (err instanceof multer.MulterError) ? `Multer error: ${err.message}` : (err.message || err)
            });
        }

        if (!req.files || req.files.length === 0) {
            return res.json([]);
        }

        try {
            const paths = req.files.map(file => file.path || file.secure_url);
            res.json(paths);
        } catch (error) {
            console.error('Multiple path construction error:', error);
            res.status(500).json({ message: 'Error processing file paths' });
        }
    });
});

module.exports = router;
