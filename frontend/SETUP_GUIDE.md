# CADEC Society Website - Complete Setup Guide

This guide will help you set up both the frontend and backend for the CADEC Society website.

## Project Overview

The website includes:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + shadcn/ui
- **Backend**: Express.js + TypeScript + MongoDB + JWT Authentication
- **Features**: User authentication, job postings, startup showcase, contact form, admin panel

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd canvas-connect-quest-main
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the frontend root:
```env
VITE_API_URL=http://localhost:5000
```

### 4. Run Frontend
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd ../backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the backend directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/cadec-society

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# OAuth - Google (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth - GitHub (Optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_TO=admin@cadecpgdav.edu

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### 4. OAuth Setup (Optional)

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

#### GitHub OAuth:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`

### 5. Email Setup (Gmail)
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_PASS`

### 6. Run Backend
```bash
npm run dev
```

The backend will be available at `http://localhost:5000`

## Database Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use `mongodb://localhost:27017/cadec-society` as MONGODB_URI

### Option 2: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get the connection string
4. Use the connection string as MONGODB_URI

## Testing the Setup

### 1. Start Both Services
```bash
# Terminal 1 - Frontend
cd canvas-connect-quest-main
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev
```

### 2. Test Features
1. **Homepage**: Visit `http://localhost:5173`
2. **Authentication**: Click "Login" button to test auth
3. **Contact Form**: Submit a test message
4. **Admin Panel**: Create an admin user and visit `/admin`

### 3. Create Admin User
To create an admin user, you can either:
1. Use the registration form and manually update the database
2. Add this code temporarily to create an admin user:

```javascript
// Add this to backend/src/server.ts temporarily
import User from './models/User';
import bcrypt from 'bcryptjs';

// Create admin user (run once)
const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = new User({
    name: 'Admin User',
    email: 'admin@cadecpgdav.edu',
    password: hashedPassword,
    isAdmin: true
  });
  await admin.save();
  console.log('Admin user created');
};
// Uncomment the line below to create admin user
// createAdmin();
```

## Project Structure

```
canvas-connect-quest-main/
├── src/                          # Frontend source
│   ├── components/              # React components
│   ├── pages/                   # Page components
│   ├── contexts/                # React contexts
│   ├── services/                # API services
│   └── ...
├── backend/                     # Backend source
│   ├── src/
│   │   ├── config/              # Database & Passport config
│   │   ├── models/              # MongoDB models
│   │   ├── controllers/         # Route handlers
│   │   ├── routes/              # API routes
│   │   ├── middleware/          # Auth & error handling
│   │   ├── services/            # Email service
│   │   └── utils/               # JWT utilities
│   └── ...
└── SETUP_GUIDE.md              # This file
```

## Features Implemented

### Frontend
- ✅ Home, About, Events, Gallery pages
- ✅ New Startups and Jobs pages
- ✅ Authentication system (Login/Register/OAuth)
- ✅ Contact form with backend integration
- ✅ Admin panel for content management
- ✅ Responsive design with consistent UI

### Backend
- ✅ Express.js server with TypeScript
- ✅ MongoDB integration with Mongoose
- ✅ JWT authentication system
- ✅ OAuth integration (Google, GitHub)
- ✅ Email service with Nodemailer
- ✅ Protected admin routes
- ✅ CRUD operations for jobs, startups, contacts
- ✅ Error handling and validation

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure FRONTEND_URL is set correctly in backend .env
2. **Database Connection**: Check MongoDB URI and ensure MongoDB is running
3. **Email Not Sending**: Verify email credentials and app password
4. **OAuth Not Working**: Check OAuth credentials and redirect URIs
5. **Build Errors**: Ensure all dependencies are installed

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure both frontend and backend are running
4. Check MongoDB connection
5. Verify OAuth credentials if using OAuth

## Production Deployment

For production deployment:
1. Set NODE_ENV=production
2. Use a production MongoDB instance
3. Set up proper OAuth redirect URIs for your domain
4. Configure email service for production
5. Use environment variables for all sensitive data
6. Set up proper CORS origins
7. Use HTTPS in production

## Security Notes

- Never commit .env files
- Use strong JWT secrets
- Implement rate limiting in production
- Use HTTPS in production
- Validate all inputs
- Keep dependencies updated
