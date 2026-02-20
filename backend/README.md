# CADEC Society Backend

This is the backend API for the CADEC Society website, built with Express.js, TypeScript, and MongoDB.

## Features

- **Authentication**: JWT-based authentication with local login and OAuth (Google, GitHub)
- **Job Management**: CRUD operations for job postings
- **Startup Management**: CRUD operations for startup profiles
- **Contact Form**: Email notifications for contact form submissions
- **Admin Panel**: Protected admin routes for content management

## Setup Instructions

### 1. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/cadec-society

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# OAuth - Google
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# OAuth - GitHub
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

### 2. OAuth Setup

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`

#### GitHub OAuth:
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:5000/api/auth/github/callback`

### 3. Email Setup (Gmail)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the app password in `EMAIL_PASS`

### 4. Installation and Running

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/google` - Google OAuth
- `GET /api/auth/github` - GitHub OAuth

### Jobs
- `GET /api/jobs` - Get all jobs (public)
- `GET /api/jobs/:id` - Get single job (public)
- `POST /api/jobs` - Create job (admin)
- `PUT /api/jobs/:id` - Update job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)

### Startups
- `GET /api/startups` - Get all startups (public)
- `GET /api/startups/:id` - Get single startup (public)
- `POST /api/startups` - Create startup (admin)
- `PUT /api/startups/:id` - Update startup (admin)
- `DELETE /api/startups/:id` - Delete startup (admin)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all contacts (admin)
- `GET /api/contact/:id` - Get single contact (admin)
- `PUT /api/contact/:id/resolve` - Mark as resolved (admin)
- `DELETE /api/contact/:id` - Delete contact (admin)

## Database Models

### User
- email, password, name, provider, providerId, isAdmin, avatar

### Job
- title, company, description, location, type, experienceLevel, applyLink, companyLogo, salary, requirements, postedBy, isActive

### Startup
- name, description, logo, founders, status, website, category, yearFounded, funding, isActive

### Contact
- firstName, lastName, email, phone, subject, message, isResolved

## Security Features

- JWT token authentication
- Password hashing with bcrypt
- CORS configuration
- Input validation
- Error handling middleware
- Admin-only routes protection

## Development

The backend uses TypeScript with the following structure:
- `src/config/` - Database and Passport configuration
- `src/models/` - MongoDB models
- `src/controllers/` - Route handlers
- `src/routes/` - API routes
- `src/middleware/` - Authentication and error handling
- `src/services/` - Email service
- `src/utils/` - JWT utilities
