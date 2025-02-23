import { FaBell } from "react-icons/fa"; // Import icon FaBell từ thư viện react-icons

// Định nghĩa interface cho các props của component NotificationBadge
interface NotificationBadgeProps {
    count: number; // Prop count là một số, đại diện cho số lượng thông báo
    onClick: () => void; // Prop onClick là một hàm không có tham số và không trả về giá trị
}

// Định nghĩa component NotificationBadge
const NotificationBadge = ({ count, onClick }: NotificationBadgeProps) => {
    return (
        <button
            className="relative flex items-center p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={onClick} // Gọi hàm onClick khi người dùng nhấn nút
        >
            <FaBell className="w-5 h-5 text-black" /> {/* Hiển thị icon FaBell */}
            {count > 0 && (
                <span className="absolute -top-0 -right-0 flex items-center justify-center bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full">
                    {count} {/* Hiển thị số lượng thông báo nếu count lớn hơn 0 */}
                </span>
            )}
        </button>
    );
};

export default NotificationBadge; // Xuất component NotificationBadge để sử dụng ở nơi khác
