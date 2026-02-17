import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import './AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Study App</h1>
            <p>Your journey to excellence starts here</p>
          </div>
          
          <div className="auth-tabs">
            <button 
              className={isLogin ? 'tab active' : 'tab'}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={!isLogin ? 'tab active' : 'tab'}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          {isLogin ? (
            <Login 
              onLogin={onLogin} 
              onSwitchToRegister={() => setIsLogin(false)} 
            />
          ) : (
            <Register 
              onRegister={onLogin} 
              onSwitchToLogin={() => setIsLogin(true)} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
