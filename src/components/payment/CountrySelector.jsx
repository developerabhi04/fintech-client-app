import { forwardRef } from 'react';
import { COUNTRY_OPTIONS } from '../../utils/constants';
import { getAllowedDestinations, getBlockedDestinations } from '../../utils/corridorValidation';
import clsx from 'clsx';

const CountrySelector = forwardRef(({
    label,
    sourceCountry,
    error,
    ...props
}, ref) => {
    const allowedDestinations = sourceCountry ? getAllowedDestinations(sourceCountry) : [];
    const blockedDestinations = sourceCountry ? getBlockedDestinations(sourceCountry) : [];

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <select
                ref={ref}
                className={clsx(
                    'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white',
                    error ? 'border-red-500' : 'border-gray-300'
                )}
                {...props}
            >
                <option value="">Select recipient country</option>
                {COUNTRY_OPTIONS.map((country) => {
                    const isAllowed = allowedDestinations.includes(country.code);
                    const isBlocked = blockedDestinations.includes(country.code);
                    const isSource = country.code === sourceCountry;

                    return (
                        <option
                            key={country.code}
                            value={country.code}
                            disabled={isBlocked || isSource || !isAllowed}
                        >
                            {country.flag} {country.name}
                            {isSource && ' (Your country)'}
                            {isBlocked && ' (Not available)'}
                        </option>
                    );
                })}
            </select>

            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}

            {sourceCountry && (
                <div className="mt-2 text-xs text-gray-500">
                    <p>
                        ✅ Available destinations from {COUNTRY_OPTIONS.find(c => c.code === sourceCountry)?.name}
                    </p>
                    {blockedDestinations.length > 0 && (
                        <p className="text-red-600 mt-1">
                            ❌ Transfers to {COUNTRY_OPTIONS.find(c => c.code === blockedDestinations[0])?.name} are not supported
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});

CountrySelector.displayName = 'CountrySelector';

export default CountrySelector;
