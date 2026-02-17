import express from 'express';
import {
  getQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getTeacherQuotes
} from '../controllers/quoteController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getQuotes);
router.get('/:id', getQuote);

// Teacher routes
router.get('/teacher/myquotes', protect, authorize('teacher'), getTeacherQuotes);
router.post('/', protect, authorize('teacher'), createQuote);
router.put('/:id', protect, authorize('teacher'), updateQuote);
router.delete('/:id', protect, authorize('teacher'), deleteQuote);

export default router;
