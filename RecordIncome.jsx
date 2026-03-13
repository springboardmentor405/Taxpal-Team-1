import React from 'react';

const ForgotPassword = () => {
  return (
    <>
      <div className="auth-header" style={{ marginBottom: '2.5rem', marginTop: '1rem' }}>
        <h1 className="auth-title-normal">Forgot Password</h1>
      </div>
      
      <form>
        <div className="form-group" style={{ marginBottom: '0.5rem' }}>
          <label className="form-label">Enter your email</label>
          <input type="email" className="form-input" />
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '0.6rem', fontWeight: 600 }}>
          <span style={{ cursor: 'pointer' }}>Choose another method</span>
          <span style={{ cursor: 'pointer' }}>Need Help?</span>
        </div>
        
        <button type="button" onClick={() => window.location.href='/verify'} className="btn-pill" style={{ width: '100%', maxWidth: '160px', marginTop: '1rem' }}>
          Send OTP
        </button>
      </form>
    </>
  );
};

export default ForgotPassword;
