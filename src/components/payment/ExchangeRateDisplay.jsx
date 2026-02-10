import { motion } from 'framer-motion';
import { IoSwapVertical, IoTrendingUp } from 'react-icons/io5';
import Spinner from '../ui/Spinner';

const ExchangeRateDisplay = ({ rate, loading }) => {
    if (loading) {
        return (
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
                <Spinner size="sm" />
                <span className="ml-2 text-sm text-gray-600">Fetching exchange rate...</span>
            </div>
        );
    }

    if (!rate) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-50 to-blue-50 border border-primary-100 rounded-lg p-4"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <IoSwapVertical className="text-primary-600" size={20} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600">Exchange Rate</p>
                        <p className="text-lg font-bold text-gray-800">
                            1 {rate.sourceCurrency} = {rate.rate.toFixed(4)} {rate.targetCurrency}
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-500">You'll receive</p>
                    <p className="text-xl font-bold text-primary-600">
                        {rate.targetAmount.toFixed(2)} {rate.targetCurrency}
                    </p>
                </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs text-green-600">
                <IoTrendingUp size={14} />
                <span>Live exchange rate updated</span>
            </div>
        </motion.div>
    );
};

export default ExchangeRateDisplay;
