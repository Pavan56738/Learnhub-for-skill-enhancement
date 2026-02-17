// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../common/Navbar';
// import Button from '../common/Button';
// import './StudentDashboard.css';

// const StudentDashboard = ({ user, onLogout }) => {
//   const navigate = useNavigate();
//   const [quotes, setQuotes] = useState([]);
//   const [courses, setCourses] = useState([]);
//   const [currentUser, setCurrentUser] = useState(user);

//   useEffect(() => {
//     // Load quotes and courses
//     const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
//     setQuotes(storedQuotes);
//   //  const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
         



//     const fetchCourses = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/courses");
//         const data = await res.json();

//         console.log("Student courses:", data);

//         if (data.success) {
//           setCourses(data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch courses", error);
//        }finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   //        const enrollRes = await fetch(
//   //         "http://localhost:5000/api/courses/student/enrolled",
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`
//   //           }
//   //         }
//   //       );

//   //       const enrollData = await enrollRes.json();

//   //       if (enrollData.success) {
//   //         setEnrolledCourseIds(enrollData.data.map(c => c._id));
//   //       }

//   //     } catch (error) {
//   //       console.error("Dashboard load error:", error);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchData();
//   // }, []);


//     //Get updated user data
//   //   const users = JSON.parse(localStorage.getItem('users') || '[]');
//   //   const updatedUser = users.find(u => u.id === user.id);
//   //   if (updatedUser) {
//   //     setCurrentUser(updatedUser);
//   //   }
    
//   //   setQuotes(storedQuotes);
//   //   setCourses(storedCourses);
//   // }, [user.id]);
  
//   // const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
//   // setQuotes(storedQuotes);

//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // 1️⃣ Fetch ALL courses
//       const courseRes = await fetch("http://localhost:5000/api/courses");
//       const courseData = await courseRes.json();

//       console.log("All courses:", courseData);

//       if (courseData.success) {
//         setCourses(courseData.data);
//       }

//       // 2️⃣ Fetch PURCHASED courses
//       const enrolledRes = await fetch(
//         "http://localhost:5000/api/courses/student/enrolled",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );

//       const enrolledData = await enrolledRes.json();
//       console.log("Purchased courses:", enrolledData);

//       if (enrolledData.success) {
//         setEnrolledCourseIds(
//           enrolledData.data.map(course => course._id)
//         );
//       }

//     } catch (error) {
//       console.error("Student dashboard load error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);


//   const isPurchased = (courseId) => {
//     return currentUser.purchasedCourses?.includes(courseId) || false;
//   };

//   const handlePayment = (course) => {
//     navigate('/student/payment', { state: { course } });
//     // navigate(`/student/course/${course._id}`);
//   };

//   const handleViewCourse = (course) => {
//     navigate('/student/course-view', { state: { course } });
//   };

//   return (
//     <div className="dashboard">
//       <Navbar role="student" onLogout={onLogout} />
      
//       <div className="dashboard-container">
//         <div className="welcome-section">
//           <h1>Welcome, {currentUser.name}! 🎓</h1>
//           <p>Continue your learning journey</p>
//         </div>

//         {quotes.length > 0 && (
//           <div className="quotes-section">
//             <h2>💡 Daily Inspiration</h2>
//             <div className="quotes-carousel">
//               {quotes.slice(-3).map(quote => (
//                 <div key={quote.id} className="quote-card">
//                   <p className="quote-text">"{quote.text}"</p>
//                   <p className="quote-author">- {quote.teacherName}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="section">
//           <h2>Available Courses</h2>
//           {courses.length === 0 ? (
//             <p className="empty-state">No courses available at the moment. Check back later!</p>
//           ) : (
//             <div className="courses-grid">
//               {courses.map(course => (
//                 <div key={course.id} className="course-card">
//                   <div className="course-header">
//                     <span className="course-category">{course.category}</span>
//                     {isPurchased(course.id) && (
//                       <span className="purchased-badge">Purchased ✓</span>
//                     )}
//                   </div>
                  
//                   <h3>{course.title}</h3>
//                   <p className="course-educator">By {course.educator}</p>
//                   <p className="course-desc">{course.description}</p>
                  
//                   <div className="course-info">
//                     <span className="course-sections">
//                       📚 {course.sections?.length || 0} Sections
//                     </span>
//                     <span className="course-price">₹{course.price}</span>
//                   </div>

//                   {isPurchased(course.id) ? (
//                     <Button fullWidth onClick={() => handleViewCourse(course)}>
//                       View Course
//                     </Button>
//                   ) : (
//                     <Button fullWidth onClick={() => handlePayment(course)}>
//                       Enroll Now
//                     </Button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;






import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../common/Navbar';
import Button from '../common/Button';
import './StudentDashboard.css';

const StudentDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const [quotes, setQuotes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [loading, setLoading] = useState(true);
  //  const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
  //   setQuotes(storedQuotes);

  useEffect(() => {
   

  //   const fetchData = async () => {
  //     try {
  //       const token = localStorage.getItem('token');

  //       // 1️⃣ Fetch all courses
  //       const courseRes = await fetch('http://localhost:5000/api/courses');
  //       const courseData = await courseRes.json();

  //       if (courseData.success) {
  //         setCourses(courseData.data);
  //       }

  //       // 2️⃣ Fetch purchased courses
  //       const enrollRes = await fetch(
  //         'http://localhost:5000/api/courses/student/enrolled',
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       const enrollData = await enrollRes.json();

  //       if (enrollData.success) {
  //         setEnrolledCourseIds(
  //           enrollData.data.map(course => course._id)
  //         );
  //       }
  //     } catch (error) {
  //       console.error('Student dashboard error:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);
 const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
  setQuotes(storedQuotes);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      // ✅ 1. Fetch ALL courses (Browse / General)
      const courseRes = await fetch("http://localhost:5000/api/courses");
      const courseData = await courseRes.json();

      console.log("Browse courses:", courseData);

      if (courseData.success) {
        setCourses(courseData.data);   // ⬅️ DO NOT TOUCH THIS LATER
      }

      // ✅ 2. Fetch ENROLLED courses (IDs only)
      const enrolledRes = await fetch(
        "http://localhost:5000/api/courses/student/enrolled",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const enrolledData = await enrolledRes.json();
      console.log("Enrolled courses:", enrolledData);

      if (enrolledData.success) {
        setEnrolledCourseIds(
          enrolledData.data.map(course => course._id)
        );
      }

    } catch (error) {
      console.error("Dashboard load error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);



  const isPurchased = (courseId) => enrolledCourseIds.includes(courseId);

  const handlePayment = (course) => {
    navigate('/student/payment', { state: { course } });
  };

  const handleViewCourse = (course) => {
    navigate(`/student/course/${course._id}`);
  };

  return (
    <div className="dashboard">
      <Navbar role="student" onLogout={onLogout} />

      <div className="dashboard-container">
        <div className="welcome-section">
          <h1>Welcome, {user.name}! 🎓</h1>
          <p>Continue your learning journey</p>
        </div>

        {quotes.length > 0 && (
          <div className="quotes-section">
            <h2>💡 Daily Inspiration</h2>
            <div className="quotes-carousel">
              {quotes.slice(-3).map((quote) => (
                <div key={quote.id} className="quote-card">
                  <p className="quote-text">"{quote.text}"</p>
                  <p className="quote-author">- {quote.teacherName}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="section">
          <h2>Available Courses</h2>

          {loading ? (
            <p>Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="empty-state">No courses available.</p>
          ) : (
            <div className="courses-grid">
              {courses.map((course) => (
                <div key={course._id} className="course-card">
                  <div className="course-header">
                    <span className="course-category">{course.category}</span>
                    {isPurchased(course._id) && (
                      <span className="purchased-badge">Purchased ✓</span>
                    )}
                  </div>

                  <h3>{course.title}</h3>
                  <p className="course-educator">By {course.educator}</p>
                  <p className="course-desc">{course.description}</p>

                  <div className="course-info">
                    <span>📚 {course.sections?.length || 0} Sections</span>
                    <span className="course-price">₹{course.price}</span>
                  </div>

                  {isPurchased(course._id) ? (
                    <Button fullWidth onClick={() => handleViewCourse(course)}>
                      View Course
                    </Button>
                  ) : (
                    <Button fullWidth onClick={() => handlePayment(course)}>
                      Enroll Now
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
