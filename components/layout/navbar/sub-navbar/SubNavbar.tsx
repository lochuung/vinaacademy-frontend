"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { categoriesData } from "@/data/categories";

export default function SubNavbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [isHoveringSub, setIsHoveringSub] = useState<boolean>(false);

    // Ẩn SubNavbar nếu đường dẫn có chứa categories
    if (pathname.includes("categories") || pathname.includes("search")
        || pathname.includes("my-courses") || pathname.includes("courses")
        || pathname.includes("my-profile") || pathname.includes("cart")
        || pathname.includes("payment") || pathname.includes("profile")
        || pathname.includes("login") || pathname.includes("register") 
    ) return null;

    // Xử lý khi nhấp vào danh mục
    const handleCategoryClick = (e: React.MouseEvent, category: any) => {
        e.preventDefault();
        // Chuyển hướng trực tiếp đến trang category với đường dẫn link của category
        router.push(category.link);
    };

    // Xử lý khi nhấp vào danh mục con
    const handleSubCategoryClick = (e: React.MouseEvent, subCategory: any) => {
        e.preventDefault();
        // Chuyển hướng trực tiếp đến trang subcategory với đường dẫn link của subcategory
        router.push(subCategory.link);
    };

    return (
        <div
            className="bg-gray-100 shadow-md relative"
            onMouseLeave={() => {
                if (!isHoveringSub) setOpenCategory(null);
            }}
        >
            {/* Thanh danh mục chính */}
            <div className="container mx-auto px-4 py-2 flex justify-center gap-x-8">
                {categoriesData.map((category) => (
                    <div
                        key={category.name}
                        className="relative"
                        onMouseEnter={() => setOpenCategory(category.name)}
                    >
                        <a
                            href={category.link}
                            className="text-black hover:text-gray-500 font-medium transition duration-200"
                            onClick={(e) => handleCategoryClick(e, category)}
                        >
                            {category.name}
                        </a>
                    </div>
                ))}
            </div>

            {/* Sub-category dropdown */}
            {openCategory !== null && (
                <div
                    className="absolute left-0 top-full w-full bg-black shadow-lg border-t border-gray-600"
                    onMouseEnter={() => setIsHoveringSub(true)}
                    onMouseLeave={() => {
                        setIsHoveringSub(false);
                        setOpenCategory(null);
                    }}
                >
                    <div className="container mx-auto flex justify-center space-x-4 py-1">
                        {categoriesData
                            .find((cat) => cat.name === openCategory)
                            ?.subCategories.map((sub) => (
                                <a
                                    key={sub.name}
                                    href={sub.link}
                                    className="px-4 py-1 text-white hover:bg-gray-700 transition rounded-md"
                                    onClick={(e) => handleSubCategoryClick(e, sub)}
                                >
                                    {sub.name}
                                </a>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}