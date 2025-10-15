import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Forgot = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      // Simulate API call - replace with your actual password reset API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically call your backend API
      // await authAPI.forgotPassword(email);
      
      setMessage('Password reset instructions have been sent to your email!');
      setEmail('');
    } catch (err) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div>
          <div className="auth-header">
            <h1 className="auth-title">Reset Password</h1>
            <p className="auth-subtitle">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          {/* Success Message */}
          {message && (
            <div className="alert alert-success">
              <span>{message}</span>
              <button 
                className="alert-close"
                onClick={() => setMessage('')}
              >
                ×
              </button>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
              <button 
                className="alert-close"
                onClick={() => setError('')}
              >
                ×
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                disabled={isLoading}
              />
            </div>

            

            <div>
                <div>
                    <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%', marginBottom: '0.5rem' }}
                    disabled={isLoading || !email}
                    >
                    {isLoading ? (
                        <>
                        <span>Sending...</span>
                        <span> ⏳</span>
                        </>
                    ) : (
                        <>
                        <span>Send Reset Instructions</span>
                        <span> 📧</span>
                        </>
                    )}
                    </button>
                </div>

                <div style={{ textAlign: 'left', width: '100%' }}>
                    <Link
                    to="/login"
                    className="auth-link"
                    style={{
                        color: 'var(--primary)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        display: 'inline-block',
                        marginTop: '0.5rem',
                    }}
                    >
                    ← Back to Login
                    </Link>
                </div>
            </div>


          </form>

          

          {/* Additional Help */}
          
        <p>
            💡 <strong>Tip:</strong> Check your spam folder if you don't see the email within a few minutes.
        </p>
          
    </div>
  );
};

export default Forgot;


