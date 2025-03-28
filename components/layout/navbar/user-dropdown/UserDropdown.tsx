import Link from "next/link"; // Import component Link từ next/link
import { useEffect, useRef } from "react"; // Import các hook useEffect và useRef từ react

// Định nghĩa interface cho các props của component UserDropdown
interface UserDropdownProps {
    onClose: () => void; // Prop onClose là một hàm không có tham số và không trả về giá trị
}

// Định nghĩa component UserDropdown
const UserDropdown = ({ onClose }: UserDropdownProps) => {
    const dropdownRef = useRef<HTMLDivElement>(null); // Khởi tạo ref cho dropdown

    useEffect(() => {
        // Định nghĩa hàm handleClickOutside để xử lý khi người dùng nhấn bên ngoài dropdown
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose(); // Gọi hàm onClose nếu nhấn bên ngoài dropdown
            }
        };

        document.addEventListener("mousedown", handleClickOutside); // Thêm sự kiện mousedown vào document
        return () => {
            document.removeEventListener("mousedown", handleClickOutside); // Xóa sự kiện mousedown khi component unmount
        };
    }, [onClose]);

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-300 z-50"
            onMouseLeave={onClose} // Đóng dropdown khi chuột rời khỏi
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

export default UserDropdown; // Xuất component UserDropdown để sử dụng ở nơi khác
