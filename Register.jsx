import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="auth-header">
        <h1 className="auth-title">Welcome to Taxpal</h1>
        <p className="auth-subtitle">Smart finance starts with smart tracking</p>
      </div>
      
      <h2 style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem' }}>Login to your account</h2>
      
      <form>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" />
        </div>
        
        <div className="form-group" style={{ marginBottom: '0.25rem' }}>
          <label className="form-label">Password</label>
          <input type="password" className="form-input" />
        </div>
        
        <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
          <Link to="/forgot-password" style={{ color: 'var(--error)', fontSize: '0.65rem', textDecoration: 'none' }}>
            Forgot Password
          </Link>
        </div>
        
        <button type="button" onClick={() => window.location.href='/dashboard'} className="btn-pill">Login</button>
      </form>
      
      <p style={{ marginTop: '0.75rem', fontSize: '0.65rem', textAlign: 'center', fontWeight: 500 }}>
        Don't have account? <Link to="/register" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>Create Now</Link>
      </p>
    </>
  );
};

export default Login;
