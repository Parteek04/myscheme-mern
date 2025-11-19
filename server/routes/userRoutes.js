import express from 'express';
import { 
  addToFavourites, 
  removeFromFavourites, 
  getFavourites,
  getAllUsers,
  getUserStats
} from '../controllers/userController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// User favourite routes
router.get('/favourites', protect, getFavourites);
router.post('/favourites/:schemeId', protect, addToFavourites);
router.delete('/favourites/:schemeId', protect, removeFromFavourites);

// Admin routes
router.get('/', protect, adminOnly, getAllUsers);
router.get('/admin/stats', protect, adminOnly, getUserStats);

export default router;
