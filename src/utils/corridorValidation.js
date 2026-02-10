import { ALLOWED_CORRIDORS, BLOCKED_CORRIDORS } from './constants';

/**
 * **CRITICAL: Validate if transfer corridor is allowed**
 * @param {string} fromCountry - Source country code
 * @param {string} toCountry - Destination country code
 * @returns {object} Validation result
 */
export const validateCorridor = (fromCountry, toCountry) => {
    // Same country check
    if (fromCountry === toCountry) {
        return {
            valid: false,
            message: 'Cannot send money to the same country',
        };
    }

    // Check if blocked (USA ↔ China)
    const isBlocked = BLOCKED_CORRIDORS.some(
        (corridor) => corridor.from === fromCountry && corridor.to === toCountry
    );

    if (isBlocked) {
        return {
            valid: false,
            message: `Transfers between ${getCountryName(fromCountry)} and ${getCountryName(toCountry)} are not currently supported`,
            blocked: true,
        };
    }

    // Check if allowed
    const isAllowed = ALLOWED_CORRIDORS.some(
        (corridor) => corridor.from === fromCountry && corridor.to === toCountry
    );

    if (!isAllowed) {
        return {
            valid: false,
            message: `Transfer route from ${getCountryName(fromCountry)} to ${getCountryName(toCountry)} is not available`,
        };
    }

    return {
        valid: true,
        message: 'Transfer corridor is valid',
    };
};

/**
 * Get allowed destination countries for a source country
 * @param {string} fromCountry - Source country code
 * @returns {array} Array of allowed destination country codes
 */
export const getAllowedDestinations = (fromCountry) => {
    return ALLOWED_CORRIDORS
        .filter((corridor) => corridor.from === fromCountry)
        .map((corridor) => corridor.to);
};

/**
 * Get blocked destination countries for a source country
 * @param {string} fromCountry - Source country code
 * @returns {array} Array of blocked destination country codes
 */
export const getBlockedDestinations = (fromCountry) => {
    return BLOCKED_CORRIDORS
        .filter((corridor) => corridor.from === fromCountry)
        .map((corridor) => corridor.to);
};

/**
 * Check if specific corridor is allowed
 * @param {string} fromCountry - Source country
 * @param {string} toCountry - Destination country
 * @returns {boolean} True if allowed
 */
export const isCorridorAllowed = (fromCountry, toCountry) => {
    if (fromCountry === toCountry) return false;

    const isBlocked = BLOCKED_CORRIDORS.some(
        (corridor) => corridor.from === fromCountry && corridor.to === toCountry
    );

    if (isBlocked) return false;

    return ALLOWED_CORRIDORS.some(
        (corridor) => corridor.from === fromCountry && corridor.to === toCountry
    );
};

/**
 * Get country name from code
 * @param {string} countryCode - Country code
 * @returns {string} Country name
 */
const getCountryName = (countryCode) => {
    const names = {
        UG: 'Uganda',
        US: 'USA',
        CN: 'China',
    };
    return names[countryCode] || countryCode;
};
