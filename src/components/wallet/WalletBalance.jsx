import { IoWallet, IoTrendingUp, IoTrendingDown } from 'react-icons/io5';
import { formatAmount } from '../../utils/formatCurrency';
import Card from '../ui/Card';

const WalletBalance = ({ wallet }) => {
    const currencies = [
        { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
        { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
        { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currencies.map((currency) => (
                <Card key={currency.code} hover>
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{currency.flag}</div>
                            <div>
                                <p className="text-sm text-gray-600">{currency.name}</p>
                                <p className="text-xs text-gray-500">{currency.code}</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                            <IoWallet className="text-primary-600" size={20} />
                        </div>
                    </div>

                    <div className="mb-2">
                        <p className="text-2xl font-bold text-gray-800">
                            {formatAmount(wallet?.balances?.[currency.code] || 0, currency.code)}
                        </p>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                        <IoTrendingUp className="text-green-500" size={16} />
                        <span className="text-gray-600">Available</span>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default WalletBalance;
