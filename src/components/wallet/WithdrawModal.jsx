import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { withdrawMoneySchema } from '../../validations/wallet.schema';
import { withdrawMoney } from '../../services/wallet.service';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const WithdrawModal = ({ isOpen, onClose, onSuccess, wallet }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(withdrawMoneySchema),
    });

    const selectedCurrency = watch('currency');
    const amount = watch('amount');

    const currencyOptions = [
        { value: 'USD', label: 'USD - US Dollar' },
        { value: 'UGX', label: 'UGX - Ugandan Shilling' },
        { value: 'CNY', label: 'CNY - Chinese Yuan' },
    ];

    const getAvailableBalance = () => {
        if (!selectedCurrency || !wallet?.balances) return 0;
        return wallet.balances[selectedCurrency] || 0;
    };

    const onSubmit = async (data) => {
        const available = getAvailableBalance();
        if (parseFloat(data.amount) > available) {
            toast.error('Insufficient balance');
            return;
        }

        setIsLoading(true);
        try {
            await withdrawMoney(data);
            toast.success('Withdrawal request submitted successfully!');
            reset();
            onClose();
            if (onSuccess) onSuccess();
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to withdraw money';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Withdraw Money" maxWidth="max-w-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Select
                    label="Currency"
                    options={currencyOptions}
                    placeholder="Select currency"
                    error={errors.currency?.message}
                    {...register('currency')}
                />

                {selectedCurrency && (
                    <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-sm text-gray-600">
                            Available Balance:{' '}
                            <span className="font-semibold text-gray-800">
                                {getAvailableBalance().toFixed(2)} {selectedCurrency}
                            </span>
                        </p>
                    </div>
                )}

                <Input
                    label="Amount"
                    type="number"
                    step="0.01"
                    placeholder="Enter amount"
                    error={errors.amount?.message}
                    {...register('amount')}
                />

                <div className="border-t pt-5">
                    <h3 className="font-semibold text-gray-800 mb-4">Bank Account Details</h3>

                    <div className="space-y-4">
                        <Input
                            label="Account Number"
                            type="text"
                            placeholder="Enter account number"
                            error={errors.accountNumber?.message}
                            {...register('accountNumber')}
                        />

                        <Input
                            label="Account Name"
                            type="text"
                            placeholder="Enter account name"
                            error={errors.accountName?.message}
                            {...register('accountName')}
                        />

                        <Input
                            label="Bank Name"
                            type="text"
                            placeholder="Enter bank name"
                            error={errors.bankName?.message}
                            {...register('bankName')}
                        />

                        <Input
                            label="Bank Code (Optional)"
                            type="text"
                            placeholder="Enter bank code"
                            error={errors.bankCode?.message}
                            {...register('bankCode')}
                        />
                    </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Withdrawal requests are processed within 1-3 business days.
                        Processing fees may apply.
                    </p>
                </div>

                <div className="flex gap-3">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        fullWidth
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        loading={isLoading}
                        disabled={isLoading}
                        fullWidth
                    >
                        Withdraw
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default WithdrawModal;
