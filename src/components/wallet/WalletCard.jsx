import { motion } from 'framer-motion';
import { IoWallet, IoTrendingUp, IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from 'react';
import { formatAmount } from '../../utils/formatCurrency';
import Card from '../ui/Card';

const WalletCard = ({ wallet }) => {
    const [showBalance, setShowBalance] = useState(true);

    const getTotalBalance = () => {
        if (!wallet?.balances) return 0;
        // Primary currency display (USD)
        return wallet.balances.USD || 0;
    };

    return (
        <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white">
            <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <IoWallet size={24} />
                    </div>
                    <div>
                        <p className="text-white/80 text-sm">Total Balance</p>
                        <p className="text-xs text-white/60">Multi-currency wallet</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                    {showBalance ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                </button>
            </div>

            <div className="mb-6">
                <motion.h2
                    key={showBalance ? 'visible' : 'hidden'}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-2"
                >
                    {showBalance ? formatAmount(getTotalBalance(), 'USD') : '••••••'}
                </motion.h2>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                    <IoTrendingUp size={16} />
                    <span>Primary currency: USD</span>
                </div>
            </div>

            {wallet?.balances && (
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                    <div>
                        <p className="text-white/60 text-xs mb-1">USD</p>
                        <p className="text-white font-semibold">
                            {showBalance ? formatAmount(wallet.balances.USD || 0, 'USD') : '••••'}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs mb-1">UGX</p>
                        <p className="text-white font-semibold">
                            {showBalance ? formatAmount(wallet.balances.UGX || 0, 'UGX') : '••••'}
                        </p>
                    </div>
                    <div>
                        <p className="text-white/60 text-xs mb-1">CNY</p>
                        <p className="text-white font-semibold">
                            {showBalance ? formatAmount(wallet.balances.CNY || 0, 'CNY') : '••••'}
                        </p>
                    </div>
                </div>
            )}
        </Card>
    );
};

export default WalletCard;
