import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import AdminModal from './components/AdminModal';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false); // ড্যাশবোর্ডের সুইচ

  // লগইন সফল হলে মডাল বন্ধ হয়ে ড্যাশবোর্ড খুলবে
  const handleLoginSuccess = () => {
    setIsAdminOpen(false);
    setIsDashboardOpen(true);
  };

  return (
    <div>
      <Navbar openAdmin={() => setIsAdminOpen(true)} />
      <Hero />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      
      <AdminModal 
        isOpen={isAdminOpen} 
        closeAdmin={() => setIsAdminOpen(false)} 
        onLoginSuccess={handleLoginSuccess} 
      />
      
      <AdminDashboard 
        isOpen={isDashboardOpen} 
        closeDashboard={() => setIsDashboardOpen(false)} 
      />
    </div>
  );
}

export default App;