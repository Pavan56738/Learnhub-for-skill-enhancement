import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import './CourseView.css';

// const CourseView = ({ user, onLogout }) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const course = location.state?.course;
//   const [selectedSection, setSelectedSection] = useState(null);

//   if (!course) {
//     navigate('/student');
//     return null;
//   }

const CourseView = ({ user, onLogout }) => {
  const { id } = useParams(); // ✅ get courseId from URL
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch(
          `http://localhost:5000/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        if (data.success) {
          setCourse(data.data);
        } else {
          navigate('/student'); // redirect only if backend fails
        }
      } catch (error) {
        console.error('Course load error:', error);
        navigate('/student');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, navigate]);

  // ✅ DO NOT redirect while loading
  if (loading) return <p>Loading course...</p>;
  if (!course) return null;


  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const handleClosePlayer = () => {
    setSelectedSection(null);
  };


  return (
    <div className="course-view-page">
      <Navbar role="student" onLogout={onLogout} />
      
      <div className="course-view-container">
        <div className="course-header-section">
          <button className="back-btn" onClick={() => navigate('/student')}>
            ← Back to Courses
          </button>
          <h1>{course.title}</h1>
          <p className="course-educator">By {course.educator}</p>
          <p className="course-description">{course.description}</p>
        </div>

        <div className="course-content">
          <h2>Course Sections</h2>
          
          {course.sections && course.sections.length > 0 ? (
            <div className="sections-list">
              {course.sections.map((section, index) => (
                <div 
                  key={section.id} 
                  className="section-card"
                  onClick={() => handleSectionClick(section)}
                >
                  <div className="section-number">{index + 1}</div>
                  <div className="section-details">
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                    {section.contentType && (
                      <span className="content-badge">
                        {section.contentType === 'video' ? '🎥 Video' : '🖼️ Image'}
                      </span>
                    )}
                  </div>
                  <div className="section-arrow">→</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-content">No sections available for this course yet.</p>
          )}
        </div>
      </div>

      {selectedSection && (
        <div className="media-player-overlay" onClick={handleClosePlayer}>
          <div className="media-player-container" onClick={(e) => e.stopPropagation()}>
            <div className="player-header">
              <h3>{selectedSection.title}</h3>
              <button className="close-btn" onClick={handleClosePlayer}>✕</button>
            </div>
            
            <div className="player-content">
              {selectedSection.content ? (
                selectedSection.contentType === 'video' ? (
                  <video controls className="video-player">
                    <source src={selectedSection.content} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={selectedSection.content} 
                    alt={selectedSection.title}
                    className="image-viewer"
                  />
                )
              ) : (
                <div className="no-media">
                  <p>No media content available for this section.</p>
                </div>
              )}
            </div>
            
            <div className="player-description">
              <p>{selectedSection.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseView;
