import Quote from '../models/Quote.js';

// @desc    Get all quotes
// @route   GET /api/quotes
// @access  Public
export const getQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find({ isActive: true })
      .populate('teacher', 'name email')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single quote
// @route   GET /api/quotes/:id
// @access  Public
export const getQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id)
      .populate('teacher', 'name email');

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    res.status(200).json({
      success: true,
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new quote
// @route   POST /api/quotes
// @access  Private (Teacher only)
export const createQuote = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: 'Please provide quote text'
      });
    }

    const quote = await Quote.create({
      text,
      teacher: req.user.id,
      teacherName: req.user.name
    });

    res.status(201).json({
      success: true,
      message: 'Quote created successfully',
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update quote
// @route   PUT /api/quotes/:id
// @access  Private (Teacher only - own quotes)
export const updateQuote = async (req, res, next) => {
  try {
    let quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Make sure user is quote owner
    if (quote.teacher.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this quote'
      });
    }

    quote = await Quote.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Quote updated successfully',
      data: quote
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete quote
// @route   DELETE /api/quotes/:id
// @access  Private (Teacher only - own quotes)
export const deleteQuote = async (req, res, next) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: 'Quote not found'
      });
    }

    // Make sure user is quote owner
    if (quote.teacher.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this quote'
      });
    }

    await quote.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Quote deleted successfully',
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get teacher's quotes
// @route   GET /api/quotes/teacher/myquotes
// @access  Private (Teacher only)
export const getTeacherQuotes = async (req, res, next) => {
  try {
    const quotes = await Quote.find({ teacher: req.user.id })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes
    });
  } catch (error) {
    next(error);
  }
};
