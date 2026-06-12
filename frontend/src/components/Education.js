import React from 'react';

function Education() {
  return (
    <section id="education" className="section">
        <h2 className="section-title">Education & Details</h2>
        <div className="info-container">
            <div className="education-list">
                <h3><i className="fas fa-graduation-cap"></i> Academic Background</h3>
                <ul>
                    <li><strong>Master of Computer Applications (MCA)</strong> - Parul University (Pursuing, 2025-2027)</li>
                    <li><strong>Bachelor of Computer Applications (BCA)</strong> - Techno India Institute of Technology (2021-2024) | 68.2%</li>
                    <li><strong>Higher Secondary (Class 12)</strong> - West Bengal Council of Higher Secondary Education (2021) | 52.39%</li>
                    <li><strong>Secondary (Class 10)</strong> - West Bengal Board of Secondary Education (2019) | 46.5%</li>
                </ul>
            </div>
            <div className="personal-details">
                <h3><i className="fas fa-user"></i> Contact Info</h3>
                <ul>
                    <li><i className="fas fa-envelope"></i> anjanmukherjee9900@gmail.com</li>
                    <li><i className="fas fa-phone"></i> (+91)9330044802</li>
                    <li><i className="fas fa-map-marker-alt"></i> 3no S.N.Mukherjee lane Uttarpara Bhadrakali Hooghly - 712232</li>
                </ul>
            </div>
        </div>
    </section>
  );
}

export default Education;