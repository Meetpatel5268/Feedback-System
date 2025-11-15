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

async function checkAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if any admin exists
    const adminCount = await Admin.countDocuments();
    console.log(`📊 Total admins in database: ${adminCount}\n`);

    if (adminCount === 0) {
      console.log('❌ No admins found in database!');
      console.log('💡 Run: npm run seed:admin\n');
      process.exit(1);
    }

    // List all admins
    const admins = await Admin.find().select('email name createdAt');
    console.log('📋 All Admins:');
    console.log('─'.repeat(50));
    admins.forEach((admin, index) => {
      console.log(`${index + 1}. Email: ${admin.email}`);
      console.log(`   Name: ${admin.name || 'N/A'}`);
      console.log(`   Created: ${admin.createdAt.toLocaleString()}`);
      console.log('');
    });

    // Check specific admin
    const defaultAdmin = await Admin.findOne({ email: 'admin@feedback.com' });
    if (defaultAdmin) {
      console.log('✅ Default admin exists: admin@feedback.com');
    } else {
      console.log('❌ Default admin NOT found: admin@feedback.com');
      console.log('💡 Run: npm run seed:admin\n');
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkAdmin();

