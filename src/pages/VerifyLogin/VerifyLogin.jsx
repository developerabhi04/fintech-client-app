import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyLogin } from '../../services/auth.service';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const VerifyLogin = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // loading, success, error
    const [message, setMessage] = useState('');
    const hasVerified = useRef(false); // Prevent double calls

    const token = searchParams.get('token');

    useEffect(() => {
        const verify = async () => {
            // Prevent double execution
            if (hasVerified.current) {
                console.log('⚠️ Already verified login, skipping duplicate call');
                return;
            }

            if (!token) {
                setStatus('error');
                setMessage('Login verification token is missing');
                return;
            }

            hasVerified.current = true; // Mark as verified

            try {
                console.log('🔐 Verifying login with token:', token);

                const response = await verifyLogin(token);

                console.log('✅ Login verification response:', response);

                setStatus('success');
                setMessage(response.message || 'Login successful!');

                // Store user data if provided
                if (response.data?.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                // Short delay to show success message, then redirect
                setTimeout(() => {
                    navigate('/dashboard', { replace: true });
                }, 1500);

            } catch (error) {
                console.error('❌ Login verification error:', error);
                console.error('❌ Error details:', error.response);

                setStatus('error');

                const errorMessage = error.response?.data?.message ||
                    error.response?.data?.error ||
                    error.message ||
                    'Login verification failed';

                setMessage(errorMessage);

                // Redirect to login after 3 seconds on error
                setTimeout(() => {
                    navigate('/login', { replace: true });
                }, 3000);
            }
        };

        verify();
    }, []); // Empty deps - run once only

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <LoadingSpinner message="Completing your login..." />
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    {/* Success Icon */}
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg
                            className="w-10 h-10 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="3"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                    </div>

                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        🎉 Login Successful!
                    </h2>

                    <p className="text-gray-600 text-lg mb-6">
                        {message}
                    </p>

                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                        <svg
                            className="animate-spin h-4 w-4 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <span>Redirecting to dashboard...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Error Icon */}
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-10 h-10 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                    ❌ Login Failed
                </h2>

                <p className="text-gray-600 text-lg mb-6">
                    {message}
                </p>

                <p className="text-sm text-gray-500 mb-6">
                    Redirecting to login page...
                </p>

                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default VerifyLogin;
