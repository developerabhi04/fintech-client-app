import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addMoneySchema } from '../../validations/wallet.schema';
import { addMoney } from '../../services/wallet.service';
import Modal from '../ui/Modal';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const AddMoneyModal = ({ isOpen, onClose, onSuccess }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(addMoneySchema),
    });

    const currencyOptions = [
        { value: 'USD', label: 'USD - US Dollar' },
        { value: 'UGX', label: 'UGX - Ugandan Shilling' },
        { value: 'CNY', label: 'CNY - Chinese Yuan' },
    ];

    const paymentMethodOptions = [
        { value: 'card', label: 'Credit/Debit Card' },
        { value: 'bank_transfer', label: 'Bank Transfer' },
        { value: 'mobile_money', label: 'Mobile Money' },
    ];

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await addMoney({
                ...data,
                amount: parseFloat(data.amount),
            });
            toast.success('Money added successfully!');
            reset();
            onClose();
            if (onSuccess) onSuccess();
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to add money';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Money to Wallet">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Select
                    label="Currency"
                    options={currencyOptions}
                    placeholder="Select currency"
                    error={errors.currency?.message}
                    {...register('currency')}
                />

                <Input
                    label="Amount"
                    type="number"
                    step="0.01"
                    placeholder="Enter amount"
                    error={errors.amount?.message}
                    {...register('amount')}
                />

                <Select
                    label="Payment Method"
                    options={paymentMethodOptions}
                    placeholder="Select payment method"
                    error={errors.paymentMethod?.message}
                    {...register('paymentMethod')}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                        <strong>Note:</strong> A processing fee may apply depending on your payment method.
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
                        Add Money
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddMoneyModal;
