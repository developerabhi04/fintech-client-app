import { motion } from 'framer-motion';
import { IoWallet } from 'react-icons/io5';
import RegisterForm from '../../components/auth/RegisterForm';

const Register = () => {
    return (
        <div className="auth-container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-4">
                            <IoWallet className="text-white" size={32} />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-600">
                            Start sending money across borders
                        </p>
                    </div>

                    {/* Register Form */}
                    <RegisterForm />
                </div>

                {/* Footer */}
                <p className="text-center text-gray-600 text-sm mt-6">
                    Secure cross-border money transfers
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
