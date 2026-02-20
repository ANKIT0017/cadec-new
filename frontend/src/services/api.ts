import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  
  register: (name: string, email: string, password: string) =>
    api.post('/api/auth/register', { name, email, password }),
  
  getMe: () => api.get('/api/auth/me'),
};

// Jobs API
export const jobsAPI = {
  getJobs: (params?: { type?: string; location?: string; search?: string }) =>
    api.get('/api/jobs', { params }),
  
  getJob: (id: string) => api.get(`/api/jobs/${id}`),
  
  createJob: (data: any) => api.post('/api/jobs', data),
  
  updateJob: (id: string, data: any) => api.put(`/api/jobs/${id}`, data),
  
  deleteJob: (id: string) => api.delete(`/api/jobs/${id}`),
};

// Startups API
export const startupsAPI = {
  getStartups: (params?: { status?: string; category?: string; search?: string }) =>
    api.get('/api/startups', { params }),
  
  getStartup: (id: string) => api.get(`/api/startups/${id}`),
  
  createStartup: (data: any) => api.post('/api/startups', data),
  
  updateStartup: (id: string, data: any) => api.put(`/api/startups/${id}`, data),
  
  deleteStartup: (id: string) => api.delete(`/api/startups/${id}`),
};

// Contact API
export const contactAPI = {
  submitContact: (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) => api.post('/api/contact', data),
  
  getContacts: (params?: { isResolved?: boolean; search?: string }) =>
    api.get('/api/contact', { params }),
  
  getContact: (id: string) => api.get(`/api/contact/${id}`),
  
  markResolved: (id: string) => api.put(`/api/contact/${id}/resolve`),
  
  deleteContact: (id: string) => api.delete(`/api/contact/${id}`),
};

export default api;
