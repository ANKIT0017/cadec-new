import express from 'express';
import passport from 'passport';
import { register, login, getMe, oauthCallback } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Local authentication
router.post('/register', register);
router.post('/login', login);

// OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), 
  oauthCallback
);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }), 
  oauthCallback
);

// Custom Social Media App OAuth routes
router.get('/custom-app', passport.authenticate('custom-app', { scope: ['read'] }));
router.get('/custom-app/callback', 
  passport.authenticate('custom-app', { failureRedirect: '/login' }), 
  oauthCallback
);

// Protected routes
router.get('/me', authenticate, getMe);

export default router;
