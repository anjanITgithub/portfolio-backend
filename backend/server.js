const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// MongoDB Connection
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_anjan';

mongoose.connect(dbURI)
.then(() => console.log('MongoDB Connected Successfully! ✅'))
.catch((err) => console.log('MongoDB Connection Error: ❌', err));


// --- ১. ডেটাবেস স্কিমা (Schema) এবং মডেল ---
const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

const Contact = mongoose.model('Contact', contactSchema);


// --- ২. API Routes ---

// রুট: কন্টাক্ট ফর্ম থেকে মেসেজ সেভ করা
app.post('/api/contact', async (req, res) => {
    try {
        const newMessage = new Contact(req.body);
        await newMessage.save();
        res.status(200).json({ success: true, message: "Message saved successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// রুট: অ্যাডমিন লগইন লজিক
app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // চেক করা হচ্ছে এনভায়রনমেন্ট ভেরিয়েবলের সাথে
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            res.status(200).json({ success: true, message: "Login Successful!" });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials!" });
        }
        
    } catch (error) {
        console.error("Login Server Error:", error); 
        res.status(500).json({ success: false, message: "Server error during login" });
    }
});

// রুট: ড্যাশবোর্ডে মেসেজগুলো দেখানো
app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ date: -1 });
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} 🚀`);
});