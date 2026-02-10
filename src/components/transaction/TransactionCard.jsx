import { IoArrowUp, IoArrowDown } from 'react-icons/io5';
import { formatDateTime } from '../../utils/formatDate';
import { formatAmount } from '../../utils/formatCurrency';
import Card from '../ui/Card';
import clsx from 'clsx';

const TransactionCard = ({ transaction, onClick }) => {
    const isCredit = transaction.type === 'deposit' || transaction.type === 'transfer_received';

    return (
        <Card hover onClick={onClick} className="cursor-pointer">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div
                        className={clsx(
                            'w-12 h-12 rounded-full flex items-center justify-center',
                            isCredit ? 'bg-green-100' : 'bg-red-100'
                        )}
                    >
                        {isCredit ? (
                            <IoArrowDown className="text-green-600" size={24} />
                        ) : (
                            <IoArrowUp className="text-red-600" size={24} />
                        )}
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800">
                            {transaction.recipient?.name || transaction.sender?.name || 'Transaction'}
                        </p>
                        <p className="text-sm text-gray-500">{formatDateTime(transaction.createdAt)}</p>
                    </div>
                </div>

                <div className="text-right">
                    <p
                        className={clsx(
                            'text-lg font-bold',
                            isCredit ? 'text-green-600' : 'text-red-600'
                        )}
                    >
                        {isCredit ? '+' : '-'}{formatAmount(transaction.amount, transaction.currency)}
                    </p>
                    <p
                        className={clsx(
                            'text-xs font-semibold capitalize',
                            transaction.status === 'completed' && 'text-green-600',
                            transaction.status === 'pending' && 'text-yellow-600',
                            transaction.status === 'failed' && 'text-red-600'
                        )}
                    >
                        {transaction.status}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default TransactionCard;
