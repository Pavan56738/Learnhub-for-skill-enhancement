import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ role, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate(role === 'teacher' ? '/teacher' : '/student')}>
          Study App
        </div>
        
        <div className="navbar-links">
          <a onClick={() => navigate(role === 'teacher' ? '/teacher' : '/student')} className="nav-link">
            Home
          </a>
          {role === 'teacher' && (
            <a onClick={() => navigate('/teacher/add-course')} className="nav-link">
              Add Course
            </a>
          )}
          {role === 'student' && (
            <a onClick={() => navigate('/student/enrolled')} className="nav-link">
              Enrolled Courses
            </a>
          )}
        </div>
        
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
