const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const File = require('../models/File');
const verify = require('../middleware/verifyToken');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Prevent duplicate filenames by appending timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Upload File
router.post('/upload', verify, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = new File({
            filename: req.file.filename,
            originalName: req.file.originalname,
            mimeType: req.file.mimetype,
            size: req.file.size,
            path: req.file.path,
            user: req.user.id,
            project: req.body.projectId || undefined
        });

        const savedFile = await file.save();
        res.json(savedFile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Files for User
router.get('/', verify, async (req, res) => {
    try {
        const query = { user: req.user.id };
        if (req.query.projectId) {
            query.project = req.query.projectId;
        }
        const files = await File.find(query).sort({ createdAt: -1 });
        res.json(files);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete File
router.delete('/:id', verify, async (req, res) => {
    try {
        const file = await File.findOne({ _id: req.params.id, user: req.user.id });
        if (!file) return res.status(404).json({ message: 'File not found' });

        // Delete from filesystem
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        // Delete from DB
        await File.findByIdAndDelete(req.params.id);
        res.json({ message: 'File deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
