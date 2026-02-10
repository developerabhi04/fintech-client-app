import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoFilter, IoSearch, IoDownload } from 'react-icons/io5';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PageHeader from '../../components/common/PageHeader';
import TransactionTable from '../../components/transaction/TransactionTable';
import TransactionDetails from '../../components/transaction/TransactionDetails';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Card from '../../components/ui/Card';
import { getTransactions } from '../../services/transaction.service';
import toast from 'react-hot-toast';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    loadTransactions();
  }, [filters]);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const queryParams = {};
      if (filters.type) queryParams.type = filters.type;
      if (filters.status) queryParams.status = filters.status;
      
      const response = await getTransactions(queryParams);
      let data = response.data.transactions;

      // Client-side search filter
      if (filters.search) {
        data = data.filter((t) =>
          t.reference.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.recipient?.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          t.sender?.name?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      setTransactions(data);
    } catch (error) {
      toast.error('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    toast.success('Export feature coming soon!');
  };

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'deposit', label: 'Deposit' },
    { value: 'withdrawal', label: 'Withdrawal' },
    { value: 'transfer_sent', label: 'Transfer Sent' },
    { value: 'transfer_received', label: 'Transfer Received' },
  ];

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'failed', label: 'Failed' },
  ];

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <PageHeader
          title="Transactions"
          subtitle="View and manage all your transactions"
          action={
            <Button onClick={handleExport} variant="secondary">
              <IoDownload className="mr-2" />
              Export
            </Button>
          }
        />

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search transactions..."
              icon={IoSearch}
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />

            <Select
              options={typeOptions}
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            />

            <Select
              options={statusOptions}
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            />

            <Button
              onClick={() => setFilters({ type: '', status: '', search: '' })}
              variant="secondary"
              fullWidth
            >
              <IoFilter className="mr-2" />
              Clear Filters
            </Button>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card>
          {loading ? (
            <LoadingSpinner fullScreen={false} message="Loading transactions..." />
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No transactions found</p>
              <p className="text-sm text-gray-400">
                {filters.type || filters.status || filters.search
                  ? 'Try adjusting your filters'
                  : 'Start by sending or receiving money'}
              </p>
            </div>
          ) : (
            <>
              <TransactionTable
                transactions={transactions}
                onRowClick={(transaction) => setSelectedTransaction(transaction)}
              />
              <div className="mt-4 text-sm text-gray-500 text-center">
                Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
              </div>
            </>
          )}
        </Card>

        {/* Transaction Details Modal */}
        <TransactionDetails
          isOpen={!!selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />
      </motion.div>
    </DashboardLayout>
  );
};

export default Transactions;
