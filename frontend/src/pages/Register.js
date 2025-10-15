// src/pages/Register.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await register(formData.name, formData.email, formData.password);
    
    if (!result.success) {
      alert(result.error);
    }
    
    setLoading(false);
  };

  const navigate = useNavigate();

  const onToggleAuth = () => {
    navigate('/login');
  };

  const onBack = () => {
    navigate('/welcome');
  }

  return (
    <div>
      <div className="auth-header">
        <h2 className="auth-title">Get Started 🚀</h2>
        <p className="auth-subtitle">Create your account to start managing inventory</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="registerName">👤 Full Name</label>
          <input
            type="text"
            id="registerName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerEmail">📧 Email Address</label>
          <input
            type="email"
            id="registerEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="registerPassword">🔒 Password</label>
          <input
            type="password"
            id="registerPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          style={{ width: '100%', marginBottom: '1rem' }}
          disabled={loading}
        >
          {loading ? '🔄 Creating Account...' : '🎉 Create Account'}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
          Already have an account?{' '}
        </p>
        <button 
          onClick={onToggleAuth}
          className="btn btn-outline"
          style={{ width: '100%' }}
        >
          🔐 Sign In
        </button>
      </div>
    </div>
  );
};

export default Register;