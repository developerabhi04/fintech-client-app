import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoAdd, IoRemove, IoRefresh } from 'react-icons/io5';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PageHeader from '../../components/common/PageHeader';
import WalletCard from '../../components/wallet/WalletCard';
import WalletBalance from '../../components/wallet/WalletBalance';
import AddMoneyModal from '../../components/wallet/AddMoneyModal';
import WithdrawModal from '../../components/wallet/WithdrawModal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { getWallet } from '../../services/wallet.service';
import toast from 'react-hot-toast';

const Wallet = () => {
    const [wallet, setWallet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [showAddMoney, setShowAddMoney] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);

    useEffect(() => {
        loadWallet();
    }, []);

    const loadWallet = async () => {
        setLoading(true);
        try {
            const response = await getWallet();
            setWallet(response.data.wallet);
        } catch (error) {
            toast.error('Failed to load wallet');
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadWallet();
        setRefreshing(false);
        toast.success('Wallet refreshed');
    };

    if (loading) {
        return <LoadingSpinner message="Loading wallet..." />;
    }

    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <PageHeader
                    title="My Wallet"
                    subtitle="Manage your funds and view balances"
                    action={
                        <Button onClick={handleRefresh} variant="secondary" loading={refreshing}>
                            <IoRefresh className="mr-2" />
                            Refresh
                        </Button>
                    }
                />

                {/* Wallet Overview */}
                <div className="mb-8">
                    <WalletCard wallet={wallet} />
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <Button
                        onClick={() => setShowAddMoney(true)}
                        variant="primary"
                        className="h-16 text-lg"
                    >
                        <IoAdd size={24} className="mr-2" />
                        Add Money
                    </Button>
                    <Button
                        onClick={() => setShowWithdraw(true)}
                        variant="secondary"
                        className="h-16 text-lg"
                    >
                        <IoRemove size={24} className="mr-2" />
                        Withdraw Money
                    </Button>
                </div>

                {/* Currency Balances */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Currency Balances</h2>
                    <WalletBalance wallet={wallet} />
                </div>

                {/* Wallet Info */}
                <Card className="bg-gradient-to-br from-blue-50 to-primary-50 border border-blue-100">
                    <h3 className="font-semibold text-gray-800 mb-3">Wallet Information</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Multi-currency support (USD, UGX, CNY)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Instant deposits and withdrawals</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Secure and encrypted storage</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span>Real-time balance updates</span>
                        </li>
                    </ul>
                </Card>

                {/* Modals */}
                <AddMoneyModal
                    isOpen={showAddMoney}
                    onClose={() => setShowAddMoney(false)}
                    onSuccess={loadWallet}
                />

                <WithdrawModal
                    isOpen={showWithdraw}
                    onClose={() => setShowWithdraw(false)}
                    onSuccess={loadWallet}
                    wallet={wallet}
                />
            </motion.div>
        </DashboardLayout>
    );
};

export default Wallet;
