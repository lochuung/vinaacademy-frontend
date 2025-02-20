"use client";
import { useState } from "react";
import NotificationBadge from "./NotificationBadge";

const NotificationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const notifications = [
        { id: 1, message: "Bạn có khóa học mới!" },
        { id: 2, message: "Giảm giá 50% cho khóa học sắp hết hạn!" },
        { id: 3, message: "Cập nhật bài giảng mới trong khóa học Python!" },
    ];

    return (
        <div className="relative">
            {/* Badge thông báo */}
            <div
                className="cursor-pointer"
                onMouseEnter={() => setIsOpen(true)}
            >
                <NotificationBadge count={notifications.length} onClick={() => setIsOpen(!isOpen)} />
            </div>

            {/* Bao dropdown trong một div để giữ hover */}
            <div
                className={`absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-opacity duration-200 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            >
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-3">Thông báo</h3>
                    <ul className="divide-y divide-gray-200">
                        {notifications.map((notif) => (
                            <li key={notif.id} className="py-2 text-sm hover:bg-gray-100 px-2 rounded">
                                {notif.message}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NotificationDropdown;
