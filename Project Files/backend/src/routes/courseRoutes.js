import express from 'express';
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getTeacherCourses,
  enrollCourse,
  getEnrolledCourses
} from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourse);

// Teacher routes
router.get('/teacher/mycourses', protect, authorize('teacher'), getTeacherCourses);
router.post('/', protect, authorize('teacher'), createCourse);
router.put('/:id', protect, authorize('teacher'), updateCourse);
router.delete('/:id', protect, authorize('teacher'), deleteCourse);

// Student routes
router.post('/:id/enroll', protect, authorize('student'), enrollCourse);
router.get('/student/enrolled', protect, authorize('student'), getEnrolledCourses);

export default router;
