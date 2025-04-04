import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

interface UserDropdownProps {
    onClose?: () => void;
    isVisible: boolean;
}

const UserDropdown = ({ isVisible }: UserDropdownProps) => {
    const { logout } = useAuth();
    return (
        <div
            className={`absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ${isVisible
                ? "transform-none opacity-100 visible"
                : "transform translate-y-2 opacity-0 invisible pointer-events-none"
                }`}
            aria-hidden={!isVisible}
        >
            {/* Mũi tên chỉ hướng */}
            <div className="absolute -top-2 right-3 h-4 w-4 rotate-45 bg-white border-t border-l border-gray-200"></div>

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
                        onClick={logout}
                        href="#"
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