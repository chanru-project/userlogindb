import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../services/api.js';

function Login() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsLoading(true);

    try {
      if (isSignup) {
        const response = await signupUser({ name, email, password });
        setIsError(false);
        setMessage(response.message || 'Account created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        setTimeout(() => setIsSignup(false), 2000);
      } else {
        const response = await loginUser({ email, password });
        setIsError(false);
        setMessage(response.message || 'Login successful!');
        localStorage.setItem('userName', response.name);
        setTimeout(() => navigate('/home'), 1000);
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message || `${isSignup ? 'Signup' : 'Login'} failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignup(!isSignup);
    setMessage('');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isSignup ? 'Create Account' : 'Sign In'}</h1>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
              <span 
                className="password-toggle-icon" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </span>
            </div>
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? (isSignup ? 'Creating...' : 'Logging in...') : (isSignup ? 'Create Account' : 'Sign In')}
          </button>
        </form>
        {message && (
          <div className={`message ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
        <div className="toggle-text">
          {isSignup ? (
            <p>
              Already have an account?{' '}
              <span className="toggle-link" onClick={toggleMode}>
                Sign In
              </span>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <span className="toggle-link" onClick={toggleMode}>
                Create Account
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
