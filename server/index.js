const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/files', require('./routes/files'));
app.use('/api/meetings', require('./routes/meetings'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/content', require('./routes/content'));
app.use('/api/requests', require('./routes/requests'));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/akcloud')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Basic Route
app.get('/', (req, res) => {
    res.send('AK Cloud Backend is running');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
