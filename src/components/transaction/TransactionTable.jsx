import { IoArrowUp, IoArrowDown, IoSwapHorizontal, IoTime } from 'react-icons/io5';
import { formatDateTime } from '../../utils/formatDate';
import { formatAmount } from '../../utils/formatCurrency';
import Table from '../ui/Table';
import clsx from 'clsx';

const TransactionTable = ({ transactions, onRowClick }) => {
    const getStatusColor = (status) => {
        const colors = {
            completed: 'text-green-600 bg-green-100',
            pending: 'text-yellow-600 bg-yellow-100',
            failed: 'text-red-600 bg-red-100',
            cancelled: 'text-gray-600 bg-gray-100',
        };
        return colors[status] || 'text-gray-600 bg-gray-100';
    };

    const getTypeIcon = (type) => {
        const icons = {
            deposit: <IoArrowDown className="text-green-500" />,
            withdrawal: <IoArrowUp className="text-red-500" />,
            transfer_sent: <IoArrowUp className="text-blue-500" />,
            transfer_received: <IoArrowDown className="text-green-500" />,
        };
        return icons[type] || <IoSwapHorizontal />;
    };

    const getTypeName = (type) => {
        const names = {
            deposit: 'Deposit',
            withdrawal: 'Withdrawal',
            transfer_sent: 'Sent',
            transfer_received: 'Received',
        };
        return names[type] || type;
    };

    const columns = [
        {
            key: 'type',
            label: 'Type',
            render: (row) => (
                <div className="flex items-center gap-2">
                    {getTypeIcon(row.type)}
                    <span className="font-medium">{getTypeName(row.type)}</span>
                </div>
            ),
        },
        {
            key: 'reference',
            label: 'Reference',
            render: (row) => (
                <span className="text-sm text-gray-600 font-mono">{row.reference}</span>
            ),
        },
        {
            key: 'amount',
            label: 'Amount',
            render: (row) => (
                <span className="font-semibold">
                    {formatAmount(row.amount, row.currency)}
                </span>
            ),
        },
        {
            key: 'recipient',
            label: 'Details',
            render: (row) => (
                <div className="text-sm">
                    {row.recipient && (
                        <p className="text-gray-800">{row.recipient.name}</p>
                    )}
                    {row.sender && (
                        <p className="text-gray-800">{row.sender.name}</p>
                    )}
                    {row.description && (
                        <p className="text-gray-500 text-xs">{row.description}</p>
                    )}
                </div>
            ),
        },
        {
            key: 'status',
            label: 'Status',
            render: (row) => (
                <span
                    className={clsx(
                        'px-3 py-1 rounded-full text-xs font-semibold',
                        getStatusColor(row.status)
                    )}
                >
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
            ),
        },
        {
            key: 'createdAt',
            label: 'Date',
            render: (row) => (
                <span className="text-sm text-gray-600">
                    {formatDateTime(row.createdAt)}
                </span>
            ),
        },
    ];

    return <Table columns={columns} data={transactions} onRowClick={onRowClick} />;
};

export default TransactionTable;
