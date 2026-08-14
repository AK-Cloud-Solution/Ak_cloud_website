const router = require('express').Router();
const Project = require('../models/Project');
const verify = require('../middleware/verifyToken');

// Create Project
router.post('/', verify, async (req, res) => {
    try {
        const project = new Project({
            name: req.body.name,
            description: req.body.description,
            user: req.user.id
        });

        const savedProject = await project.save();
        res.json(savedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get All Projects for User
router.get('/', verify, async (req, res) => {
    try {
        const projects = await Project.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Project
router.delete('/:id', verify, async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
