const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true, default: 'main' },
    content: { type: mongoose.Schema.Types.Mixed, required: true },
    updatedAt: { type: Date, default: Date.now }
}, { minimize: false });

module.exports = mongoose.model('SiteContent', siteContentSchema);
