// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import WelcomePage from './components/WelcomePage';
import Forgot from './pages/Forgot';
import './App.css';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h2>Loading Inventory Pro...</h2>
        </div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/welcome" />;
};

// Public Route component (redirect to dashboard if already authenticated)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
          <h2>Loading Inventory Pro...</h2>
        </div>
      </div>
    );
  }
  
  return !user ? children : <Navigate to="/dashboard" />;
};

// Layout component for auth pages
const AuthLayout = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
      <header>
        <div className="nav-container">
          <div className="logo">InventoryPro</div>
          <div className="auth-section">
            <button 
              onClick={() => window.location.href = '/welcome'}
              className="btn btn-link"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </header>
      
      <div className="auth-container">
        <div className="auth-card">
          {children}
        </div>
      </div>
    </div>
  );
};

// Layout component for welcome page
const WelcomeLayout = ({ children }) => {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
      <header>
        <div className="nav-container">
          <div className="logo">InventoryPro</div>
          <div className="auth-section">
            <button 
              onClick={() => window.location.href = '/login'}
              className="btn btn-outline"
            >
              Sign In
            </button>
            <button 
              onClick={() => window.location.href = '/register'}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
};

// Layout component for dashboard
const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <>
      <header>
        <div className="nav-container">
          <div className="logo">InventoryPro</div>
          <div className="auth-section">
            <span className="user-welcome">Welcome, {user?.name}! 👋</span>
            <button onClick={logout} className="btn btn-danger">
              🚪 Logout
            </button>
          </div>
        </div>
      </header>
      {children}
    </>
  );
};

// Main App Content with Routes
const AppContent = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/welcome" 
        element={
          <PublicRoute>
            <WelcomeLayout>
              <WelcomePage />
            </WelcomeLayout>
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <AuthLayout>
              <Login />
            </AuthLayout>
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <AuthLayout>
              <Register />
            </AuthLayout>
          </PublicRoute>
        } 
      />
      
      <Route 
        path="/forgot" 
        element={
          <PublicRoute>
            <AuthLayout>
              <Forgot />
            </AuthLayout>
          </PublicRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Default redirects */}
      <Route path="/" element={<Navigate to="/welcome" />} />
      <Route path="*" element={<Navigate to="/welcome" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;