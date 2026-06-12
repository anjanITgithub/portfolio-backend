import React, { useState } from 'react';

function AdminModal({ isOpen, closeAdmin, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // ডেমো লগইন চেক 
    if (username === 'anjanmukherjee' && password === 'Matarani@98') {
        onLoginSuccess(); // লগইন সফল হলে App.js-কে জানাবে
        setUsername('');
        setPassword('');
    } else {
        alert('ভুল ইউজারনেম বা পাসওয়ার্ড!');
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