import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    IoWallet,
    IoLogOut,
    IoPerson,
    IoMenu,
    IoClose,
    IoNotifications
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/helpers';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                            <IoWallet className="text-white" size={24} />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                            FinTech MVP
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/dashboard"
                            className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/send-money"
                            className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                        >
                            Send Money
                        </Link>
                        <Link
                            to="/transactions"
                            className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                        >
                            Transactions
                        </Link>
                        <Link
                            to="/wallet"
                            className="text-gray-600 hover:text-primary-600 transition-colors font-medium"
                        >
                            Wallet
                        </Link>

                        {/* Notifications */}
                        <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                            <IoNotifications size={24} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {getInitials(`${user?.firstName} ${user?.lastName}`)}
                                </div>
                            </button>

                            {showDropdown && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                                >
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="font-semibold text-gray-800">
                                            {user?.firstName} {user?.lastName}
                                        </p>
                                        <p className="text-sm text-gray-500">{user?.email}</p>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        <IoPerson size={18} />
                                        Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                                    >
                                        <IoLogOut size={18} />
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="md:hidden p-2 text-gray-600"
                    >
                        {showMobileMenu ? <IoClose size={24} /> : <IoMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="md:hidden border-t border-gray-200 bg-white"
                >
                    <div className="px-4 py-4 space-y-2">
                        <Link
                            to="/dashboard"
                            className="block py-2 text-gray-700 hover:text-primary-600"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/send-money"
                            className="block py-2 text-gray-700 hover:text-primary-600"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Send Money
                        </Link>
                        <Link
                            to="/transactions"
                            className="block py-2 text-gray-700 hover:text-primary-600"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Transactions
                        </Link>
                        <Link
                            to="/wallet"
                            className="block py-2 text-gray-700 hover:text-primary-600"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Wallet
                        </Link>
                        <Link
                            to="/profile"
                            className="block py-2 text-gray-700 hover:text-primary-600"
                            onClick={() => setShowMobileMenu(false)}
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block w-full text-left py-2 text-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
