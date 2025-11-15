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

async function createAdmin() {
  try {
    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    console.log('🔗 Connection string:', MONGO_URI.replace(/:[^:]+@/, ':****@')); // Hide password
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('');

    // Delete existing admin if exists (to recreate with correct hash)
    const existingAdmin = await Admin.findOne({ email: 'admin@feedback.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin already exists, deleting to recreate...');
      await Admin.deleteOne({ email: 'admin@feedback.com' });
      console.log('✅ Old admin deleted');
    }

    // Create default admin - password will be hashed by model's pre-save hook
    console.log('🔄 Creating admin...');
    
    const admin = new Admin({
      email: 'admin@feedback.com',
      password: 'admin123', // Will be automatically hashed by pre-save hook
      name: 'Default Admin'
    });

    await admin.save();

    console.log('');
    console.log('✅ Admin created successfully!');
    console.log('─'.repeat(50));
    console.log('📧 Email: admin@feedback.com');
    console.log('🔐 Password: admin123');
    console.log('👤 Name: Default Admin');
    console.log('─'.repeat(50));
    console.log('');
    
    // Verify admin was saved
    const savedAdmin = await Admin.findOne({ email: 'admin@feedback.com' });
    if (savedAdmin) {
      console.log('✅ Verification: Admin found in database');
      console.log('   ID:', savedAdmin._id);
      console.log('   Created:', savedAdmin.createdAt);
      console.log('');
      console.log('🎉 You can now login with these credentials!');
    } else {
      console.error('❌ Error: Admin not found after creation!');
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    if (error.code === 11000) {
      console.error('   Duplicate key error - admin might already exist');
    }
    console.error('');
    console.error('Full error:', error);
    process.exit(1);
  }
}

createAdmin();

