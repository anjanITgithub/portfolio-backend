import React from 'react';

function Projects() {
  return (
    <section id="projects" className="section bg-light">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
            <div className="project-card">
                <h3>BiryaniHub - Online Food System</h3>
                <p>Engineered a complete end-to-end online food delivery web application from scratch. Built a fully responsive frontend and developed a robust backend architecture to handle business logic, dynamic menu rendering, and interactive shopping cart operations.</p>
                <div className="tags">
                    <span>Node.js</span> <span>Express</span> <span>MongoDB</span>
                </div>
            </div>
            <div className="project-card">
                <h3>Job Board Portal</h3>
                <p>Played a key role as a Full Stack Developer in building the platform's functionality and user experience. Responsibilities included designing and developing comprehensive features, managing secure user workflows, and ensuring seamless operation across the portal.</p>
                <div className="tags">
                    <span>Full Stack</span> <span>Web Architecture</span> <span>UI/UX</span>
                </div>
            </div>
            <div className="project-card">
                <h3>E-Learning Platform</h3>
                <p>Developed an interactive E-Learning Platform focusing on high usability and performance. Created interactive learning materials, dynamic quizzes, and video tutorials while ensuring complete cross-device responsiveness and optimal user engagement.</p>
                <div className="tags">
                    <span>HTML5</span> <span>CSS3</span> <span>JavaScript</span>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Projects;