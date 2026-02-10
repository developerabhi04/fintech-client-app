import Spinner from '../ui/Spinner';

const LoadingSpinner = ({ fullScreen = true, message = 'Loading...' }) => {
    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
                <Spinner size="xl" />
                <p className="mt-4 text-gray-600 font-medium">{message}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <Spinner size="lg" />
            <p className="mt-4 text-gray-600">{message}</p>
        </div>
    );
};

export default LoadingSpinner;
