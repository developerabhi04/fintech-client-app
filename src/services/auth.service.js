import api from './api';
import { API_ENDPOINTS } from '../utils/constants';
import { setToken, setUser, clearAuthData } from '../utils/helpers';

/**
 * Register new user
 * @param {object} userData - User registration data
 * @returns {Promise<object>} Response data
 */
export const register = async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
};

/**
 * Login user
 * @param {object} credentials - Login credentials
 * @returns {Promise<object>} Response data
 */
export const login = async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
};

/**
 * Verify email
 * @param {string} token - Verification token
 * @returns {Promise<object>} Response data
 */
export const verifyEmail = async (token) => {
    const response = await api.get(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}?token=${token}`);
    return response.data;
};

/**
 * Verify login
 * @param {string} token - Login verification token
 * @returns {Promise<object>} Response data
 */
export const verifyLogin = async (token) => {
    const response = await api.get(`${API_ENDPOINTS.AUTH.VERIFY_LOGIN}?token=${token}`);

    // Store token and user data
    if (response.data.data.token) {
        setToken(response.data.data.token);
        setUser(response.data.data.user);
    }

    return response.data;
};

/**
 * Resend verification email
 * @param {string} email - User email
 * @returns {Promise<object>} Response data
 */
export const resendVerification = async (email) => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, { email });
    return response.data;
};

/**
 * Get current user
 * @returns {Promise<object>} User data
 */
export const getCurrentUser = async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.ME);

    // Update stored user data
    if (response.data.data.user) {
        setUser(response.data.data.user);
    }

    return response.data;
};

/**
 * Logout user
 * @returns {Promise<object>} Response data
 */
export const logout = async () => {
    try {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
        console.error('Logout error:', error);
    } finally {
        clearAuthData();
    }
};

/**
 * Forgot password
 * @param {string} email - User email
 * @returns {Promise<object>} Response data
 */
export const forgotPassword = async (email) => {
    const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
};

/**
 * Reset password
 * @param {string} token - Reset token
 * @param {string} password - New password
 * @returns {Promise<object>} Response data
 */
export const resetPassword = async (token, password) => {
    const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password,
    });
    return response.data;
};
