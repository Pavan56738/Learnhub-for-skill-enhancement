import api from './api';

// Get all courses
export const getAllCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

// Get single course
export const getCourse = async (id) => {
  const response = await api.get(`/courses/${id}`);
  return response.data;
};

// Create course (Teacher only)
export const createCourse = async (courseData) => {
  const response = await api.post('/courses', courseData);
  return response.data;
};

// Update course (Teacher only)
export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data;
};

// Delete course (Teacher only)
export const deleteCourse = async (id) => {
  const response = await api.delete(`/courses/${id}`);
  return response.data;
};

// Get teacher's courses
export const getTeacherCourses = async () => {
  const response = await api.get('/courses/teacher/mycourses');
  return response.data;
};

// Enroll in course (Student only)
export const enrollCourse = async (courseId) => {
  const response = await api.post(`/courses/${courseId}/enroll`);
  return response.data;
};

// Get enrolled courses (Student only)
export const getEnrolledCourses = async () => {
  const response = await api.get('/courses/student/enrolled');
  return response.data;
};

const courseService = {
  getAllCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
  enrollCourse,
  getEnrolledCourses
};

export default courseService;
