const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/portfolio_anjan')
.then(() => console.log('MongoDB Connected Successfully! ✅'))
.catch((err) => console.log('MongoDB Connection Error: ❌', err));


// --- ১. ডেটাবেস স্কিমা (Schema) এবং মডেল তৈরি ---
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);


// --- ২. API Routes (লজিক) ---

// রুট ১: কন্টাক্ট ফর্ম থেকে ডেটা রিসিভ করে সেভ করা (POST request)
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const newContact = new Contact({ name, email, message });
        await newContact.save();
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error. Failed to send message." });
    }
});

// রুট ২: ড্যাশবোর্ডে দেখানোর জন্য ডেটাবেস থেকে সব মেসেজ আনা (GET request)
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ date: -1 }); // নতুন মেসেজ আগে আসবে
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch messages." });
    }
});


// Test Route
app.get('/', (req, res) => {
    res.send('Anjan Portfolio Backend Server is Running!');
});

// সার্ভার চালু করা
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});