const router = require('express').Router();
const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const SiteContent = require('../models/SiteContent');
const defaultContent = require('../defaultContent');

const fallbackDirectory = path.join(__dirname, '../data');
const fallbackPath = path.join(fallbackDirectory, 'site-content.json');

async function readFallbackContent() {
    try {
        return JSON.parse(await fs.readFile(fallbackPath, 'utf8'));
    } catch (error) {
        if (error.code !== 'ENOENT') console.error('Unable to read fallback content:', error);
        return defaultContent;
    }
}

async function writeFallbackContent(content) {
    await fs.mkdir(fallbackDirectory, { recursive: true });
    await fs.writeFile(fallbackPath, JSON.stringify(content, null, 2), 'utf8');
    return content;
}

router.get('/', async (_req, res) => {
    if (mongoose.connection.readyState !== 1) {
        return res.json(await readFallbackContent());
    }

    try {
        const record = await SiteContent.findOne({ key: 'main' }).lean();
        res.json(record?.content || defaultContent);
    } catch (error) {
        console.error('Content database read failed; using fallback:', error);
        res.json(await readFallbackContent());
    }
});

router.put('/', async (req, res) => {
    const configuredKey = process.env.ADMIN_KEY;
    if (!configuredKey) return res.status(503).json({ message: 'ADMIN_KEY is not configured on the server' });
    if (req.header('x-admin-key') !== configuredKey) return res.status(401).json({ message: 'Invalid admin key' });

    const content = req.body;
    if (!content?.hero?.title || !Array.isArray(content.metrics) || !Array.isArray(content.clients)) {
        return res.status(400).json({ message: 'Invalid site content payload' });
    }

    if (mongoose.connection.readyState !== 1) {
        try {
            const saved = await writeFallbackContent(content);
            res.set('x-content-storage', 'file-fallback');
            return res.json(saved);
        } catch (error) {
            return res.status(500).json({ message: 'Unable to save fallback content', error: error.message });
        }
    }

    try {
        const record = await SiteContent.findOneAndUpdate(
            { key: 'main' },
            { content, updatedAt: new Date() },
            { new: true, upsert: true, runValidators: true }
        );
        res.json(record.content);
    } catch (error) {
        console.error('Content database write failed; using fallback:', error);
        try {
            const saved = await writeFallbackContent(content);
            res.set('x-content-storage', 'file-fallback');
            res.json(saved);
        } catch (fallbackError) {
            res.status(500).json({ message: 'Unable to save site content', error: fallbackError.message });
        }
    }
});

module.exports = router;
