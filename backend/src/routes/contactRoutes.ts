import express from 'express';
import { submitContact, getContacts, getContact, markResolved, deleteContact } from '../controllers/contactController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/', submitContact);

// Admin routes
router.get('/', authenticate, requireAdmin, getContacts);
router.get('/:id', authenticate, requireAdmin, getContact);
router.put('/:id/resolve', authenticate, requireAdmin, markResolved);
router.delete('/:id', authenticate, requireAdmin, deleteContact);

export default router;
