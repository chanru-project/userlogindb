import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <section className="page-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you</p>
        </section>

        <section className="content-section">
          <div className="contact-container">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div>
                  <h4>Address</h4>
                  <p>123 south Street<br/>Tamil Nadu, India 600001</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">📞</div>
                <div>
                  <h4>Phone</h4>
                  <p>9965719690</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#4a90e2" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
                    <rect x="3" y="4" width="18" height="16" rx="2.8" ry="2.8"></rect>
                    <path d="M4.5 7.5 12 12.6l7.5-5.1"></path>
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@edufuture.com</p>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-icon">⏰</div>
                <div>
                  <h4>Working Hours</h4>
                  <p>24/7 working</p>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              {submitted && (
                <div className="success-message">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Your name"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    placeholder="Your email"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Your phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    placeholder="Message subject"
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows="5"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button type="submit" className="submit-button">Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Contact;
