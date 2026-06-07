const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// .env ফাইল কনফিগারেশন
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // ফ্রন্ট-এন্ড থেকে ডেটা রিসিভ করার জন্য
app.use(express.json());

// MongoDB ডেটাবেস কানেকশন
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch((err) => console.log('❌ MongoDB Connection Error:', err));

// ---------------------------------------------------
// 1. Message Schema (MongoDB তে ডেটা কীভাবে সেভ হবে)
// ---------------------------------------------------
const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

// ---------------------------------------------------
// 2. Public API: কন্টাক্ট ফর্মের মেসেজ ডেটাবেসে সেভ করা
// ---------------------------------------------------
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: 'Message saved to database!' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

// ---------------------------------------------------
// 3. Admin API: লগইন চেক করা এবং টোকেন দেওয়া
// ---------------------------------------------------
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;

    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        // সঠিক হলে JWT টোকেন তৈরি করা হবে
        const token = jwt.sign({ id: username }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.status(200).json({ success: true, token: token, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid Admin credentials' });
    }
});

// ---------------------------------------------------
// 4. Secure API: ডেটাবেস থেকে সব মেসেজ তুলে আনা (টোকেন ছাড়া কেউ দেখতে পাবে না)
// ---------------------------------------------------
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ success: false, message: 'Access Denied! No token.' });

    const actualToken = token.split(" ")[1];

    jwt.verify(actualToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: 'Invalid Token' });
        req.adminId = decoded.id;
        next();
    });
};

app.get('/api/admin/messages', verifyToken, async (req, res) => {
    try {
        const messages = await Message.find().sort({ date: -1 }); // নতুন মেসেজ প্রথমে আসবে
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching messages.' });
    }
});

// সার্ভার স্টার্ট করা
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});