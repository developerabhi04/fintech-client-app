import api from './api';
import { API_ENDPOINTS } from '../utils/constants';

/**
 * Send money (cross-border transfer)
 * @param {object} data - Transfer data
 * @returns {Promise<object>} Response data
 */
export const sendMoney = async (data) => {
    const response = await api.post(API_ENDPOINTS.PAYMENT.SEND, {
        recipientEmail: data.recipientEmail,
        recipientName: data.recipientName,
        recipientCountry: data.recipientCountry,
        amount: parseFloat(data.amount),
        currency: data.currency,
        description: data.description || '',
    });
    return response.data;
};

/**
 * Get exchange rate
 * @param {string} fromCurrency - Source currency
 * @param {string} toCurrency - Target currency
 * @param {number} amount - Amount to convert
 * @returns {Promise<object>} Exchange rate data
 */
export const getExchangeRate = async (fromCurrency, toCurrency, amount) => {
    const response = await api.get(
        `${API_ENDPOINTS.PAYMENT.EXCHANGE_RATE}?fromCurrency=${fromCurrency}&toCurrency=${toCurrency}&amount=${amount}`
    );
    return response.data;
};

/**
 * Get allowed destination countries
 * @param {string} country - Source country code
 * @returns {Promise<object>} Allowed destinations
 */
export const getAllowedDestinations = async (country) => {
    const response = await api.get(`${API_ENDPOINTS.PAYMENT.ALLOWED_DESTINATIONS}/${country}`);
    return response.data;
};

/**
 * Validate transfer corridor
 * @param {string} fromCountry - Source country
 * @param {string} toCountry - Destination country
 * @returns {Promise<object>} Validation result
 */
export const validateCorridor = async (fromCountry, toCountry) => {
    const response = await api.post(API_ENDPOINTS.PAYMENT.VALIDATE_CORRIDOR, {
        fromCountry,
        toCountry,
    });
    return response.data;
};
