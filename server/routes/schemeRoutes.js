import express from 'express';
import { 
  getSchemes, 
  getSchemeBySlug, 
  createScheme, 
  updateScheme, 
  deleteScheme,
  getSearchSuggestions,
  getSchemeStats
} from '../controllers/schemeController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getSchemes);
router.get('/suggestions', getSearchSuggestions);
router.get('/:slug', getSchemeBySlug);

// Protected admin routes
router.post('/', protect, adminOnly, createScheme);
router.put('/:id', protect, adminOnly, updateScheme);
router.delete('/:id', protect, adminOnly, deleteScheme);
router.get('/admin/stats', protect, adminOnly, getSchemeStats);

export default router;
