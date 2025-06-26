import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      console.log('Attempting signup for:', formData.email);
      console.log('API endpoint:', API_ENDPOINTS.AUTH.SIGNUP);
      
      const response = await fetch(API_ENDPOINTS.AUTH.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      console.log('Signup response status:', response.status);
      
      const data = await response.json();
      console.log('Signup response data:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      onSignup(data.user, data.token);
    } catch (err) {
      console.error('Signup error:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else {
        setError(err.message || 'Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-container">
        <h2 className="auth-title">Join Kali Skill Share</h2>
        
        {error && (
          <div style={{ 
            background: '#f8d7da', 
            color: '#721c24', 
            padding: '10px', 
            borderRadius: '5px', 
            marginBottom: '20px' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>
            Already have an account? <Link to="/login" style={{ color: '#007bff' }}>Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup; 