// src/components/WelcomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {

  const navigate = useNavigate();

  const handleShowAuth = (mode) => {
    navigate(`/${mode}`);
  };

  return (
    <div className="welcome-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Inventory Pro
          </h1>
          <p className="hero-subtitle">
            Streamline your inventory management with our powerful, intuitive platform. 
            Track products, monitor stock levels, and make data-driven decisions with ease.
          </p>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Real-time Analytics</h3>
              <p className="feature-description">
                Get instant insights into your inventory performance and make informed decisions.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h3 className="feature-title">Smart Alerts</h3>
              <p className="feature-description">
                Never run out of stock with automatic low inventory notifications.
              </p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3 className="feature-title">Easy Management</h3>
              <p className="feature-description">
                Add, edit, and organize your products with our user-friendly interface.
              </p>
            </div>
          </div>
          
          <div className="cta-section">
            <h3 style={{ marginBottom: '1rem', color: 'var(--dark)' }}>
              Ready to transform your inventory management?
            </h3>
            <div className="cta-buttons">
              <button 
                onClick={() => handleShowAuth('login')}
                className="btn btn-primary"
              >
                🚀 Get Started
              </button>
              <button 
                onClick={() => handleShowAuth('register')}
                className="btn btn-outline"
              >
                📝 Create Account
              </button>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-light)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', color: 'var(--gray)' }}>
              <div>
                <h4 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>📦 Track Everything</h4>
                <p>Monitor all your products in one place</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>💰 Save Money</h4>
                <p>Optimize your inventory and reduce costs</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--dark)', marginBottom: '0.5rem' }}>⏱️ Save Time</h4>
                <p>Automate your inventory management</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;