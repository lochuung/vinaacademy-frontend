import Link from "next/link";
import { useEffect, useRef } from "react";

interface UserDropdownProps {
    onClose: () => void;
}

const UserDropdown = ({ onClose }: UserDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-300 z-50"
            onMouseLeave={onClose} // 🛠 Thêm sự kiện đóng dropdown khi chuột rời khỏi
        >
            <ul className="py-2">
                <li>
                    <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Hồ sơ
                    </Link>
                </li>
                <li>
                    <Link
                        href="/settings"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                        Cài đặt
                    </Link>
                </li>
                <li>
                    <Link
                        href="/logout"
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                        Đăng xuất
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default UserDropdown;
