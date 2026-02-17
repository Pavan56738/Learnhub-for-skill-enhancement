import React from 'react';
import './Button.css';

const Button = ({ children, onClick, variant = 'primary', type = 'button', fullWidth = false }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
