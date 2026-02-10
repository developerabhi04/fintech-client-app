// Supported countries
export const COUNTRIES = {
    UGANDA: 'UG',
    USA: 'US',
    CHINA: 'CN',
};

// Country details with flags
export const COUNTRY_OPTIONS = [
    { code: 'UG', name: 'Uganda', flag: '🇺🇬', currency: 'UGX' },
    { code: 'US', name: 'USA', flag: '🇺🇸', currency: 'USD' },
    { code: 'CN', name: 'China', flag: '🇨🇳', currency: 'CNY' },
];

// Supported currencies
export const CURRENCIES = {
    UGX: 'UGX',
    USD: 'USD',
    CNY: 'CNY',
};

// Currency details
export const CURRENCY_OPTIONS = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
];

// **CRITICAL: Transfer corridor rules**
export const ALLOWED_CORRIDORS = [
    { from: 'UG', to: 'US' },
    { from: 'US', to: 'UG' },
    { from: 'UG', to: 'CN' },
    { from: 'CN', to: 'UG' },
];

// **BLOCKED: USA ↔ China transfers**
export const BLOCKED_CORRIDORS = [
    { from: 'US', to: 'CN' },
    { from: 'CN', to: 'US' },
];

// Transaction types
export const TRANSACTION_TYPES = {
    DEPOSIT: 'deposit',
    WITHDRAWAL: 'withdrawal',
    TRANSFER_SENT: 'transfer_sent',
    TRANSFER_RECEIVED: 'transfer_received',
};

// Transaction status
export const TRANSACTION_STATUS = {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
};

// KYC status
export const KYC_STATUS = {
    NOT_STARTED: 'not_started',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
};

// API endpoints
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        VERIFY_EMAIL: '/auth/verify-email',
        VERIFY_LOGIN: '/auth/verify-login',
        RESEND_VERIFICATION: '/auth/resend-verification',
        LOGOUT: '/auth/logout',
        ME: '/auth/me',
        FORGOT_PASSWORD: '/auth/forgot-password',
        RESET_PASSWORD: '/auth/reset-password',
    },
    WALLET: {
        GET: '/wallet',
        ADD_MONEY: '/wallet/add-money',
        WITHDRAW: '/wallet/withdraw',
    },
    PAYMENT: {
        SEND: '/payment/send',
        EXCHANGE_RATE: '/payment/exchange-rate',
        ALLOWED_DESTINATIONS: '/payment/allowed-destinations',
        VALIDATE_CORRIDOR: '/payment/validate-corridor',
    },
    TRANSACTIONS: {
        GET_ALL: '/transactions',
        GET_ONE: '/transactions',
        GET_RECENT: '/transactions/recent',
        GET_STATS: '/transactions/stats',
        BY_REFERENCE: '/transactions/reference',
    },
};
