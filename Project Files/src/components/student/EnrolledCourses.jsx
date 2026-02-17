import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Button from '../common/Button';
import './EnrolledCourses.css';

const EnrolledCourses = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    // Get user's purchased courses
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = users.find(u => u.id === user.id);
    
    if (currentUser && currentUser.purchasedCourses) {
      const allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const purchased = allCourses.filter(course => 
        currentUser.purchasedCourses.includes(course.id)
      );
      setEnrolledCourses(purchased);
    }
  }, [user.id]);

  const handleViewCourse = (course) => {
    navigate('/student/course-view', { state: { course } });
  };

  return (
    <div className="enrolled-page">
      <Navbar role="student" onLogout={onLogout} />
      
      <div className="enrolled-container">
        <h1>My Enrolled Courses</h1>
        
        {enrolledCourses.length === 0 ? (
          <div className="empty-state">
            <p>You haven't enrolled in any courses yet.</p>
            <Button onClick={() => navigate('/student')}>Browse Courses</Button>
          </div>
        ) : (
          <div className="table-container">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Course Educator</th>
                  <th>Course Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {enrolledCourses.map(course => (
                  <tr key={course.id}>
                    <td>{course.id}</td>
                    <td>{course.title}</td>
                    <td>{course.educator}</td>
                    <td>
                      <span className="category-badge">{course.category}</span>
                    </td>
                    <td>
                      <button 
                        className="view-btn"
                        onClick={() => handleViewCourse(course)}
                      >
                        View Course
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
