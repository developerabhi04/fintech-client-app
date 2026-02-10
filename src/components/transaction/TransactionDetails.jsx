import { IoClose, IoCheckmarkCircle, IoTime, IoCloseCircle } from 'react-icons/io5';
import { formatDateTime } from '../../utils/formatDate';
import { formatAmount } from '../../utils/formatCurrency';
import Modal from '../ui/Modal';
import clsx from 'clsx';

const TransactionDetails = ({ isOpen, onClose, transaction }) => {
    if (!transaction) return null;

    const getStatusIcon = (status) => {
        const icons = {
            completed: <IoCheckmarkCircle className="text-green-500" size={48} />,
            pending: <IoTime className="text-yellow-500" size={48} />,
            failed: <IoCloseCircle className="text-red-500" size={48} />,
        };
        return icons[status] || null;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Transaction Details" maxWidth="max-w-lg">
            <div className="space-y-6">
                {/* Status Icon */}
                <div className="flex justify-center">
                    {getStatusIcon(transaction.status)}
                </div>

                {/* Amount */}
                <div className="text-center">
                    <p className="text-3xl font-bold text-gray-800">
                        {formatAmount(transaction.amount, transaction.currency)}
                    </p>
                    <p className="text-gray-500 mt-1 capitalize">{transaction.type.replace('_', ' ')}</p>
                </div>

                {/* Details */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Reference</span>
                        <span className="font-mono text-sm font-semibold">{transaction.reference}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span
                            className={clsx(
                                'font-semibold capitalize',
                                transaction.status === 'completed' && 'text-green-600',
                                transaction.status === 'pending' && 'text-yellow-600',
                                transaction.status === 'failed' && 'text-red-600'
                            )}
                        >
                            {transaction.status}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-600">Date</span>
                        <span className="font-semibold">{formatDateTime(transaction.createdAt)}</span>
                    </div>

                    {transaction.recipient && (
                        <>
                            <div className="border-t pt-3">
                                <p className="text-gray-600 mb-2">Recipient</p>
                                <p className="font-semibold">{transaction.recipient.name}</p>
                                <p className="text-sm text-gray-500">{transaction.recipient.email}</p>
                            </div>
                        </>
                    )}

                    {transaction.sender && (
                        <>
                            <div className="border-t pt-3">
                                <p className="text-gray-600 mb-2">Sender</p>
                                <p className="font-semibold">{transaction.sender.name}</p>
                                <p className="text-sm text-gray-500">{transaction.sender.email}</p>
                            </div>
                        </>
                    )}

                    {transaction.fee > 0 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Fee</span>
                            <span className="font-semibold">
                                {formatAmount(transaction.fee, transaction.currency)}
                            </span>
                        </div>
                    )}

                    {transaction.exchangeRate && transaction.exchangeRate !== 1 && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Exchange Rate</span>
                            <span className="font-semibold">{transaction.exchangeRate.toFixed(4)}</span>
                        </div>
                    )}

                    {transaction.description && (
                        <div className="border-t pt-3">
                            <p className="text-gray-600 mb-1">Description</p>
                            <p className="text-gray-800">{transaction.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default TransactionDetails;
