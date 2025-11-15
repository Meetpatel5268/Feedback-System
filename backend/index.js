import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import feedbackRoutes from './routes/feedback.js';
import authRoutes from './routes/auth.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// MongoDB connection
let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/feedback-db';

// Ensure database name is in connection string (for Atlas and other connections)
if (!MONGO_URI.includes('/feedback-db') && !MONGO_URI.includes('feedback-db?')) {
  try {
    // Parse connection string properly using URL
    const url = new URL(MONGO_URI);
    
    // Check if database is already specified
    const pathname = url.pathname;
    if (!pathname || pathname === '/' || pathname === '') {
      // No database specified, add feedback-db
      url.pathname = '/feedback-db';
    } else if (pathname !== '/feedback-db') {
      // Replace existing database with feedback-db
      url.pathname = '/feedback-db';
    }
    
    MONGO_URI = url.toString();
  } catch (error) {
    // If URL parsing fails, use simple string manipulation
    // Remove trailing slash if exists
    MONGO_URI = MONGO_URI.replace(/\/+$/, '');
    
    // Check if query string exists
    if (MONGO_URI.includes('?')) {
      // Insert database before query string
      MONGO_URI = MONGO_URI.replace('?', '/feedback-db?');
    } else {
      // Add database at the end
      MONGO_URI = MONGO_URI + '/feedback-db';
    }
  }
  
  // Clean up any double slashes (except after protocol like mongodb+srv://)
  MONGO_URI = MONGO_URI.replace(/([^:]\/)\/+/g, '$1');
}

if (!process.env.MONGO_URI) {
  console.warn('⚠️  MONGO_URI not found in .env, using default: mongodb://localhost:27017/feedback-db');
} else {
  console.log('📊 Using database: feedback-db');
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`✅ Connected to MongoDB: ${MONGO_URI}`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    console.error('\n💡 Make sure MongoDB is running and accessible.');
    console.error('   For MongoDB Compass, use: mongodb://localhost:27017');
    process.exit(1);
  });

export default app;

