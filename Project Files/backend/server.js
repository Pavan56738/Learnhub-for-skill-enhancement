import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/database.js';
import errorHandler from './src/middleware/errorHandler.js';
import path from 'path';
import env from "./src/config/env.js";

// Load env vars
// dotenv.config();
dotenv.config({ path: path.resolve('./config.env') });

// DEBUG (temporary)
// console.log("SERVER sees MONGO_URI =", process.env.MONGO_URI);


// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ extended: true, limit: '200mb' }));

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

// Import routes
import authRoutes from './src/routes/authRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import quoteRoutes from './src/routes/quoteRoutes.js';

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/quotes', quoteRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Learning Platform API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/courses',
      quotes: '/api/quotes',
      health: '/api/health'
    }
  });
});

// Error handler (should be last middleware)
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Learning Platform API Server                    ║
║                                                       ║
║   📍 Server running on port: ${PORT}                    ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}              ║
║   🔗 API URL: http://localhost:${PORT}                 ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app;
