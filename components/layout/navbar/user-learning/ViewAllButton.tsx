import Link from "next/link"; // Import component Link từ next/link
import {ChevronRight} from "lucide-react"; // Import icon ChevronRight từ thư viện lucide-react

// Định nghĩa interface cho các props của component ViewAllButton
interface ViewAllButtonProps {
    href?: string; // Prop href là một chuỗi tùy chọn, đại diện cho đường dẫn liên kết
    className?: string; // Prop className là một chuỗi tùy chọn, đại diện cho các lớp CSS bổ sung
}

// Định nghĩa component ViewAllButton
export const ViewAllButton = ({
                                  href = "/my-courses",
                                  className = "" // Đặt giá trị mặc định cho className là chuỗi rỗng
                              }: ViewAllButtonProps) => {
    return (
        <Link
            href={href}
            className={`
                mt-4 flex items-center justify-center space-x-2
                w-full px-4 py-2 bg-gray-100 hover:bg-gray-200
                text-gray-700 font-medium rounded-lg
                transition-colors duration-200
                ${className}
            `}
        >
            <span>Xem tất cả</span> {/* Hiển thị văn bản "Xem tất cả" */}
            <ChevronRight className="w-4 h-4"/> {/* Hiển thị icon ChevronRight */}
        </Link>
    );
};

export default ViewAllButton; // Xuất component ViewAllButton để sử dụng ở nơi khác