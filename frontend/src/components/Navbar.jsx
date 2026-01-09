import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('userName');
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" aria-label="Brand">
          <span className="brand-logo">
            <span className="logo-os">future</span>
            <span className="logo-dire">education</span>
          </span>
        </div>
        <ul className="navbar-menu">
          <li className={isActive('/home') ? 'active' : ''}>
            <Link to="/home">Home</Link>
          </li>
          <li className={isActive('/about') ? 'active' : ''}>
            <Link to="/about">About</Link>
          </li>
          <li className={isActive('/courses') ? 'active' : ''}>
            <Link to="/courses">Courses</Link>
          </li>
          <li className={isActive('/contact') ? 'active' : ''}>
            <Link to="/contact">Contact</Link>
          </li>
          <li className={isActive('/consultation') ? 'active' : ''}>
            <Link to="/consultation">Free Consultation</Link>
          </li>
          <li className={isActive('/students') ? 'active' : ''}>
            <Link to="/students">Student Desk</Link>
          </li>
        </ul>
        <div className="navbar-user">
          <span className="user-greeting">Welcome, {userName}</span>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
