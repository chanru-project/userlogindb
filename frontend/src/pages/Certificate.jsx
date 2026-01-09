import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function Certificate() {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course || null;
  const [userName, setUserName] = useState('');
  const certificateRef = useRef(null);

  // Auto-generate signature from name (first letter + last name)
  const generateSignature = (name) => {
    if (!name || name.trim() === '') return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toLowerCase() + parts[0].slice(1).toLowerCase();
    const firstLetter = parts[0].charAt(0).toLowerCase();
    const lastName = parts[parts.length - 1].toLowerCase();
    return firstLetter + '.' + lastName;
  };

  const signature = generateSignature(userName);

  const downloadCertificate = async () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
    const node = certificateRef.current;
    if (!node) return;
    try {
      const canvas = await html2canvas(node, { scale: 2, useCORS: true, backgroundColor: null });
      const dataUrl = canvas.toDataURL('image/png');
      // Record download in backend (best-effort; non-blocking for UX)
      try {
        await axios.post('http://localhost:5000/api/certificates/download', {
          name: userName.trim(),
          courseTitle: course.title,
          signature
        });
      } catch (apiErr) {
        console.warn('Could not record certificate download', apiErr);
      }
      const a = document.createElement('a');
      const safeName = userName.trim().replace(/\s+/g, '_');
      const safeCourse = (course.title || 'course').replace(/\s+/g, '_');
      a.href = dataUrl;
      a.download = `${safeName}_${safeCourse}_certificate.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('Download failed', e);
      alert('Could not generate the certificate image. Please try again.');
    }
  };

  if (!course) {
    return (
      <div className="page-container">
        <Navbar />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>No course selected. Please go back and select a course.</p>
          <button onClick={() => navigate('/courses')} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
            ← Back to Courses
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content" style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <button onClick={() => navigate('/courses')} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#f0f0f0', border: '1px solid #ddd', borderRadius: '6px', cursor: 'pointer' }}>
            ← Back to Courses
          </button>

          <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>🎓 Certificate Generator</h1>

          {/* Input Section */}
          <div style={{ backgroundColor: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Enter Your Full Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="e.g., Chandru Kumar"
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                border: '2px solid #007bff',
                borderRadius: '6px',
                boxSizing: 'border-box',
                marginBottom: '0.5rem'
              }}
            />
            {userName && (
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                📝 Signature Preview: <strong>{signature}</strong>
              </p>
            )}
          </div>

          {/* Certificate Preview */}
          <div
            ref={certificateRef}
            style={{
              backgroundColor: '#fff8dc',
              border: '4px solid #d4af37',
              borderRadius: '12px',
              padding: '3rem 2rem',
              textAlign: 'center',
              position: 'relative',
              minHeight: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
              pageBreakInside: 'avoid'
            }}
          >
            {/* Header */}
            <div>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏆</div>
              <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0', color: '#d4af37' }}>CERTIFICATE OF COMPLETION</h2>
              <p style={{ fontSize: '1rem', color: '#666', margin: '0' }}>This is to certify that</p>
            </div>

            {/* Name Section */}
            <div style={{ margin: '2rem 0' }}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#003366',
                textDecoration: 'underline',
                textDecorationColor: '#d4af37',
                padding: '0.5rem 0'
              }}>
                {userName || '_' . repeat(30)}
              </div>
            </div>

            {/* Course Section */}
            <div>
              <p style={{ fontSize: '1.1rem', margin: '1rem 0 0.5rem 0', color: '#333' }}>
                has successfully completed the course
              </p>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 'bold',
                color: '#d4af37',
                margin: '0.5rem 0 1rem 0',
                textDecoration: 'underline'
              }}>
                {course.title}
              </div>
              <p style={{ fontSize: '0.95rem', color: '#666', margin: '0' }}>
                Duration: {course.duration}
              </p>
            </div>

            {/* Signature Section */}
            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: '#333', margin: '0 0 0.5rem 0', minHeight: '2rem' }}>
                  {signature && <strong style={{ fontSize: '1.3rem', fontFamily: 'cursive' }}>{signature}</strong>}
                </p>
                <div style={{ borderTop: '2px solid #333', width: '120px', marginBottom: '0.25rem' }}></div>
                <p style={{ fontSize: '0.75rem', color: '#666', margin: '0' }}>Authorized Signature</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.9rem', color: '#333', margin: '0 0 0.5rem 0' }}>📅</p>
                <div style={{ borderTop: '2px solid #333', width: '120px', marginBottom: '0.25rem' }}></div>
                <p style={{ fontSize: '0.75rem', color: '#666', margin: '0' }}>Date</p>
              </div>
            </div>

            {/* Footer */}
            <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#999' }}>
              <p style={{ margin: '0' }}>Certificate ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={downloadCertificate}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#218838'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#28a745'}
            >
              ⬇️ Download Certificate (PNG)
            </button>
            <button
              onClick={() => navigate('/courses')}
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#5a6268'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#6c757d'}
            >
              🔄 Another Course
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Certificate;
