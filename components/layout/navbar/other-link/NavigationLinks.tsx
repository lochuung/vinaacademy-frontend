import Link from "next/link"; // Import component Link từ next/link

// Định nghĩa component NavigationLinks
export const NavigationLinks = () => {
    const links = [
        {href: "/blog", label: "Blog"}, // Định nghĩa liên kết đến trang Blog
        {href: "/teaching", label: "Trở thành Giảng viên"}, // Định nghĩa liên kết đến trang Trở thành Giảng viên
    ];

    return (
        <ul className="hidden md:flex items-center space-x-6"> {/* Danh sách các liên kết, chỉ hiển thị trên màn hình md trở lên */}
            {links.map((link) => (
                <li key={link.href}> {/* Mỗi liên kết là một mục trong danh sách */}
                    <Link
                        href={link.href}
                        className="hover:text-gray-500 transition-colors duration-200"
                    >
                        {link.label} {/* Hiển thị nhãn của liên kết */}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default NavigationLinks; // Xuất component NavigationLinks để sử dụng ở nơi khác