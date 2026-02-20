import express from 'express';
import { getJobs, getJob, createJob, updateJob, deleteJob } from '../controllers/jobController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getJobs);
router.get('/:id', getJob);

// Admin routes
router.post('/', authenticate, requireAdmin, createJob);
router.put('/:id', authenticate, requireAdmin, updateJob);
router.delete('/:id', authenticate, requireAdmin, deleteJob);

export default router;
