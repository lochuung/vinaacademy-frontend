import { FaBell } from "react-icons/fa";

interface NotificationBadgeProps {
    count: number;
    onClick: () => void;
}

const NotificationBadge = ({ count, onClick }: NotificationBadgeProps) => {
    return (
        <button
            className="relative flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={onClick}
        >
            <FaBell className="w-5 h-5 text-black" />
            {count > 0 && (
                <span className="absolute -top-0 -right-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full">
                    {count}
                </span>
            )}
        </button>
    );
};

export default NotificationBadge;
