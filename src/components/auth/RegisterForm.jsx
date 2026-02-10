import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { IoMail, IoLockClosed, IoPerson, IoCall, IoFlag } from 'react-icons/io5';
import { registerSchema } from '../../validations/auth.schema';
import { register as registerUser } from '../../services/auth.service';
import { COUNTRY_OPTIONS } from '../../utils/constants';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await registerUser(data);
            toast.success(response.message);
            // Navigate to check email page
            navigate('/check-email', {
                state: {
                    email: data.email,
                    type: 'register'
                }
            });
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const countryOptions = COUNTRY_OPTIONS.map((country) => ({
        value: country.code,
        label: `${country.flag} ${country.name}`,
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Input
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                    icon={IoPerson}
                    error={errors.firstName?.message}
                    {...register('firstName')}
                />

                <Input
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                    icon={IoPerson}
                    error={errors.lastName?.message}
                    {...register('lastName')}
                />
            </div>

            <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                icon={IoMail}
                error={errors.email?.message}
                {...register('email')}
            />

            <Select
                label="Country"
                options={countryOptions}
                placeholder="Select your country"
                error={errors.country?.message}
                {...register('country')}
            />

            <Input
                label="Phone Number (Optional)"
                type="tel"
                placeholder="+1234567890"
                icon={IoCall}
                error={errors.phone?.message}
                {...register('phone')}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                icon={IoLockClosed}
                error={errors.password?.message}
                {...register('password')}
            />

            <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={IoLockClosed}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
            />

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                    <strong>Password requirements:</strong>
                </p>
                <ul className="text-xs text-blue-700 mt-2 space-y-1 list-disc list-inside">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One special character</li>
                </ul>
            </div>

            <label className="flex items-start gap-2">
                <input
                    type="checkbox"
                    required
                    className="w-4 h-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="text-sm text-gray-600">
                    I agree to the{' '}
                    <Link to="/terms" className="text-primary-600 hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-primary-600 hover:underline">
                        Privacy Policy
                    </Link>
                </span>
            </label>

            <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                fullWidth
            >
                Create Account
            </Button>

            <p className="text-center text-gray-600">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                    Login
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;
