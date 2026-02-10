import { motion } from 'framer-motion';
import { IoMail, IoCheckmarkCircle } from 'react-icons/io5';

const CheckEmailMessage = ({ email, type = 'register' }) => {
    const messages = {
        register: {
            title: 'Check Your Email',
            subtitle: 'We sent a verification link to',
            description: 'Click the link in the email to verify your account and get started.',
        },
        login: {
            title: 'Verify Your Login',
            subtitle: 'We sent a verification link to',
            description: 'Click the link in the email to complete your login securely.',
        },
    };

    const message = messages[type];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
        >
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                        <IoMail className="text-white" size={40} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                        <IoCheckmarkCircle className="text-white" size={20} />
                    </div>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {message.title}
            </h2>

            <p className="text-gray-600 mb-2">{message.subtitle}</p>

            <p className="text-primary-600 font-semibold mb-6">{email}</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                    {message.description}
                </p>
            </div>

            <div className="space-y-3">
                <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">Open your email</p>
                        <p className="text-xs text-gray-600">Check your inbox (and spam folder)</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">Click the verification link</p>
                        <p className="text-xs text-gray-600">The link will redirect you automatically</p>
                    </div>
                </div>

                <div className="flex items-start gap-3 text-left">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-primary-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-800">You're all set!</p>
                        <p className="text-xs text-gray-600">
                            {type === 'register' ? 'Start using your account' : 'Access your dashboard'}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CheckEmailMessage;
