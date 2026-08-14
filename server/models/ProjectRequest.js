const mongoose = require('mongoose');

const projectRequestSchema = new mongoose.Schema({
  requestType: { type: String, enum: ['demo', 'project'], required: true },
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 180 },
  company: { type: String, required: true, trim: true, maxlength: 180 },
  message: { type: String, required: true, trim: true, maxlength: 4000 },
  status: { type: String, enum: ['new', 'contacted', 'qualified', 'closed'], default: 'new' },
  source: { type: String, default: 'website' },
}, { timestamps: true });

module.exports = mongoose.model('ProjectRequest', projectRequestSchema);
