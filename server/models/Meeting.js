const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: 'Untitled Meeting'
    },
    date: {
        type: Date,
        default: Date.now
    },
    transcript: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    actionItems: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meeting', meetingSchema);
