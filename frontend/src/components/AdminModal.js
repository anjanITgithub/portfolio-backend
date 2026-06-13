import React, { useState } from 'react';

function AdminModal({ isOpen, closeAdmin, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // তোমার আগের ভুল লিংকটি যদি '/api/admin/login' হয়, তবে তা বদলে এটা করো:
const response = await fetch('https://portfolio-backend-ruio.onrender.com/api/login', {;
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(); // লগইন সফল হলে ড্যাশবোর্ড দেখাবে
        setUsername('');
        setPassword('');
      } else {
        alert(data.message || 'ভুল ইউজারনেম বা পাসওয়ার্ড!');
      }
    } catch (error) {
      alert('সার্ভারে সমস্যা হচ্ছে, একটু পর আবার চেষ্টা করো!');
      console.error("Login Error:", error);
    }
  };

  return (
    <div id="adminModal" className="modal" style={{ display: 'flex' }}>
        <div className="modal-content">
            <span className="close-btn" onClick={closeAdmin}>&times;</span>
            <h2>Admin Login</h2>
            <form id="adminForm" onSubmit={handleLogin}>
                <input 
                  type="text" 
                  placeholder="Username" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button type="submit" className="btn primary-btn">Login</button>
            </form>
        </div>
    </div>
  );
}

export default AdminModal;