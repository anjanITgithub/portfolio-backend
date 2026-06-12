import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // এই ফাংশনটি এখন সরাসরি ব্যাকএন্ডে ডেটা পাঠাবে
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      // তোমার লোকাল ব্যাকএন্ডের API লিংক
      const response = await fetch('https://portfolio-backend-ruio.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Thank you! Your message has been sent successfully. 🎉");
        // সাবমিট হওয়ার পর ফর্ম ফাঁকা করে দেওয়া
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert("Oops! Something went wrong. 😔");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server is not responding. Make sure backend is running.");
    }
  };

  return (
    <section id="contact" className="section bg-light">
        <h2 className="section-title">Contact Me</h2>
        
        <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <textarea 
              name="message"
              placeholder="Your Message" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="btn primary-btn">Send Message</button>
        </form>
    </section>
  );
}

export default Contact;