import express from 'express';
import { getStartups, getStartup, createStartup, updateStartup, deleteStartup } from '../controllers/startupController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getStartups);
router.get('/:id', getStartup);

// Admin routes
router.post('/', authenticate, requireAdmin, createStartup);
router.put('/:id', authenticate, requireAdmin, updateStartup);
router.delete('/:id', authenticate, requireAdmin, deleteStartup);

export default router;
