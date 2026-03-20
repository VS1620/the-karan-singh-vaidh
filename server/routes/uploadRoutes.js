const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// Storage — Local Disk (works on cPanel, VPS, local dev)
//
// ⚠️  RENDER FREE TIER WARNING:
//     Render's filesystem is ephemeral — files in uploads/ are deleted
//     on every restart/redeploy. If you are on Render free tier, images
//     uploaded via admin panel will disappear after a restart.
//
//     Solutions:
//      1. Upgrade to Render Starter ($7/mo) and enable Disk in render.yaml
//      2. Use a free external storage service (Imagekit, Supabase, etc.)
//
//     For NOW: local disk is used — existing images committed to the repo
//     will still be served during the server session.
// ─────────────────────────────────────────────────────────────────────────────
const uploadsDir = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadsDir);
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpg|jpeg|png|webp/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) return cb(null, true);
        cb(new Error('Only JPG, JPEG, PNG, and WEBP images are allowed'));
    },
});

// ── POST /api/upload  (single image)  ────────────────────────────────────────
router.post('/', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        }
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded. Use field name "image".' });
        }

        // Return a path relative to backend root e.g.  /uploads/image-1234.png
        const filePath = `/uploads/${req.file.filename}`;
        res.status(200).send(filePath);
    });
});

// ── POST /api/upload/multiple  (up to 10 images)  ────────────────────────────
router.post('/multiple', (req, res) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        }
        if (err) {
            return res.status(400).json({ message: err.message });
        }
        if (!req.files || req.files.length === 0) {
            return res.json([]);
        }

        const paths = req.files.map(file => `/uploads/${file.filename}`);
        res.status(200).json(paths);
    });
});

module.exports = router;
