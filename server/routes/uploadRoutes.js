const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs');

// ─────────────────────────────────────────────────────────────────────────────
// Local Disk Storage — Images saved permanently in server's uploads/ folder
// ─────────────────────────────────────────────────────────────────────────────
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Ensure the directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, uploadsDir);
    },
    filename(req, file, cb) {
        // Clean filename: timestamp-original.ext
        const ext = path.extname(file.originalname).toLowerCase();
        const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
        cb(null, `${cleanName}-${Date.now()}${ext}`);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpg|jpeg|png|webp/;
        const ext = allowed.test(path.extname(file.originalname).toLowerCase());
        const mime = allowed.test(file.mimetype);
        if (ext && mime) return cb(null, true);
        cb(new Error('Only JPG, JPEG, PNG, and WEBP images are allowed'));
    },
});

// Helper: Normalize path to /uploads/filename
const cleanUrl = (filePath) => {
    const normalized = filePath.replace(/\\/g, '/');
    return normalized.startsWith('/') ? normalized : `/${normalized}`;
};

// ── POST /api/upload  (single image)  ────────────────────────────────────────
router.post('/', (req, res) => {
    upload.single('image')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Return the path like: /uploads/image-123.png
        const filePath = cleanUrl(`uploads/${req.file.filename}`);
        res.status(200).send(filePath);
    });
});

// ── POST /api/upload/multiple  (up to 10 images)  ────────────────────────────
router.post('/multiple', (req, res) => {
    upload.array('images', 10)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ message: `Upload error: ${err.message}` });
        }
        if (!req.files || req.files.length === 0) {
            return res.json([]);
        }

        const paths = req.files.map(file => cleanUrl(`uploads/${file.filename}`));
        res.status(200).json(paths);
    });
});

module.exports = router;
