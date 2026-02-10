import { Component } from 'react';
import { IoWarning } from 'react-icons/io5';
import Button from '../ui/Button';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-md w-full text-center">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-red-100 rounded-full">
                                    <IoWarning size={48} className="text-red-500" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Oops! Something went wrong
                            </h1>
                            <p className="text-gray-600 mb-6">
                                We're sorry, but something unexpected happened. Please try refreshing the page.
                            </p>
                            <Button
                                onClick={() => window.location.reload()}
                                fullWidth
                            >
                                Refresh Page
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
