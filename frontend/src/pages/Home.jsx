import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function Home() {
  const userName = localStorage.getItem('userName');

  return (
    <div className="page-container home-modern">
      <Navbar />
      <main className="main-content">
        {/* Modern Hero with Split Layout */}
        <section className="hero-modern">
          <div className="hero-left">
            <div className="welcome-badge">
              <span className="wave">👋</span>
              <span>Welcome back, {userName}!</span>
            </div>
            <h1 className="hero-title">
              Your Gateway to
              <span className="highlight-text"> Excellence</span>
            </h1>
            <p className="hero-lead">
              Discover opportunities that match your ambitions. Connect with experts,
              explore courses, and take the next step in your journey.
            </p>
            <div className="hero-actions">
              <Link to="/courses" className="btn-primary">Explore Courses</Link>
              <Link to="/consultation" className="btn-secondary">Book Consultation</Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Students</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Success Rate</span>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="floating-card card-1">
              <div className="card-icon">📚</div>
              <div className="card-text">Quality Learning</div>
            </div>
            <div className="floating-card card-2">
              <div className="card-icon">🎯</div>
              <div className="card-text">Career Growth</div>
            </div>
            <div className="floating-card card-3">
              <div className="card-icon">💡</div>
              <div className="card-text">Expert Guidance</div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="benefits-section">
          <h2 className="section-title">Everything You Need to Succeed</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon blue">📖</div>
              <h3>Comprehensive Curriculum</h3>
              <p>Industry-aligned courses designed by experts to prepare you for real-world challenges.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon green">👥</div>
              <h3>Personal Mentorship</h3>
              <p>One-on-one guidance from experienced professionals who care about your success.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon purple">🚀</div>
              <h3>Career Support</h3>
              <p>Job placement assistance, resume reviews, and interview preparation included.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon orange">⚡</div>
              <h3>Flexible Learning</h3>
              <p>Study at your own pace with on-demand access to all materials and resources.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon teal">🏆</div>
              <h3>Certificates</h3>
              <p>Earn recognized credentials that boost your profile and open new opportunities.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon red">🌐</div>
              <h3>Community Access</h3>
              <p>Join a network of learners and professionals who support each other's growth.</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="testimonial-section">
          <h2 className="section-title">What Our Students Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                The courses are top-notch and the mentors are incredibly supportive. 
                I landed my dream job within 3 months!
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">M</div>
                <div>
                  <div className="author-name">M.MATHAN</div>
                  <div className="author-role">Software Engineer & AUTOMATION & AI Developer</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                Best decision I ever made. The flexible schedule allowed me to learn 
                while working full-time.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">C</div>
                <div>
                  <div className="author-name">C.CHANDRU</div>
                  <div className="author-role">Data Analyst</div>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">"</div>
              <p className="testimonial-text">
                The community support and practical projects gave me real-world 
                experience that employers value.
              </p>
              <div className="testimonial-author">
                <div className="author-avatar">RS</div>
                <div>
                  <div className="author-name">R.S.HARISH</div>
                  <div className="author-role">Product Manager</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive CTA */}
        <section className="interactive-cta">
          <div className="cta-content">
            <h2>Ready to Transform Your Future?</h2>
            <p>Start your journey today with a free consultation. No commitment required.</p>
            <Link to="/consultation" className="cta-button-large">
              Get Started Free
              <span className="arrow">→</span>
            </Link>
          </div>
          <div className="cta-features">
            <div className="cta-feature">
              <span className="check">✓</span> Free consultation
            </div>
            <div className="cta-feature">
              <span className="check">✓</span> Personalized learning path
            </div>
            <div className="cta-feature">
              <span className="check">✓</span> No credit card needed
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
