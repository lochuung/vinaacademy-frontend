"use client"; // Chỉ định rằng file này sẽ được render phía client
import { useState, useRef } from "react"; // Import các hook useState và useRef từ react
import Link from "next/link"; // Import component Link từ next/link
import { FaUserCircle } from "react-icons/fa"; // Import icon FaUserCircle từ thư viện react-icons
import UserDropdown from "./UserDropdown"; // Import component UserDropdown

// Định nghĩa interface cho các props của component UserMenu
interface UserMenuProps {
    isLoggedIn: boolean; // Prop isLoggedIn là một boolean, đại diện cho trạng thái đăng nhập của người dùng
}

// Định nghĩa component UserMenu
const UserMenu = ({ isLoggedIn }: UserMenuProps) => {
    const [isOpen, setIsOpen] = useState(false); // Khởi tạo state isOpen với giá trị mặc định là false
    const menuRef = useRef<HTMLDivElement>(null); // Khởi tạo ref cho menu

    // Định nghĩa hàm handleToggle để xử lý khi người dùng nhấn vào menu
    const handleToggle = () => {
        setIsOpen((prev) => !prev); // Đảo ngược giá trị của isOpen
    };

    return (
        <div className="relative" ref={menuRef}>
            {isLoggedIn ? (
                <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onMouseEnter={() => setIsOpen(true)} // Mở dropdown khi hover vào icon
                    onClick={handleToggle} // Click để giữ dropdown mở
                >
                    <FaUserCircle size={24} className="text-black" /> {/* Hiển thị icon FaUserCircle */}
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

export default UserMenu; // Xuất component UserMenu để sử dụng ở nơi khác
