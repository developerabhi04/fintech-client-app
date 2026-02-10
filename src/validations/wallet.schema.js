import { z } from 'zod';

// Add money schema
export const addMoneySchema = z.object({
    amount: z
        .string()
        .min(1, 'Amount is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Amount must be greater than 0',
        }),
    currency: z.enum(['USD', 'UGX', 'CNY'], {
        errorMap: () => ({ message: 'Please select a currency' }),
    }),
    paymentMethod: z.string().min(1, 'Payment method is required'),
});

// Withdraw money schema
export const withdrawMoneySchema = z.object({
    amount: z
        .string()
        .min(1, 'Amount is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Amount must be greater than 0',
        }),
    currency: z.enum(['USD', 'UGX', 'CNY'], {
        errorMap: () => ({ message: 'Please select a currency' }),
    }),
    accountNumber: z.string().min(1, 'Account number is required'),
    accountName: z.string().min(1, 'Account name is required'),
    bankName: z.string().min(1, 'Bank name is required'),
    bankCode: z.string().optional().or(z.literal('')),
});
