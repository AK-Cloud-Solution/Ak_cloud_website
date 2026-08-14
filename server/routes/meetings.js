const router = require('express').Router();
const Meeting = require('../models/Meeting');
const verify = require('../middleware/verifyToken');

// Generate Minutes (Mock AI)
router.post('/generate', verify, async (req, res) => {
    try {
        const { transcript } = req.body;
        if (!transcript) return res.status(400).json({ message: 'Transcript is required' });

        // Mock AI Logic
        // 1. Summary: Just take the first few sentences.
        // 2. Action Items: Look for lines with "will", "todo", "action", "need to".

        const sentences = transcript.split(/[.!?\n]/).filter(s => s.trim().length > 0);
        const summary = sentences.slice(0, 3).join('. ') + '.';

        const actionKeywords = ['will', 'to do', 'todo', 'action', 'need to', 'should', 'must'];
        const actionItems = sentences.filter(s =>
            actionKeywords.some(keyword => s.toLowerCase().includes(keyword))
        ).map(s => s.trim());

        res.json({
            summary,
            actionItems: actionItems.length > 0 ? actionItems : ['No specific action items detected.']
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Save Meeting
router.post('/', verify, async (req, res) => {
    try {
        const { title, transcript, summary, actionItems } = req.body;

        const meeting = new Meeting({
            title,
            transcript,
            summary,
            actionItems,
            user: req.user.id
        });

        const savedMeeting = await meeting.save();
        res.json(savedMeeting);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Meetings
router.get('/', verify, async (req, res) => {
    try {
        const meetings = await Meeting.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(meetings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Meeting
router.delete('/:id', verify, async (req, res) => {
    try {
        const meeting = await Meeting.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });
        res.json({ message: 'Meeting deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
