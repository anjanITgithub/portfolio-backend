import React from 'react';

function Navbar({ openAdmin }) { // App.js থেকে openAdmin ফাংশনটা রিসিভ করা হলো
  return (
    <nav className="navbar">
        <div className="logo">AM<span>.</span></div>
        <ul className="nav-links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Competencies</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#education">Education</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
        {/* onClick ইভেন্ট যোগ করা হলো */}
        <button id="adminBtn" className="admin-btn" onClick={openAdmin}>
            <i className="fas fa-lock"></i> Admin
        </button>
    </nav>
  );
}

export default Navbar;