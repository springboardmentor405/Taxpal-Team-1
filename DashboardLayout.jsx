import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const location = useLocation();
  // Image 1 (Login) supposedly has no border, whereas Register (Image 2) does.
  // Actually, comparing closely they might all just sit on the canvas. 
  // Let's use the border class for Register, Verify, Forgot.
  const needsBorder = ['/register', '/verify', '/forgot-password'].includes(location.pathname);

  return (
    <div className="auth-layout-container">
      <div className={`auth-card ${needsBorder ? 'with-border' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
