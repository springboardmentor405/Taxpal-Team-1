import React, { useState } from 'react';
import './App.css';

export default function TaxpalApp() {
  const [view, setView] = useState('login'); 


  const Card = ({ children }) => (
    <div className="taxpal-bg">
      <div className="taxpal-card">{children}</div>
    </div>
  );

  // 1. LOGIN PAGE
  if (view === 'login') return (
    <Card>
      <h1 className="taxpal-title">Welcome to Taxpal</h1>
      <p className="taxpal-subtitle">Smart finance starts with smart tracking</p>
      <h2 className="section-heading">Login to your account</h2>
      <div className="form-group">
        <label>Email</label>
        <input type="email" />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" />
        <div className="forgot-link" onClick={() => setView('forgot')}>Forgot Password</div>
      </div>
      <button className="taxpal-btn" onClick={() => setView('verify')}>Login</button>
      <p className="taxpal-footer">Don't have account? <span onClick={() => setView('register')}>Create Now</span></p>
    </Card>
  );

  // 2. REGISTER PAGE
  if (view === 'register') return (
    <Card>
      <h1 className="taxpal-title" style={{fontStyle: 'normal'}}>Register</h1>
      <p className="taxpal-subtitle" style={{fontStyle: 'normal'}}>Create a new account</p>
      <div className="form-group"><label>Username</label><input type="text" /></div>
      <div className="form-group"><label>Email</label><input type="email" /></div>
      <div className="form-group"><label>Password</label><input type="password" /></div>
      <div className="form-group"><label>Confirm Password</label><input type="password" /></div>
      <button className="taxpal-btn" onClick={() => setView('verify')}>Login</button>
      <p className="taxpal-footer">Already have account? <span onClick={() => setView('login')}>Login</span></p>
    </Card>
  );

  // 3. FORGOT PASSWORD PAGE
  if (view === 'forgot') return (
    <Card>
      <h1 className="taxpal-title" style={{fontStyle: 'normal', marginBottom: '20px'}}>Forgot Password</h1>
      <div className="form-group">
        <label>Enter your email</label>
        <input type="email" />
        <div className="help-links">
          <span onClick={() => setView('login')}>Choose another method</span>
          <span>Need Help?</span>
        </div>
      </div>
      <button className="taxpal-btn" style={{marginTop: '30px'}} onClick={() => setView('verify')}>Send OTP</button>
    </Card>
  );

  // 4. VERIFICATION (OTP) PAGE
  if (view === 'verify') return (
    <Card>
      <h1 className="taxpal-title" style={{fontStyle: 'normal'}}>Verification</h1>
      <p className="taxpal-subtitle" style={{fontStyle: 'normal'}}>Messenger has send a code to verify your account</p>
      <div className="form-group"><label>Email OTP</label></div>
      <div className="otp-container">
        <input className="otp-input" maxLength="1" />
        <input className="otp-input" maxLength="1" />
        <input className="otp-input" maxLength="1" />
        <input className="otp-input" maxLength="1" />
      </div>
      <button className="taxpal-btn" onClick={() => setView('login')}>Verify</button>
      <p className="taxpal-subtitle" style={{marginTop: '15px', cursor: 'pointer'}}>Resend</p>
    </Card>
  );
}