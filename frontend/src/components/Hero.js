import React from 'react';

function Hero() {
  return (
    <header id="about" className="hero">
        <div className="hero-content">
            <h1>Hi, I'm <span className="highlight">Anjan Mukherjee</span></h1>
            <h2>Full Stack Developer & Financial Operations Specialist</h2>
            <p>Dedicated Full Stack Developer specializing in the MERN Stack, with a strong foundation in building scalable and dynamic web applications. As an analytical and tech-savvy professional, I bridge the gap between complex digital systems and efficient financial operations. I am passionate about writing clean, robust code and thrive on solving intricate technical challenges. My proven capabilities in database architecture, secure server-side operations, and streamlined user workflows allow me to drive continuous operational excellence and organizational growth.</p>
            <a href="#contact" className="btn primary-btn">Get In Touch</a>
        </div>
        <div className="hero-image">
            {/* খেয়াল করো, img ট্যাগটি শেষে / দিয়ে বন্ধ করা হয়েছে */}
            {/* আগে ছিল src="MYPHOYO.jpg" , এখন হবে src="/MYPHOYO.jpg" */}
<img src="/MYPHOYO.jpg" alt="Anjan Mukherjee" className="profile-pic" />
        </div>
    </header>
  );
}

export default Hero;