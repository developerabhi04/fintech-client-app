import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CheckEmailMessage from '../../components/auth/CheckEmailMessage';
import Button from '../../components/ui/Button';
import { resendVerification } from '../../services/auth.service';
import toast from 'react-hot-toast';

const CheckEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isResending, setIsResending] = useState(false);

    const { email, type } = location.state || {};

    // Redirect if no email in state
    if (!email) {
        navigate('/login');
        return null;
    }

    const handleResend = async () => {
        setIsResending(true);
        try {
            await resendVerification(email);
            toast.success('Verification email sent successfully!');
        } catch (error) {
            toast.error('Failed to resend email. Please try again.');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <CheckEmailMessage email={email} type={type} />

                    <div className="mt-8 space-y-3">
                        <p className="text-center text-sm text-gray-600">
                            Didn't receive the email?
                        </p>
                        <Button
                            onClick={handleResend}
                            loading={isResending}
                            disabled={isResending}
                            variant="secondary"
                            fullWidth
                        >
                            Resend Verification Email
                        </Button>
                        <Button
                            onClick={() => navigate('/login')}
                            variant="ghost"
                            fullWidth
                        >
                            Back to Login
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CheckEmail;
