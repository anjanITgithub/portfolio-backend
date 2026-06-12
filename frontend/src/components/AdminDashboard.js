import React, { useState, useEffect } from 'react';

function AdminDashboard({ isOpen, closeDashboard }) {
  const [messages, setMessages] = useState([]);

  // ড্যাশবোর্ড ওপেন হলেই ব্যাকএন্ড থেকে ডেটা আনবে
  useEffect(() => {
    if (isOpen) {
      fetch('https://portfolio-backend-ruio.onrender.com/api/messages')
        .then(res => res.json())
        .then(data => setMessages(data))
        .catch(err => console.error("Error fetching messages:", err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="adminDashboard" className="modal" style={{ display: 'flex' }}>
        <div className="modal-content dashboard-content">
            <span className="close-btn" onClick={closeDashboard}>&times;</span>
            <h2>User Responses</h2>
            <p className="dashboard-subtitle">-- All messages from the contact me section --</p>
            <button className="btn primary-btn logout-btn" onClick={closeDashboard}>Logout</button>
            
            <div id="messagesContainer" className="messages-container">
                {messages.length === 0 ? <p>No messages yet.</p> : null}
                
                {/* ডেটাবেস থেকে আসা মেসেজগুলো লুপ করে দেখানো হচ্ছে */}
                {messages.map((msg, index) => (
                    <div key={index} className="message-card">
                        <h4>Name: {msg.name}</h4>
                        <p><strong>Email:</strong> {msg.email}</p>
                        <p><strong>Message:</strong> {msg.message}</p>
                        <small>Date: {new Date(msg.date).toLocaleString()}</small>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default AdminDashboard;