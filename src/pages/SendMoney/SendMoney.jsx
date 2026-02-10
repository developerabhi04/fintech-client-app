import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import PageHeader from '../../components/common/PageHeader';
import SendMoneyForm from '../../components/payment/SendMoneyForm';
import Card from '../../components/ui/Card';

const SendMoney = () => {
    return (
        <DashboardLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <PageHeader
                    title="Send Money"
                    subtitle="Transfer money across borders securely"
                />

                <div className="max-w-3xl mx-auto">
                    <SendMoneyForm />
                </div>

                {/* Info Section */}
                <div className="max-w-3xl mx-auto mt-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-primary-50 border border-blue-100">
                        <h3 className="font-semibold text-gray-800 mb-3">
                            Transfer Information
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Transfers are processed instantly</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Secure and encrypted transactions</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-green-500">✓</span>
                                <span>Competitive exchange rates</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500">⚠</span>
                                <span>Note: Transfers between USA and China are not currently supported</span>
                            </li>
                        </ul>
                    </Card>
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default SendMoney;
