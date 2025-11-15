import express from 'express';
import Feedback from '../models/Feedback.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// POST /api/feedback - Create feedback (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // Validations
    if (!name || !name.trim()) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Message is required' });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const feedback = new Feedback({
      name: name.trim(),
      email: email?.trim() || '',
      message: message.trim(),
      rating: parseInt(rating)
    });

    await feedback.save();

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET /api/feedback - Get all feedback (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

