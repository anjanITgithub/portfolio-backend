import React from 'react';

function Experience() {
  return (
    <section id="experience" className="section">
        <h2 className="section-title">Core Competencies</h2>
        <div className="skills-grid">
            <div className="skill-card">
                <i className="fas fa-chart-line"></i>
                <h3>Financial Ops</h3>
                <p>Digital Client Onboarding, Needs Analysis, Report Submission, System Audit, Risk Calculation. Committed to driving operational excellence through precise data handling, strict data privacy maintenance, and seamless team coordination to ensure efficient back-office processing.</p>
            </div>
            <div className="skill-card">
                <i className="fas fa-code"></i>
                <h3>Tech & Logic</h3>
                <p>Frontend with React, Backend with Node & Express, Database with MongoDB. Proficient in crafting responsive interfaces utilizing HTML5, CSS3, and JavaScript, while writing clean, efficient code to solve complex technical challenges within innovative environments.</p>
            </div>
            <div className="skill-card">
                <i className="fas fa-database"></i>
                <h3>Database Architecture</h3>
                <p>MongoDB, SQL/MySQL Basics, Backend Flow Systems. Experienced in configuring robust backend database models to automate registration workflows, ensure secure form filtering, and maintain dynamic data rendering for interactive user features.</p>
            </div>
        </div>
    </section>
  );
}

export default Experience;