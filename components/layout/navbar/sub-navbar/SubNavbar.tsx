"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CategoryDto } from "@/types/category";

interface SubNavbarProps {
    categories: CategoryDto[];
}

export default function SubNavbar({ categories }: SubNavbarProps) {
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
    const handleCategoryClick = (e: React.MouseEvent, category: CategoryDto) => {
        e.preventDefault();
        // Chuyển hướng đến trang category với slug
        router.push(`/categories/${category.slug}`);
    };

    // Xử lý khi nhấp vào danh mục con
    const handleSubCategoryClick = (e: React.MouseEvent, parentCategory: CategoryDto, subCategory: CategoryDto) => {
        e.preventDefault();
        // Chuyển hướng đến trang subcategory với slugs
        router.push(`/categories/${parentCategory.slug}/${subCategory.slug}`);
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
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="relative"
                        onMouseEnter={() => setOpenCategory(category.name)}
                    >
                        <a
                            href={`/categories/${category.slug}`}
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
                        {categories
                            .find((cat) => cat.name === openCategory)
                            ?.children.map((child) => (
                                <a
                                    key={child.id}
                                    href={`/categories/${categories.find(cat => cat.name === openCategory)?.slug}/${child.slug}`}
                                    className="px-4 py-1 text-white hover:bg-gray-700 transition rounded-md"
                                    onClick={(e) => handleSubCategoryClick(
                                        e, 
                                        categories.find(cat => cat.name === openCategory)!, 
                                        child
                                    )}
                                >
                                    {child.name}
                                </a>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}