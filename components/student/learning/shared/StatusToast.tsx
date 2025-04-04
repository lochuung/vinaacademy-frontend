import { FC, useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export type StatusType = 'success' | 'error' | 'info' | 'warning';

interface StatusToastProps {
    message: string;
    type: StatusType;
    duration?: number; // milliseconds
    onClose?: () => void;
    show: boolean;
}

const StatusToast: FC<StatusToastProps> = ({
    message,
    type,
    duration = 3000,
    onClose,
    show
}) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);

        if (show && duration > 0) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!isVisible) return null;

    const getToastClasses = () => {
        switch (type) {
            case 'success':
                return 'bg-green-100 border-green-500 text-green-800';
            case 'error':
                return 'bg-red-100 border-red-500 text-red-800';
            case 'warning':
                return 'bg-yellow-100 border-yellow-500 text-yellow-800';
            case 'info':
            default:
                return 'bg-blue-100 border-blue-500 text-blue-800';
        }
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            case 'warning':
                return <AlertCircle className="w-5 h-5 text-yellow-600" />;
            case 'info':
            default:
                return <AlertCircle className="w-5 h-5 text-blue-600" />;
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) onClose();
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 max-w-md animate-fade-in">
            <div className={`flex items-center p-4 rounded-lg border-l-4 shadow-md ${getToastClasses()}`}>
                <div className="mr-3">{getIcon()}</div>
                <div className="flex-1">{message}</div>
                <button
                    onClick={handleClose}
                    className="ml-3 text-gray-500 hover:text-gray-800"
                    title="Close"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default StatusToast;