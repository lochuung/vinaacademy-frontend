"use client";
import { useState, useRef, useEffect } from "react";
import NotificationBadge from "./NotificationBadge";

// Định nghĩa kiểu dữ liệu cho thông báo
interface Notification {
    id: number;
    message: string;
}

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Mẫu dữ liệu thông báo
    const notifications: Notification[] = [
        { id: 1, message: "Bạn có khóa học mới!" },
        { id: 2, message: "Giảm giá 50% cho khóa học sắp hết hạn!" },
        { id: 3, message: "Cập nhật bài giảng mới trong khóa học Python!" },
    ];

    // Mở dropdown với độ trễ nhỏ để tránh hiệu ứng flicker
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    // Đóng dropdown với độ trễ để tránh đóng ngay khi di chuyển chuột
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Độ trễ 300ms
    };

    // Dọn dẹp khi component unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Toggle dropdown khi click vào badge
    const toggleDropdown = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Badge thông báo */}
            <NotificationBadge
                count={notifications.length}
                onClick={toggleDropdown}
                isActive={isOpen}
            />

            {/* Dropdown thông báo - sử dụng transform thay vì opacity để cải thiện hiệu năng */}
            <div
                className={`absolute right-0 top-12 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ${isOpen
                        ? "transform-none opacity-100 visible"
                        : "transform translate-y-2 opacity-0 invisible pointer-events-none"
                    }`}
                aria-hidden={!isOpen}
            >
                {/* Mũi tên chỉ hướng */}
                <div className="absolute -top-2 right-3 h-4 w-4 rotate-45 bg-white border-t border-l border-gray-200"></div>

                <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold text-lg">Thông báo</h3>
                        {notifications.length > 0 && (
                            <button
                                className="text-sm text-blue-500 hover:text-blue-700"
                                onClick={() => {/* Xử lý đánh dấu đã đọc tất cả */ }}
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
            </div>
        </div>
    );
};

export default NotificationDropdown;