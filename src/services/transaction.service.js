import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get all transactions
 * @param {object} filters - Filter options
 * @returns {Promise<object>} Transactions data
 */
export const getTransactions = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`${API_ENDPOINTS.TRANSACTIONS.GET_ALL}?${params}`);
    return response.data;
};

/**
 * Get single transaction
 * @param {string} id - Transaction ID
 * @returns {Promise<object>} Transaction data
 */
export const getTransaction = async (id) => {
    const response = await api.get(`${API_ENDPOINTS.TRANSACTIONS.GET_ONE}/${id}`);
    return response.data;
};

/**
 * Get recent transactions
 * @returns {Promise<object>} Recent transactions
 */
export const getRecentTransactions = async () => {
    const response = await api.get(API_ENDPOINTS.TRANSACTIONS.GET_RECENT);
    return response.data;
};

/**
 * Get transaction statistics
 * @returns {Promise<object>} Transaction stats
 */
export const getTransactionStats = async () => {
    const response = await api.get(API_ENDPOINTS.TRANSACTIONS.GET_STATS);
    return response.data;
};

/**
 * Get transaction by reference
 * @param {string} reference - Transaction reference
 * @returns {Promise<object>} Transaction data
 */
export const getTransactionByReference = async (reference) => {
    const response = await api.get(`${API_ENDPOINTS.TRANSACTIONS.BY_REFERENCE}/${reference}`);
    return response.data;
};
