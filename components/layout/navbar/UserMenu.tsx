"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import UserDropdown from "./UserDropdown";

interface UserMenuProps {
    isLoggedIn: boolean;
}

const UserMenu = ({ isLoggedIn }: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className="relative" ref={menuRef}>
            {isLoggedIn ? (
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onMouseEnter={() => setIsOpen(true)}
                    onClick={handleToggle} // Click để giữ dropdown mở
                >
                    <FaUserCircle size={24} className="text-black" />
                </div>
            ) : (
                <>
                    <div className="flex space-x-3"> {/* Tạo khoảng cách giữa các nút */}
                        <Link
                            href="/login"
                            className="px-4 py-2 border border-black text-black rounded hover:bg-gray-200"
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            href="/register"
                            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                        >
                            Đăng ký
                        </Link>
                    </div>
                </>
            )}

            {/* Dropdown hiển thị khi hover hoặc click */}
            {isOpen && <UserDropdown onClose={() => setIsOpen(false)} />}
        </div>
    );
};

export default UserMenu;
