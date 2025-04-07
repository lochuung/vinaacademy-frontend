import {FaBell} from "react-icons/fa";

interface NotificationBadgeProps {
    count: number;
    onClick: () => void;
    isActive: boolean;
}

const NotificationBadge = ({count, onClick, isActive}: NotificationBadgeProps) => {
    return (
        <button
            className={`relative flex items-center p-2 rounded-full transition-colors duration-200 ${isActive ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onClick={onClick}
            aria-label="Thông báo"
            aria-expanded={isActive}
            aria-haspopup="true"
        >
            <FaBell className="w-5 h-5 text-black"/>
            {count > 0 && (
                <span
                    className="absolute -top-0 -right-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full">
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </button>
    );
};

export default NotificationBadge;