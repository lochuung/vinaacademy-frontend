"use client"; // Chỉ định rằng file này sẽ được render phía client
import { useState } from "react"; // Import hook useState từ react
import Link from "next/link"; // Import component Link từ next/link
import { categoriesData } from "@/data/categories"; // Import dữ liệu categories từ thư mục data

// Định nghĩa component SubNavbar
export default function SubNavbar() {
    const [openCategory, setOpenCategory] = useState<string | null>(null); // Khởi tạo state openCategory với giá trị mặc định là null
    const [isHoveringSub, setIsHoveringSub] = useState<boolean>(false); // Khởi tạo state isHoveringSub với giá trị mặc định là false

    return (
        <div
            className="bg-gray-100 shadow-md relative"
            onMouseLeave={() => {
                if (!isHoveringSub) setOpenCategory(null); // Đóng dropdown khi không hover
            }}
        >
            {/* Thanh danh mục chính */}
            <div className="container mx-auto px-4 py-2 flex justify-center gap-x-8">
                {categoriesData.map((category) => (
                    <div
                        key={category.name}
                        className="relative"
                        onMouseEnter={() => setOpenCategory(category.name)} // Mở dropdown khi hover vào category
                    >
                        <Link
                            href={category.link}
                            className="text-gray-700 hover:text-blue-600 font-medium transition duration-200"
                        >
                            {category.name} {/* Hiển thị tên category */}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Sub-category dropdown */}
            {openCategory !== null && (
                <div
                    className="absolute left-0 top-full w-full bg-black shadow-lg border-t border-gray-600"
                    onMouseEnter={() => setIsHoveringSub(true)} // Giữ dropdown mở khi hover vào sub-category
                    onMouseLeave={() => {
                        setIsHoveringSub(false); // Đóng dropdown khi không hover
                        setOpenCategory(null); // Đặt openCategory thành null
                    }}
                >
                    <div className="container mx-auto flex justify-center space-x-4 py-1">
                        {categoriesData
                            .find((cat) => cat.name === openCategory)
                            ?.subCategories.map((sub) => (
                                <Link
                                    key={sub.name}
                                    href={sub.link}
                                    className="px-4 py-1 text-white hover:bg-gray-700 transition rounded-md"
                                >
                                    {sub.name} {/* Hiển thị tên sub-category */}
                                </Link>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
