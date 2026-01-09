import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Courses from './pages/Courses.jsx';
import Certificate from './pages/Certificate.jsx';
import Contact from './pages/Contact.jsx';
import Consultation from './pages/Consultation.jsx';
import Students from './pages/Students.jsx';
import './styles/login.css';
import './styles/main.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const userName = localStorage.getItem('userName');
  
  if (!userName) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

// Scroll to top on every route change so pages never open mid-scroll
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
          <Route path="/certificate" element={<ProtectedRoute><Certificate /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/consultation" element={<ProtectedRoute><Consultation /></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
