// src/pages/Login.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onToggleAuth = () => {
    navigate('/register');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await login(formData.email, formData.password);
    
    if (!result.success) {
      alert(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div>
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back! 👋</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            id="loginEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="loginPassword"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <div>
        <div>
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ width: '100%', marginBottom: '0.5rem' }}
            disabled={loading}
          >
            {loading ? '🔄 Signing in...' : '🚀 Sign In'}
          </button>
        </div>

        <div 
          className="auth-link" 
          style={{ textAlign: 'right', width: '100%' }}
        >
          <Link 
            to="/forgot" 
            style={{ 
              color: 'var(--primary)', 
              textDecoration: 'none', 
              fontSize: '14px' 
            }}
          >
            Forgot password?
          </Link>
        </div>
      </div>

        
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: 'var(--gray)', marginBottom: '1rem' }}>
          Don't have an account?{' '}
        </p>
        <button 
          onClick={onToggleAuth}
          className="btn btn-outline"
          style={{ width: '100%' }}
        >
          📝 Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;