import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <div className="auth-header" style={{ marginBottom: '1.5rem' }}>
        <h1 className="auth-title-normal">Register</h1>
        <p className="auth-subtitle" style={{ marginBottom: '0' }}>Create a new account</p>
      </div>
      
      <form>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input type="text" className="form-input" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" className="form-input" />
        </div>
        
        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" className="form-input" />
        </div>

        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
          <label className="form-label">Confirm Password</label>
          <input type="password" className="form-input" />
        </div>
        
        <button type="button" onClick={() => window.location.href='/login'} className="btn-pill">Login</button>
      </form>
      
      <p style={{ marginTop: '0.75rem', fontSize: '0.65rem', textAlign: 'center', fontWeight: 500 }}>
        Already have account? <Link to="/login" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>Login</Link>
      </p>
    </>
  );
};

export default Register;
