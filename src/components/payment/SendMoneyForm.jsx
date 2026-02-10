import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { IoMail, IoPerson, IoSend } from 'react-icons/io5';
import { sendMoneySchema } from '../../validations/payment.schema';
import { sendMoney, getExchangeRate } from '../../services/payment.service';
import { validateCorridor } from '../../utils/corridorValidation';
import { useAuth } from '../../context/AuthContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import CountrySelector from './CountrySelector';
import ExchangeRateDisplay from './ExchangeRateDisplay';
import toast from 'react-hot-toast';

const SendMoneyForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [loadingRate, setLoadingRate] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(sendMoneySchema),
        defaultValues: {
            currency: 'USD',
        },
    });

    const recipientCountry = watch('recipientCountry');
    const currency = watch('currency');
    const amount = watch('amount');

    // Validate corridor when recipient country changes
    useEffect(() => {
        if (recipientCountry) {
            const validation = validateCorridor(user?.country, recipientCountry);
            if (!validation.valid) {
                toast.error(validation.message);
                setValue('recipientCountry', '');
            }
        }
    }, [recipientCountry, user?.country, setValue]);

    // Fetch exchange rate when amount or currency changes
    useEffect(() => {
        const fetchRate = async () => {
            if (amount && currency && recipientCountry) {
                setLoadingRate(true);
                try {
                    const response = await getExchangeRate(currency, 'USD', parseFloat(amount));
                    setExchangeRate(response.data);
                } catch (error) {
                    console.error('Failed to fetch exchange rate:', error);
                } finally {
                    setLoadingRate(false);
                }
            }
        };

        const debounce = setTimeout(fetchRate, 500);
        return () => clearTimeout(debounce);
    }, [amount, currency, recipientCountry]);

    const onSubmit = async (data) => {
        // Final corridor validation
        const validation = validateCorridor(user?.country, data.recipientCountry);
        if (!validation.valid) {
            toast.error(validation.message);
            return;
        }

        setIsLoading(true);
        try {
            const response = await sendMoney(data);
            toast.success('Money sent successfully!');
            navigate('/transactions');
        } catch (error) {
            const message = error.response?.data?.message || 'Failed to send money';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Recipient Information */}
            <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Recipient Information
                </h3>

                <div className="space-y-4">
                    <Input
                        label="Recipient Email"
                        type="email"
                        placeholder="recipient@example.com"
                        icon={IoMail}
                        error={errors.recipientEmail?.message}
                        {...register('recipientEmail')}
                    />

                    <Input
                        label="Recipient Name"
                        type="text"
                        placeholder="Enter recipient's full name"
                        icon={IoPerson}
                        error={errors.recipientName?.message}
                        {...register('recipientName')}
                    />

                    <CountrySelector
                        label="Recipient Country"
                        sourceCountry={user?.country}
                        error={errors.recipientCountry?.message}
                        {...register('recipientCountry')}
                    />
                </div>
            </div>

            {/* Transfer Amount */}
            <div className="bg-white rounded-xl shadow-card p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Transfer Amount
                </h3>

                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Amount"
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            error={errors.amount?.message}
                            {...register('amount')}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Currency
                            </label>
                            <select
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                                {...register('currency')}
                            >
                                <option value="USD">USD - US Dollar</option>
                                <option value="UGX">UGX - Ugandan Shilling</option>
                                <option value="CNY">CNY - Chinese Yuan</option>
                            </select>
                            {errors.currency && (
                                <p className="mt-1 text-sm text-red-500">{errors.currency.message}</p>
                            )}
                        </div>
                    </div>

                    <Input
                        label="Description (Optional)"
                        type="text"
                        placeholder="What's this transfer for?"
                        error={errors.description?.message}
                        {...register('description')}
                    />

                    {/* Exchange Rate Display */}
                    {exchangeRate && (
                        <ExchangeRateDisplay
                            rate={exchangeRate}
                            loading={loadingRate}
                        />
                    )}
                </div>
            </div>

            {/* Transfer Summary */}
            <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-card p-6 border border-primary-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Transfer Summary
                </h3>

                <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                        <span>Transfer Amount</span>
                        <span className="font-semibold">
                            {amount || '0.00'} {currency}
                        </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                        <span>Transfer Fee (2%)</span>
                        <span className="font-semibold">
                            {amount ? (parseFloat(amount) * 0.02).toFixed(2) : '0.00'} {currency}
                        </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 flex justify-between text-lg font-bold text-gray-800">
                        <span>Total Amount</span>
                        <span className="text-primary-600">
                            {amount ? (parseFloat(amount) * 1.02).toFixed(2) : '0.00'} {currency}
                        </span>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                fullWidth
                className="text-lg py-4"
            >
                <IoSend className="mr-2" />
                Send Money
            </Button>

            {/* Warning Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Please ensure all recipient details are correct.
                    Transfers cannot be reversed once completed.
                </p>
            </div>
        </form>
    );
};

export default SendMoneyForm;
