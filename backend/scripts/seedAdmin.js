import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/Admin.js';

dotenv.config();

let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/feedback-db';

// Ensure database name is in connection string
if (!MONGO_URI.includes('/feedback-db') && !MONGO_URI.includes('feedback-db?')) {
  try {
    const url = new URL(MONGO_URI);
    const pathname = url.pathname;
    
    if (!pathname || pathname === '/' || pathname === '') {
      url.pathname = '/feedback-db';
    } else if (pathname !== '/feedback-db') {
      url.pathname = '/feedback-db';
    }
    
    MONGO_URI = url.toString();
  } catch (error) {
    // Fallback: simple string manipulation
    MONGO_URI = MONGO_URI.replace(/\/+$/, '');
    if (MONGO_URI.includes('?')) {
      MONGO_URI = MONGO_URI.replace('?', '/feedback-db?');
    } else {
      MONGO_URI = MONGO_URI + '/feedback-db';
    }
  }
  
  // Clean up double slashes
  MONGO_URI = MONGO_URI.replace(/([^:]\/)\/+/g, '$1');
}

async function seedAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if default admin exists
    const existingAdmin = await Admin.findOne({ email: 'admin@feedback.com' });

    if (existingAdmin) {
      console.log('ℹ️  Default admin already exists');
      process.exit(0);
    }

    // Create default admin - password will be hashed by model's pre-save hook
    const admin = new Admin({
      email: 'admin@feedback.com',
      password: 'admin123', // Will be automatically hashed by pre-save hook
      name: 'Default Admin'
    });

    await admin.save();
    console.log('✅ Default admin created successfully!');
    console.log('   Email: admin@feedback.com');
    console.log('   Password: admin123');
    console.log('\n💡 You can change the password after logging in.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
}

seedAdmin();

