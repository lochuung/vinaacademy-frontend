"use client"; // Chỉ định rằng file này sẽ được render phía client

import { useState } from "react"; // Import hook useState từ react
import { motion, AnimatePresence } from "framer-motion"; // Import các component motion và AnimatePresence từ framer-motion
import { XIcon } from "lucide-react"; // Import icon XIcon từ thư viện lucide-react

// Định nghĩa interface cho các props của component AnnouncementBar
interface AnnouncementBarProps {
    onClose: () => void; // Prop onClose là một hàm không có tham số và không trả về giá trị
}

// Định nghĩa component AnnouncementBar
const AnnouncementBar = ({ onClose }: AnnouncementBarProps) => {
    const [isVisible, setIsVisible] = useState(true); // Khởi tạo state isVisible với giá trị mặc định là true

    // Định nghĩa hàm handleClose để xử lý khi người dùng đóng AnnouncementBar
    const handleClose = () => {
        setIsVisible(false); // Đặt isVisible thành false để ẩn AnnouncementBar
        setTimeout(onClose, 300); // Đợi animation xong (300ms) mới gọi hàm onClose
    };

    return (
        <AnimatePresence> {/* Bọc nội dung trong AnimatePresence để quản lý animation */}
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }} // Trạng thái ban đầu của animation
                    animate={{ opacity: 1, y: 0 }} // Trạng thái khi animation đang chạy
                    exit={{ opacity: 0, y: -20 }} // Trạng thái khi animation kết thúc
                    transition={{ duration: 0.3 }} // Thời gian chạy animation
                    className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md text-center py-3 px-5 flex justify-center items-center"
                >
                    <span className="text-sm md:text-base font-medium">
                        🚀 Chào mừng bạn đến với website của chúng tôi! Hãy khám phá ngay!
                    </span>
                    <button
                        className="absolute right-3 btn btn-circle btn-sm btn-ghost text-white hover:text-gray-300"
                        onClick={handleClose} // Gọi hàm handleClose khi người dùng nhấn nút
                    >
                        <XIcon size={18} /> {/* Hiển thị icon XIcon */}
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnnouncementBar; // Xuất component AnnouncementBar để sử dụng ở nơi khác
