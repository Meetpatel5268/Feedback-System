import express from 'express';
import Feedback from '../models/Feedback.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/stats - Get statistics (protected)
router.get('/', verifyToken, async (req, res) => {
  try {
    const totalFeedbacks = await Feedback.countDocuments();
    
    const result = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    const avgRating = result.length > 0 ? result[0].avgRating : 0;

    const positiveCount = await Feedback.countDocuments({ rating: { $gte: 4 } });
    const negativeCount = await Feedback.countDocuments({ rating: { $lte: 2 } });

    res.json({
      totalFeedbacks,
      avgRating: Math.round(avgRating * 100) / 100,
      positiveCount,
      negativeCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

