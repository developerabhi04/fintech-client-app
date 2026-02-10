import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Pages
import Login from './pages/login/Login';
import Register from './pages/Register/Register';
import CheckEmail from './pages/CheckEmail/CheckEmail';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import VerifyLogin from './pages/VerifyLogin/VerifyLogin';

// Dashboard Pages
import Dashboard from './pages/Dashboard/Dasboard';
import SendMoney from './pages/SendMoney/SendMoney';
import Transactions from './pages/Transactions/Transactions';
import Wallet from './pages/Wallet/Wallet';
import Profile from './pages/Profile/Profile';
import NotFound from './pages/NotFound/NotFound';


function App() {
    return (
        <ErrorBoundary>
            <Router>
                <AuthProvider>
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#fff',
                                color: '#333',
                                padding: '16px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#10b981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />

                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/check-email" element={<CheckEmail />} />
                        <Route path="/verify-email" element={<VerifyEmail />} />
                        <Route path="/verify-login" element={<VerifyLogin />} />

                        {/* Protected Routes */}
                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/send-money"
                            element={
                                <ProtectedRoute>
                                    <SendMoney />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/transactions"
                            element={
                                <ProtectedRoute>
                                    <Transactions />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/wallet"
                            element={
                                <ProtectedRoute>
                                    <Wallet />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            }
                        />

                        {/* 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
