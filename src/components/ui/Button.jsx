import { motion } from 'framer-motion';
import clsx from 'clsx';

const Button = ({
    children,
    variant = 'primary',
    type = 'button',
    onClick,
    disabled = false,
    loading = false,
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';

    const variants = {
        primary: 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-md hover:shadow-lg',
        secondary: 'bg-white text-primary-600 border-2 border-primary-500 hover:bg-primary-50',
        outline: 'bg-transparent border-2 border-gray-300 text-gray-700 hover:border-primary-500 hover:text-primary-600',
        danger: 'bg-red-500 text-white hover:bg-red-600 shadow-md hover:shadow-lg',
        ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                baseStyles,
                variants[variant],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {loading ? (
                <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                </>
            ) : (
                children
            )}
        </motion.button>
    );
};

export default Button;
