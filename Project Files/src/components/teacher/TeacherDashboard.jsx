import React, { useState, useEffect } from 'react';
import Navbar from '../common/Navbar';
import './TeacherDashboard.css';

const TeacherDashboard = ({ user, onLogout }) => {
  const [quotes, setQuotes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newQuote, setNewQuote] = useState('');

  useEffect(() => {
    // Load quotes and courses from localStorage
    const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
    // const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setQuotes(storedQuotes);
    // setCourses(storedCourses.filter(c => c.teacherId === user.id));
    const fetchTeacherCourses = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/courses/teacher/mycourses",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();
      console.log("Teacher courses:", data);

      if (data.success) {
        setCourses(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    }
  };
   fetchTeacherCourses();
  }, [user.id]);

  const handleAddQuote = (e) => {
    e.preventDefault();
    if (!newQuote.trim()) return;

    const quote = {
      id: Date.now(),
      text: newQuote,
      teacherId: user.id,
      teacherName: user.name
    };

    const updatedQuotes = [...quotes, quote];
    setQuotes(updatedQuotes);
    localStorage.setItem('quotes', JSON.stringify(updatedQuotes));
    setNewQuote('');
    alert('Quote added successfully!');
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const allCourses = JSON.parse(localStorage.getItem('courses') || '[]');
      const updatedCourses = allCourses.filter(c => c.id !== courseId);
      localStorage.setItem('courses', JSON.stringify(updatedCourses));
      setCourses(updatedCourses.filter(c => c.teacherId === user.id));
    }
  };

  return (
    <div className="dashboard">
      <Navbar role="teacher" onLogout={onLogout} />
      
      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>Welcome back, {user.name}! 👋</h1>
          <p>Manage your courses and inspire your students</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>{courses.length}</h3>
            <p>Total Courses</p>
          </div>
          <div className="stat-card">
            <h3>{quotes.filter(q => q.teacherId === user.id).length}</h3>
            <p>Quotes Shared</p>
          </div>
        </div>

        <div className="section">
          <h2>Add Motivational Quote</h2>
          <form onSubmit={handleAddQuote} className="quote-form">
            <textarea
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              placeholder="Share an inspiring quote with your students..."
              rows="3"
            />
            <button type="submit" className="submit-btn">Add Quote</button>
          </form>
        </div>

        <div className="section">
          <h2>Your Courses</h2>
          {courses.length === 0 ? (
            <p className="empty-state">No courses yet. Click "Add Course" to create your first course!</p>
          ) : (
            <div className="courses-grid">
              {courses.map(course => (
                <div key={course.id} className="course-card">
                  <h3>{course.title}</h3>
                  <p className="course-educator">By {course.educator}</p>
                  <p className="course-category">{course.category}</p>
                  <p className="course-price">₹{course.price}</p>
                  <p className="course-desc">{course.description}</p>
                  <div className="course-sections">
                    <strong>Sections: {course.sections?.length || 0}</strong>
                  </div>
                  <button 
                    onClick={() => handleDeleteCourse(course._id)}
                    className="delete-btn"
                  >
                    Delete Course
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
