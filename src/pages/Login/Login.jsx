import { motion } from 'framer-motion';
import { IoWallet } from 'react-icons/io5';
import LoginForm from '../../components/auth/LoginForm';

const Login = () => {
    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4">
                            <IoWallet className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-gray-600">
                            Login to access your account
                        </p>
                    </div>

                    {/* Login Form */}
                    <LoginForm />
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    Secure cross-border money transfers
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
