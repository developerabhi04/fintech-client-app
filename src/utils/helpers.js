/**
 * Store token in localStorage
 * @param {string} token - JWT token
 */
export const setToken = (token) => {
    localStorage.setItem('token', token);
};

/**
 * Get token from localStorage
 * @returns {string|null} Token or null
 */
export const getToken = () => {
    return localStorage.getItem('token');
};

/**
 * Remove token from localStorage
 */
export const removeToken = () => {
    localStorage.removeItem('token');
};

/**
 * Store user data in localStorage
 * @param {object} user - User data
 */
export const setUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

/**
 * Get user data from localStorage
 * @returns {object|null} User data or null
 */
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUser = () => {
    localStorage.removeItem('user');
};

/**
 * Clear all auth data
 */
export const clearAuthData = () => {
    removeToken();
    removeUser();
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
    return !!getToken();
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncate = (text, length = 50) => {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substring(0, length) + '...';
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
export const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};
