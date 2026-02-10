import { createContext, useContext, useState, useEffect } from 'react';
import { getUser, getToken, isAuthenticated } from '../utils/helpers';
import { getCurrentUser, logout as logoutService } from '../services/auth.service';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    // Load user on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                if (isAuthenticated()) {
                    const storedUser = getUser();
                    setUser(storedUser);
                    setIsAuth(true);

                    // Fetch fresh user data
                    const response = await getCurrentUser();
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error('Failed to load user:', error);
                setIsAuth(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Logout function
    const logout = async () => {
        try {
            await logoutService();
            setUser(null);
            setIsAuth(false);
            toast.success('Logged out successfully');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Update user data
    const updateUser = (userData) => {
        setUser(userData);
    };

    const value = {
        user,
        setUser: updateUser,
        isAuth,
        setIsAuth,
        loading,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
