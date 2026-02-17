import api from './api';

// Get all quotes
export const getAllQuotes = async () => {
  const response = await api.get('/quotes');
  return response.data;
};

// Get single quote
export const getQuote = async (id) => {
  const response = await api.get(`/quotes/${id}`);
  return response.data;
};

// Create quote (Teacher only)
export const createQuote = async (quoteData) => {
  const response = await api.post('/quotes', quoteData);
  return response.data;
};

// Update quote (Teacher only)
export const updateQuote = async (id, quoteData) => {
  const response = await api.put(`/quotes/${id}`, quoteData);
  return response.data;
};

// Delete quote (Teacher only)
export const deleteQuote = async (id) => {
  const response = await api.delete(`/quotes/${id}`);
  return response.data;
};

// Get teacher's quotes
export const getTeacherQuotes = async () => {
  const response = await api.get('/quotes/teacher/myquotes');
  return response.data;
};

const quoteService = {
  getAllQuotes,
  getQuote,
  createQuote,
  updateQuote,
  deleteQuote,
  getTeacherQuotes
};

export default quoteService;
