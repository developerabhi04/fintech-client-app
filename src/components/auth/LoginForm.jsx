import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { IoMail, IoLockClosed } from 'react-icons/io5';
import { loginSchema } from '../../validations/auth.schema';
import { login } from '../../services/auth.service';
import Input from '../ui/Input';
import Button from '../ui/Button';
import toast from 'react-hot-toast';

const LoginForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await login(data);
            toast.success(response.message);
            // Navigate to check email page
            navigate('/check-email', {
                state: {
                    email: data.email,
                    type: 'login'
                }
            });
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                icon={IoMail}
                error={errors.email?.message}
                {...register('email')}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={IoLockClosed}
                error={errors.password?.message}
                {...register('password')}
            />

            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link
                    to="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                    Forgot password?
                </Link>
            </div>

            <Button
                type="submit"
                loading={isLoading}
                disabled={isLoading}
                fullWidth
            >
                Login
            </Button>

            <p className="text-center text-gray-600">
                Don't have an account?{' '}
                <Link
                    to="/register"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                    Sign up
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
