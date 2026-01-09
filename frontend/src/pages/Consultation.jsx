import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Consultation() {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    currentEducation: '',
    interestedCourse: '',
    preferredDate: '',
    preferredTime: '',
    query: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to backend
    console.log('Consultation booked:', formData);
    setSubmitted(true);
    setFormData({
      studentName: '',
      email: '',
      phone: '',
      currentEducation: '',
      interestedCourse: '',
      preferredDate: '',
      preferredTime: '',
      query: ''
    });
  };

  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        <section className="page-header">
          <h1>Free Career Consultation</h1>
          <p>Get expert guidance for your academic future</p>
        </section>

        <section className="content-section">
          {!submitted ? (
            <div className="consultation-container">
              <div className="consultation-info">
                <h2>Why Book a Consultation?</h2>
                <ul className="benefits-list">
                  <li>✅ One-on-one session with experienced advisors</li>
                  <li>✅ Personalized course recommendations</li>
                  <li>✅ Career path guidance and planning</li>
                  <li>✅ Admission process assistance</li>
                  <li>✅ Scholarship information</li>
                  <li>✅ Answer all your questions</li>
                </ul>
                <div className="consultation-note">
                  <h3>What to Expect</h3>
                  <p>
                    Our consultation sessions last approximately 30-45 minutes. During this time,
                    our expert advisors will understand your goals, discuss suitable courses,
                    and create a personalized roadmap for your success.
                  </p>
                </div>
              </div>

              <div className="consultation-form-container">
                <h2>Book Your Free Session</h2>
                <form onSubmit={handleSubmit} className="consultation-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="Your email"
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Current Education Level *</label>
                    <select
                      value={formData.currentEducation}
                      onChange={(e) => setFormData({ ...formData, currentEducation: e.target.value })}
                      required
                    >
                      <option value="">Select your current level</option>
                      <option value="high-school">High School</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="professional">Working Professional</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Interested Course *</label>
                    <select
                      value={formData.interestedCourse}
                      onChange={(e) => setFormData({ ...formData, interestedCourse: e.target.value })}
                      required
                    >
                      <option value="">Select a course</option>
                      <option value="computer-science">Computer Science</option>
                      <option value="business">Business Administration</option>
                      <option value="engineering">Engineering</option>
                      <option value="data-science">Data Science</option>
                      <option value="digital-marketing">Digital Marketing</option>
                      <option value="web-development">Web Development</option>
                      <option value="undecided">Not Sure Yet</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Preferred Date *</label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Preferred Time *</label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                        required
                      >
                        <option value="">Select time</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Questions or Special Requests</label>
                    <textarea
                      value={formData.query}
                      onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                      rows="4"
                      placeholder="Tell us what you'd like to discuss..."
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-button">Book Free Consultation</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="confirmation-message">
              <div className="confirmation-icon">✅</div>
              <h2>Consultation Booked Successfully!</h2>
              <p>
                Thank you for booking a consultation with us. We've received your request and
                will send you a confirmation email shortly with the meeting details.
              </p>
              <p>
                Our team will contact you at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong>
              </p>
              <button onClick={() => setSubmitted(false)} className="back-button">
                Book Another Session
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Consultation;
