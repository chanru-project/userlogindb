import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function About() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="main-content">
        {/* Hero header in brand blue with concise message */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>edufuture</h1>
            <p>We connect people and opportunities with trust and clarity.</p>
          </div>
        </section>

        {/* Quick highlights */}
        <section className="about-highlights">
          <div className="highlight-card">
            <h3>Find Talent</h3>
            <p>Discover skilled professionals ready to help you grow.</p>
          </div>
          <div className="highlight-card active">
            <h3>Find Work</h3>
            <p>Explore projects and roles that match your strengths.</p>
          </div>
          <div className="highlight-card">
            <h3>Affiliate</h3>
            <p>Earn by sharing opportunities with your network.</p>
          </div>
        </section>

        {/* Alternating feature rows */}
        <section className="feature-row">
          <div className="feature-text">
            <h2>Simple, Focused Navigation</h2>
            <p>
              Our platform keeps things straightforward—clear paths to find talent, get work,
              and partner through affiliate programs. No clutter, just what you need.
            </p>
          </div>
          <div className="feature-visual">📁</div>
        </section>

        <section className="feature-row reverse">
          <div className="feature-text">
            <h2>Trust Built In</h2>
            <p>
              Verified profiles, transparent workflows, and measurable results create a reliable
              environment for both businesses and independent professionals.
            </p>
          </div>
          <div className="feature-visual">✅</div>
        </section>

        {/* Compact timeline */}
        <section className="about-timeline">
          <h2>Our Approach</h2>
          <ul>
            <li>
              <span className="step-title">Discover</span>
              <span className="step-desc">Identify the right people and opportunities.</span>
            </li>
            <li>
              <span className="step-title">Match</span>
              <span className="step-desc">Connect skills to needs quickly and accurately.</span>
            </li>
            <li>
              <span className="step-title">Deliver</span>
              <span className="step-desc">Ensure quality outcomes and long-term relationships.</span>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default About;
