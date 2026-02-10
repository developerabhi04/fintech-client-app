import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    IoSend,
    IoAdd,
    IoRemove,
    IoTrendingUp,
    IoArrowForward
} from 'react-icons/io5';
import DashboardLayout from '../../components/layout/DashboardLayout';
import WalletCard from '../../components/wallet/WalletCard';
import TransactionCard from '../../components/transaction/TransactionCard';
import TransactionDetails from '../../components/transaction/TransactionDetails';
import AddMoneyModal from '../../components/wallet/AddMoneyModal';
import WithdrawModal from '../../components/wallet/WithdrawModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import PageHeader from '../../components/common/PageHeader';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useAuth } from '../../context/AuthContext';
import { getWallet } from '../../services/wallet.service';
import { getRecentTransactions } from '../../services/transaction.service';
import toast from 'react-hot-toast';

const Dashboard = () => {
    const { user } = useAuth();
    const [wallet, setWallet] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddMoney, setShowAddMoney] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        setLoading(true);
        try {
            const [walletRes, transactionsRes] = await Promise.all([
                getWallet(),
                getRecentTransactions(),
            ]);
            setWallet(walletRes.data.wallet);
            setTransactions(transactionsRes.data.transactions);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading dashboard..." />;
    }

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <PageHeader
                    title={`Welcome back, ${user?.firstName}! 👋`}
                    subtitle="Here's what's happening with your account today"
                />

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Button
                        onClick={() => setShowAddMoney(true)}
                        variant="primary"
                        className="h-20 text-lg"
                    >
                        <IoAdd size={24} />
                        Add Money
                    </Button>
                    <Link to="/send-money" className="block">
                        <Button variant="primary" fullWidth className="h-20 text-lg">
                            <IoSend size={24} />
                            Send Money
                        </Button>
                    </Link>
                    <Button
                        onClick={() => setShowWithdraw(true)}
                        variant="secondary"
                        className="h-20 text-lg"
                    >
                        <IoRemove size={24} />
                        Withdraw
                    </Button>
                </div>

                {/* Wallet Card */}
                <div className="mb-8">
                    <WalletCard wallet={wallet} />
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Sent</p>
                                <p className="text-2xl font-bold text-gray-800">$0.00</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <IoSend className="text-blue-600" size={24} />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Total Received</p>
                                <p className="text-2xl font-bold text-gray-800">$0.00</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <IoTrendingUp className="text-green-600" size={24} />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm mb-1">Transactions</p>
                                <p className="text-2xl font-bold text-gray-800">{transactions.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <IoArrowForward className="text-purple-600" size={24} />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Recent Transactions */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Recent Transactions</h2>
                        <Link to="/transactions">
                            <Button variant="ghost">
                                View All
                                <IoArrowForward className="ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {transactions.length === 0 ? (
                        <Card>
                            <div className="text-center py-12">
                                <p className="text-gray-500 mb-4">No transactions yet</p>
                                <Link to="/send-money">
                                    <Button>Send Your First Transfer</Button>
                                </Link>
                            </div>
                        </Card>
                    ) : (
                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction._id}
                                    transaction={transaction}
                                    onClick={() => setSelectedTransaction(transaction)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Modals */}
                <AddMoneyModal
                    isOpen={showAddMoney}
                    onClose={() => setShowAddMoney(false)}
                    onSuccess={loadDashboardData}
                />

                <WithdrawModal
                    isOpen={showWithdraw}
                    onClose={() => setShowWithdraw(false)}
                    onSuccess={loadDashboardData}
                    wallet={wallet}
                />

                <TransactionDetails
                    isOpen={!!selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                    transaction={selectedTransaction}
                />
            </motion.div>
        </DashboardLayout>
    );
};

export default Dashboard;
