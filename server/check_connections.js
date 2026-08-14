require('dotenv').config();
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

async function checkConnections() {
    console.log('CHECKING SYSTEM CONNECTIONS...');

    // 1. Check MongoDB Connection
    console.log('1. Testing MongoDB Connection...');
    console.log(`   URI: ${process.env.MONGO_URI?.split('@')[1] || 'Hidden/Local'}`); // Hide credentials

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('   MONGODB CONNECTED SUCCESSFULLY!');
    } catch (err) {
        console.log('   MONGODB CONNECTION FAILED');
        console.log('   Error:', err.message);
        if (err.message.includes('bad auth')) {
            console.log('   Tip: Check your database username and password in .env');
        }
    }

    console.log('--------------------------------------------------');

    // 2. Check Email Configuration
    console.log('2. Testing Email Configuration...');
    console.log(`   User: ${process.env.EMAIL_USER}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log('   EMAIL SERVER IS READY!');
    } catch (err) {
        console.log('   EMAIL CONFIGURATION FAILED');
        console.log('   Error:', err.message);
        if (err.code === 'EAUTH') {
            console.log('   Tip: For Gmail, you MUST use an "App Password", not your login password.');
            console.log('   Tip: Make sure 2-Step Verification is enabled.');
        }
    }

    console.log('--------------------------------------------------');
    process.exit();
}

checkConnections();
