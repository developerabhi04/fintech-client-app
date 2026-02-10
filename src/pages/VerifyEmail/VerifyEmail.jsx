import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../services/auth.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import VerificationSuccess from '../VerificationSuccess/VerificationSuccess';
import VerificationError from '../VerificationError/VerificationError';

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('');
    const hasVerified = useRef(false); // Prevent double calls

    const token = searchParams.get('token');

    useEffect(() => {
        const verify = async () => {
            // Prevent double execution in StrictMode
            if (hasVerified.current) {
                console.log('⚠️ Already verified, skipping duplicate call');
                return;
            }

            if (!token) {
                setStatus('error');
                setMessage('Verification token is missing');
                return;
            }

            hasVerified.current = true; // Mark as verified

            try {
                console.log('🔍 Verifying email with token:', token);

                const response = await verifyEmail(token);

                console.log('✅ Frontend received response:', response);

                setStatus('success');
                setMessage(response.message || 'Email verified successfully!');

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    navigate('/login', {
                        state: { message: 'Email verified! You can now login.' }
                    });
                }, 3000);

            } catch (error) {
                console.error('❌ Verification error:', error);
                console.error('❌ Error response:', error.response);

                setStatus('error');

                // Handle specific error messages
                const errorMessage = error.response?.data?.message ||
                    error.response?.data?.error ||
                    error.message ||
                    'Verification failed. Please try again.';

                setMessage(errorMessage);
            }
        };

        verify();
    }, []); // Empty dependency array - only run once

    if (status === 'loading') {
        return <LoadingSpinner message="Verifying your email..." />;
    }

    if (status === 'success') {
        return <VerificationSuccess message={message} redirectTo="/login" />;
    }

    return <VerificationError message={message} />;
};

export default VerifyEmail;
