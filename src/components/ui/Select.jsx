import { forwardRef } from 'react';
import clsx from 'clsx';

const Select = forwardRef(({
    label,
    options = [],
    error,
    placeholder = 'Select...',
    className = '',
    ...props
}, ref) => {
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
                    error ? 'border-red-500' : 'border-gray-300',
                    className
                )}
                {...props}
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
});

Select.displayName = 'Select';

export default Select;
