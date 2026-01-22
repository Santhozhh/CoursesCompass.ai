import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import CompassIcon from './CompassIcon';
import './Auth.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.text();

      if (data === 'User Not Found') {
        setError('User not found. Please check your email.');
      } else if (data === 'Wrong Password') {
        setError('Incorrect password. Please try again.');
      } else if (data === 'Login Successfull') {
        // Store user email in localStorage
        localStorage.setItem('userEmail', formData.email);
        setSuccess(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check if the server is running.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="header-content">
          <div className="logo-container">
            <CompassIcon />
            <span className="logo-text">CoursesCompass.ai</span>
          </div>
        </div>
      </header>

      <div className="auth-card">
        <div className="auth-icon-container">
          <CompassIcon />
        </div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to continue your learning journey</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">✓ Login successful! Redirecting...</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
            <FaArrowRight className="button-icon" />
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/registration" className="auth-link">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
