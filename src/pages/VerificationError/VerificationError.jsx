import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { resendVerification } from '../../services/auth.service';

const VerificationError = ({ message }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [showResend, setShowResend] = useState(false);
  const [resendStatus, setResendStatus] = useState(''); // idle, loading, success, error
  const [resendMessage, setResendMessage] = useState('');

  const handleResend = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setResendMessage('Please enter your email address');
      return;
    }

    setResendStatus('loading');
    
    try {
      const response = await resendVerification(email);
      setResendStatus('success');
      setResendMessage(response.message || 'Verification email sent!');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setShowResend(false);
        setResendStatus('');
        setEmail('');
      }, 3000);
      
    } catch (error) {
      setResendStatus('error');
      setResendMessage(error.response?.data?.message || 'Failed to send email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
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
        </motion.div>

        {/* Error Title */}
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          ❌ Verification Failed
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-lg mb-6">
          {message || 'Something went wrong. Please try again.'}
        </p>

        {/* Resend Email Section */}
        {!showResend ? (
          <div className="space-y-3">
            <button
              onClick={() => setShowResend(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Resend Verification Email
            </button>

            <button
              onClick={() => navigate('/login')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Back to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleResend} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {resendMessage && (
              <p className={`text-sm ${resendStatus === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {resendMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={resendStatus === 'loading'}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendStatus === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Verification Email'
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowResend(false);
                setEmail('');
                setResendMessage('');
                setResendStatus('');
              }}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default VerificationError;
