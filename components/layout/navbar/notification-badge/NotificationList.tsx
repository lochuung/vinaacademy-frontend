import { Notification } from "@/types/navbar";
import { NotificationDTO } from "@/types/notification-type";
import { useRouter } from "next/navigation";

interface NotificationListProps {
  notifications: NotificationDTO[];
  onMarkAllAsRead: () => void;
  onNotificationClick?: (id: string) => void;
  totalUnread?: number;
}

const NotificationList = ({
  notifications,
  onMarkAllAsRead,
  onNotificationClick,
  totalUnread = 0,
}: NotificationListProps) => {
  const router = useRouter();
  const viewAllNotifications = () => {
    router.push("/notification");
  };
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
              className="py-3 text-sm hover:bg-blue-100 px-2 rounded cursor-pointer transition-colors bg-blue-50 mt-2"
              onClick={() => router.push(notif.targetUrl)}
            >
              <div className="font-medium text-sm truncate">{notif.title}</div>
              <div className="text-xs text-gray-500 truncate">
                {notif.content}
              </div>
            </li>
          ))}
          {totalUnread > 2 && (
            <li className="py-3 text-sm text-blue-400 font-medium">
              ... còn {totalUnread-2} thông báo nữa chưa đọc
            </li>
          )}
        </ul>
      ) : (
        <div className="py-6 text-center text-gray-500">
          Bạn không có thông báo nào chưa đọc
        </div>
      )}
      <div className="border-t border-gray-100">
        <button
          className="w-full text-center py-2 text-sm text-blue-600 hover:bg-gray-50 font-medium"
          onClick={viewAllNotifications}
        >
          Xem tất cả
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
