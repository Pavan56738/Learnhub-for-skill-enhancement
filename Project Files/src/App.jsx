import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import TeacherDashboard from './components/teacher/TeacherDashboard';
import AddCourse from './components/teacher/AddCourse';
import StudentDashboard from './components/student/StudentDashboard';
import PaymentPage from './components/student/PaymentPage';
import EnrolledCourses from './components/student/EnrolledCourses';
import CourseView from './components/student/CourseView';
import ProtectedRoute from './routes/ProtectedRoute';
import './styles/global.css';
import './styles/theme.css';
function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <Routes>
        {/* Auth Route */}
        <Route 
          path="/" 
          element={
            user ? (
              <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} replace />
            ) : (
              <AuthPage onLogin={handleLogin} />
            )
          } 
        />

        {/* Teacher Routes */}
        <Route 
          path="/teacher" 
          element={
            <ProtectedRoute user={user} requiredRole="teacher">
              <TeacherDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacher/add-course" 
          element={
            <ProtectedRoute user={user} requiredRole="teacher">
              <AddCourse user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />

        {/* Student Routes */}
        <Route 
          path="/student" 
          element={
            <ProtectedRoute user={user} requiredRole="student">
              <StudentDashboard user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/payment" 
          element={
            <ProtectedRoute user={user} requiredRole="student">
              <PaymentPage user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/enrolled" 
          element={
            <ProtectedRoute user={user} requiredRole="student">
              <EnrolledCourses user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/student/course-view/:id" 
          element={
            <ProtectedRoute user={user} requiredRole="student">
              <CourseView user={user} onLogout={handleLogout} />
            </ProtectedRoute>
          } 
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
