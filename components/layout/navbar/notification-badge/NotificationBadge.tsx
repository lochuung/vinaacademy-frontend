import { Bell } from "lucide-react";

interface NotificationBadgeProps {
    count: number;
    onClick: () => void;
    isActive: boolean;
}

const NotificationBadge = ({count, onClick, isActive}: NotificationBadgeProps) => {
    return (
        <button
            className={`relative flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                isActive 
                    ? "bg-gray-100 text-black" 
                    : "hover:bg-gray-50 text-gray-700 hover:text-black"
            }`}
            onClick={onClick}
            aria-label={`Thông báo${count > 0 ? ` (${count})` : ''}`}
            aria-expanded={isActive}
            aria-haspopup="true"
        >
            <Bell className="w-5 h-5" strokeWidth={2} />
            
            {count > 0 && (
                <span
                    className="absolute -top-0.5 -right-0.5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full animate-pulse-subtle shadow-sm"
                    aria-hidden="true"
                >
                    {count > 99 ? "99+" : count}
                </span>
            )}
        </button>
    );
};

export default NotificationBadge;