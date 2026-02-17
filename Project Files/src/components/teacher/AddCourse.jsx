import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Button from '../common/Button';
import './AddCourse.css';

const AddCourse = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    educator: user.name,
    category: '',
    price: '',
    description: ''
  });

  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState({
    title: '',
    description: '',
    content: null,
    contentType: ''
  });

  const handleCourseChange = (e) => {
    setCourseData({
      ...courseData,
      [e.target.name]: e.target.value
    });
  };

  const handleSectionChange = (e) => {
    setCurrentSection({
      ...currentSection,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentSection({
          ...currentSection,
          content: reader.result,
          contentType: file.type.startsWith('video') ? 'video' : 'image'
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    
    if (!currentSection.title || !currentSection.description) {
      alert('Please fill in section title and description');
      return;
    }

    const newSection = {
      id: Date.now(),
      ...currentSection
    };

    setSections([...sections, newSection]);
    setCurrentSection({
      title: '',
      description: '',
      content: null,
      contentType: ''
    });
    alert('Section added successfully!');
  };

  // const handleSubmitCourse = (e) => {
  //   e.preventDefault();

  //   if (!courseData.title || !courseData.category || !courseData.price || !courseData.description) {
  //     alert('Please fill in all course details');
  //     return;
  //   }

  //   if (sections.length === 0) {
  //     alert('Please add at least one section');
  //     return;
  //   }

  //   const course = {
  //     id: Date.now(),
  //     ...courseData,
  //     sections,
  //     teacherId: user.id,
  //     createdAt: new Date().toISOString()
  //   };

  //   const courses = JSON.parse(localStorage.getItem('courses') || '[]');
  //   courses.push(course);
  //   localStorage.setItem('courses', JSON.stringify(courses));

  //   alert('Course created successfully!');
  //   navigate('/teacher');
  // };
//   const handleSubmitCourse = async (e) => {
//   e.preventDefault();

//   if (!courseData.title || !courseData.category || !courseData.price || !courseData.description) {
//     alert('Please fill in all course details');
//     return;
//   }

//   if (sections.length === 0) {
//     alert('Please add at least one section');
//     return;
//   }

//   const course = {
//     ...courseData,
//     sections,
//     teacherId: user.id
//   };

//   try {
//     const response = await fetch("http://localhost:5000/api/courses/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(course)
//     });

//     const data = await response.json();

//     if (data.success) {
//       alert("Course created successfully!");
//       navigate("/teacher");
//     } else {
//       alert("Failed to create course");
//     }
//   } catch (error) {
//     console.error(error);
//     alert("Server error");
//   }
// };
const handleSubmitCourse = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in");
    return;
  }

  const course = {
    ...courseData,
    sections: sections.map(s => ({
      title: s.title,
      description: s.description,
      contentType: s.contentType
    }))
  };

  try {
    const response = await fetch("http://localhost:5000/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`   // 🔥 THIS IS THE FIX
      },
      body: JSON.stringify(course)
    });

    const data = await response.json();
    console.log("Create course response:", data);

    if (data.success) {
      alert("Course created successfully!");
      navigate("/teacher");
    } else {
      alert(data.message || "Failed to create course");
    }
  } catch (error) {
    console.error(error);
    alert("Server error");
  }
};


  const handleDeleteSection = (sectionId) => {
    setSections(sections.filter(s => s.id !== sectionId));
  };

  return (
    <div className="add-course-page">
      <Navbar role="teacher" onLogout={onLogout} />
      
      <div className="add-course-container">
        <h1>Create New Course</h1>
        
        <form onSubmit={handleSubmitCourse} className="course-form">
          <div className="form-section">
            <h2>Course Details</h2>
            
            <div className="form-group">
              <label>Course Title *</label>
              <input
                type="text"
                name="title"
                value={courseData.title}
                onChange={handleCourseChange}
                placeholder="e.g., Complete Web Development"
              />
            </div>

            <div className="form-group">
              <label>Course Educator *</label>
              <input
                type="text"
                name="educator"
                value={courseData.educator}
                onChange={handleCourseChange}
                placeholder="Educator name"
              />
            </div>

            <div className="form-group">
              <label>Course Category *</label>
              <input
                type="text"
                name="category"
                value={courseData.category}
                onChange={handleCourseChange}
                placeholder="e.g., Programming, Design, Business"
              />
            </div>

            <div className="form-group">
              <label>Course Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={courseData.price}
                onChange={handleCourseChange}
                placeholder="e.g., 999"
              />
            </div>

            <div className="form-group">
              <label>Course Description *</label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleCourseChange}
                placeholder="Describe what students will learn..."
                rows="4"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Add Course Sections</h2>
            
            <div className="section-form">
              <div className="form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  name="title"
                  value={currentSection.title}
                  onChange={handleSectionChange}
                  placeholder="e.g., Introduction to HTML"
                />
              </div>

              <div className="form-group">
                <label>Section Description</label>
                <textarea
                  name="description"
                  value={currentSection.description}
                  onChange={handleSectionChange}
                  placeholder="Describe this section..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Upload Content (Video/Image)</label>
                <input
                  type="file"
                  accept="video/*,image/*"
                  onChange={handleFileChange}
                />
                {currentSection.content && (
                  <p className="file-selected">✓ File selected</p>
                )}
              </div>

              <Button type="button" onClick={handleAddSection} variant="secondary">
                Add Section
              </Button>
            </div>

            {sections.length > 0 && (
              <div className="sections-list">
                <h3>Added Sections ({sections.length})</h3>
                {sections.map((section, index) => (
                  <div key={section.id} className="section-item">
                    <div>
                      <strong>{index + 1}. {section.title}</strong>
                      <p>{section.description}</p>
                      <span className="content-type">{section.contentType || 'No content'}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => handleDeleteSection(section.id)}
                      className="delete-section-btn"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => navigate('/teacher')}>
              Cancel
            </Button>
            <Button type="submit">Create Course</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
