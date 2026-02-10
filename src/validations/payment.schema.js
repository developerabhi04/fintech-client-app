import { z } from 'zod';

// Send money schema
export const sendMoneySchema = z.object({
    recipientEmail: z
        .string()
        .min(1, 'Recipient email is required')
        .email('Invalid email address')
        .toLowerCase()
        .trim(),
    recipientName: z
        .string()
        .min(2, 'Recipient name must be at least 2 characters')
        .trim(),
    recipientCountry: z.enum(['UG', 'US', 'CN'], {
        errorMap: () => ({ message: 'Please select recipient country' }),
    }),
    amount: z
        .string()
        .min(1, 'Amount is required')
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: 'Amount must be greater than 0',
        }),
    currency: z.enum(['USD', 'UGX', 'CNY'], {
        errorMap: () => ({ message: 'Please select a currency' }),
    }),
    description: z
        .string()
        .max(200, 'Description must not exceed 200 characters')
        .optional()
        .or(z.literal('')),
});
