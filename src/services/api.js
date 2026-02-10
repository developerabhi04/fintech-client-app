import axios from 'axios';
import { getToken, clearAuthData } from '../utils/helpers';
import toast from 'react-hot-toast';

// Create axios instance
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';

        // Handle 401 Unauthorized - Clear auth and redirect to login
        if (error.response?.status === 401) {
            clearAuthData();
            window.location.href = '/login';
            toast.error('Session expired. Please login again.');
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            toast.error(message);
        }

        // Handle 404 Not Found
        if (error.response?.status === 404) {
            toast.error(message);
        }

        // Handle 500 Server Error
        if (error.response?.status === 500) {
            toast.error('Server error. Please try again later.');
        }

        return Promise.reject(error);
    }
);

export default api;
