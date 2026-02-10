import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Get user wallet
 * @returns {Promise<object>} Wallet data
 */
export const getWallet = async () => {
    const response = await api.get(API_ENDPOINTS.WALLET.GET);
    return response.data;
};

/**
 * Add money to wallet
 * @param {object} data - Payment data
 * @returns {Promise<object>} Response data
 */
export const addMoney = async (data) => {
    const response = await api.post(API_ENDPOINTS.WALLET.ADD_MONEY, data);
    return response.data;
};

/**
 * Withdraw money from wallet
 * @param {object} data - Withdrawal data
 * @returns {Promise<object>} Response data
 */
export const withdrawMoney = async (data) => {
    const response = await api.post(API_ENDPOINTS.WALLET.WITHDRAW, {
        amount: parseFloat(data.amount),
        currency: data.currency,
        bankAccount: {
            accountNumber: data.accountNumber,
            accountName: data.accountName,
            bankName: data.bankName,
            bankCode: data.bankCode || '',
        },
    });
    return response.data;
};
