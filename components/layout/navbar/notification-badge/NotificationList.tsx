import { Notification } from "@/types/navbar";

interface NotificationListProps {
    notifications: Notification[];
    onMarkAllAsRead: () => void;
    onNotificationClick?: (id: number) => void;
}

const NotificationList = ({
    notifications,
    onMarkAllAsRead,
    onNotificationClick
}: NotificationListProps) => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-lg">Thông báo</h3>
                {notifications.length > 0 && (
                    <button
                        className="text-sm text-blue-500 hover:text-blue-700"
                        onClick={onMarkAllAsRead}
                    >
                        Đọc tất cả
                    </button>
                )}
            </div>

            {notifications.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                    {notifications.map((notif) => (
                        <li
                            key={notif.id}
                            className="py-2 text-sm hover:bg-gray-50 px-2 rounded cursor-pointer transition-colors"
                            onClick={() => onNotificationClick && onNotificationClick(notif.id)}
                        >
                            {notif.message}
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="py-6 text-center text-gray-500">
                    Bạn không có thông báo nào
                </div>
            )}
        </div>
    );
};

export default NotificationList;