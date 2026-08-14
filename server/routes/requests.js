const router = require('express').Router();
const fs = require('fs/promises');
const path = require('path');
const mongoose = require('mongoose');
const ProjectRequest = require('../models/ProjectRequest');

const fallbackDirectory = path.join(__dirname, '../data');
const fallbackPath = path.join(fallbackDirectory, 'project-requests.json');
const allowedStatuses = new Set(['new', 'contacted', 'qualified', 'closed']);

const hasAdminKey = req => Boolean(process.env.ADMIN_KEY) && req.header('x-admin-key') === process.env.ADMIN_KEY;
async function readFallback() { try { return JSON.parse(await fs.readFile(fallbackPath, 'utf8')); } catch (error) { if (error.code !== 'ENOENT') console.error(error); return []; } }
async function writeFallback(records) { await fs.mkdir(fallbackDirectory, { recursive: true }); await fs.writeFile(fallbackPath, JSON.stringify(records, null, 2)); }

router.post('/', async (req, res) => {
  const { requestType, name, email, company, message } = req.body || {};
  if (!['demo', 'project'].includes(requestType) || !name?.trim() || !company?.trim() || !message?.trim() || !/^\S+@\S+\.\S+$/.test(email || '')) {
    return res.status(400).json({ message: 'Please provide a valid request type, name, work email, company, and message.' });
  }
  const payload = { requestType, name: name.trim(), email: email.trim().toLowerCase(), company: company.trim(), message: message.trim(), status: 'new', source: 'website' };
  try {
    if (mongoose.connection.readyState === 1) return res.status(201).json(await ProjectRequest.create(payload));
    const records = await readFallback();
    const record = { ...payload, _id: `mock-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    await writeFallback([record, ...records]);
    res.set('x-request-storage', 'file-fallback');
    res.status(201).json(record);
  } catch (error) { res.status(500).json({ message: 'Unable to save your request right now.' }); }
});

router.get('/', async (req, res) => {
  if (!hasAdminKey(req)) return res.status(401).json({ message: 'Invalid admin key' });
  try { res.json(mongoose.connection.readyState === 1 ? await ProjectRequest.find().sort({ createdAt: -1 }).lean() : await readFallback()); }
  catch (error) { res.status(500).json({ message: 'Unable to load requests.' }); }
});

router.patch('/:id/status', async (req, res) => {
  if (!hasAdminKey(req)) return res.status(401).json({ message: 'Invalid admin key' });
  if (!allowedStatuses.has(req.body?.status)) return res.status(400).json({ message: 'Invalid request status' });
  try {
    if (mongoose.connection.readyState === 1) return res.json(await ProjectRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }));
    const records = await readFallback(); const index = records.findIndex(item => item._id === req.params.id);
    if (index < 0) return res.status(404).json({ message: 'Request not found' });
    records[index] = { ...records[index], status: req.body.status, updatedAt: new Date().toISOString() }; await writeFallback(records); res.json(records[index]);
  } catch (error) { res.status(500).json({ message: 'Unable to update request.' }); }
});

module.exports = router;
