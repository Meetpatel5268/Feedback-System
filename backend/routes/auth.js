import express from 'express';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/auth/login - Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      console.log(`❌ Login attempt failed: Admin not found for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      console.log(`❌ Login attempt failed: Invalid password for email: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: admin._id.toString(), email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ Login successful for: ${admin.email}`);

    return res.json({
      message: 'Login successful',
      token,
      user: {
        email: admin.email,
        name: admin.name,
        id: admin._id
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST /api/auth/register - Create new admin (protected - only existing admins)
router.post('/register', verifyToken, async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase().trim() });

    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }

    // Create new admin
    const admin = new Admin({
      email: email.toLowerCase().trim(),
      password, // Will be hashed by pre-save hook
      name: name || 'Admin'
    });

    await admin.save();

    // Return admin without password
    const adminResponse = admin.toObject();
    delete adminResponse.password;

    res.status(201).json({
      message: 'Admin created successfully',
      admin: adminResponse
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Admin with this email already exists' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/auth/admins - Get all admins (protected)
router.get('/admins', verifyToken, async (req, res) => {
  try {
    const admins = await Admin.find()
      .select('-password')
      .sort({ createdAt: -1 });

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

