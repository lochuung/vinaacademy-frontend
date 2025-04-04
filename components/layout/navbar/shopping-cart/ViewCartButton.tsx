import Link from "next/link"; // Import component Link từ next/link
import { ShoppingCart } from "lucide-react"; // Import icon ShoppingCart từ thư viện lucide-react

// Định nghĩa interface cho các props của component ViewCartButton
interface ViewCartButtonProps {
    href?: string; // Prop href là một chuỗi tùy chọn, đại diện cho đường dẫn liên kết
    className?: string; // Prop className là một chuỗi tùy chọn, đại diện cho các lớp CSS bổ sung
}

// Định nghĩa component ViewCartButton
export const ViewCartButton = ({
    href = "/cart", // Đặt giá trị mặc định cho href là "/cart"
    className = "" // Đặt giá trị mặc định cho className là chuỗi rỗng
}: ViewCartButtonProps) => {
    return (
        <Link
            href={href}
            className={`
                flex items-center justify-center space-x-2
                w-full px-4 py-2 bg-black hover:bg-gray-800
                text-white font-medium rounded-lg
                transition-colors duration-200
                ${className}
            `}
        >
            <ShoppingCart className="w-4 h-4" /> {/* Hiển thị icon ShoppingCart */}
            <span>Xem giỏ hàng</span> {/* Hiển thị văn bản "Xem giỏ hàng" */}
        </Link>
    );
};

export default ViewCartButton; // Xuất component ViewCartButton để sử dụng ở nơi khác