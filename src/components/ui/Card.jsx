import { motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({
    children,
    className = '',
    hover = false,
    onClick,
    ...props
}) => {
    const Component = hover ? motion.div : 'div';

    return (
        <Component
            className={clsx(
                'bg-white rounded-xl shadow-card p-6 transition-all duration-200',
                hover && 'hover:shadow-xl hover:-translate-y-1 cursor-pointer',
                className
            )}
            onClick={onClick}
            whileHover={hover ? { y: -4 } : {}}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Card;
