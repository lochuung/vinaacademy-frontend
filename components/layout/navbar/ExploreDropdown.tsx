"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/types/navbar";
import { categoriesData } from "@/data/categories";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ExploreDropdownProps {
    categories?: Category[];
}

const ExploreDropdown = ({ categories = categoriesData }: ExploreDropdownProps) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Chuyển hướng đến trang danh mục
    const handleCategoryClick = (category: Category, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(category.link);
    };

    // Chuyển hướng đến trang danh mục con
    const handleSubCategoryClick = (subCategoryLink: string, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(subCategoryLink);
    };

    // Chuyển hướng đến trang chủ đề
    const handleTopicClick = (topicLink: string, categoryLink: string, subCategoryLink: string, e: React.MouseEvent) => {
        e.preventDefault();
        const topicSlug = topicLink.split('/').pop();
        router.push(`${subCategoryLink}?topic=${topicSlug}`);
    };

    // Xử lý mở menu chính
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    // Xử lý đóng menu với độ trễ
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
            setActiveCategory(null);
            setActiveSubCategory(null);
        }, 300);
    };

    // Xử lý hover vào một danh mục
    const handleCategoryHover = (index: number) => {
        setActiveCategory(index);
        setActiveSubCategory(null);
    };

    // Xử lý hover vào một danh mục con
    const handleSubCategoryHover = (index: number) => {
        setActiveSubCategory(index);
    };

    // Dọn dẹp timeout khi unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <button
                className="flex items-center gap-1 hover:text-blue-600 py-2 font-medium"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Khám phá
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <div
                className={`absolute top-full left-0 mt-1 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 ${isOpen
                    ? "transform-none opacity-100 visible"
                    : "transform translate-y-2 opacity-0 invisible pointer-events-none"
                    }`}
                aria-hidden={!isOpen}
            >
                <div className="py-2">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="relative"
                            onMouseEnter={() => handleCategoryHover(index)}
                        >
                            <a
                                href={category.link}
                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                                onClick={(e) => handleCategoryClick(category, e)}
                            >
                                <span>{category.name}</span>
                                <ChevronRight className="w-4 h-4" />
                            </a>

                            <div
                                className={`absolute left-full top-0 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 -ml-2 ${activeCategory === index
                                    ? "transform-none opacity-100 visible"
                                    : "transform translate-x-2 opacity-0 invisible pointer-events-none"
                                    }`}
                            >
                                <div className="py-2">
                                    {category.subCategories.map((subCategory, subIndex) => (
                                        <div
                                            key={subIndex}
                                            className="relative"
                                            onMouseEnter={() => handleSubCategoryHover(subIndex)}
                                        >
                                            <a
                                                href={subCategory.link}
                                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                                                onClick={(e) => handleSubCategoryClick(subCategory.link, e)}
                                            >
                                                <span>{subCategory.name}</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </a>

                                            <div
                                                className={`absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 -ml-2 ${activeCategory === index && activeSubCategory === subIndex
                                                    ? "transform-none opacity-100 visible"
                                                    : "transform translate-x-2 opacity-0 invisible pointer-events-none"
                                                    }`}
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-center gap-2 mb-3 text-orange-500 font-medium">
                                                        <span>Chủ đề thịnh hành</span>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {subCategory.trendingTopics.map((topic, topicIndex) => (
                                                            <a
                                                                key={topicIndex}
                                                                href={`${subCategory.link}?topic=${topic.link.split('/').pop()}`}
                                                                className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                                                                onClick={(e) => handleTopicClick(topic.link, category.link, subCategory.link, e)}
                                                            >
                                                                <span>{topic.name}</span>
                                                                <span className="text-sm text-gray-500">{topic.students}</span>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="border-t my-1"></div>

                    <a
                        href="/categories"
                        className="block px-4 py-2 hover:bg-gray-100 text-blue-600"
                    >
                        Xem tất cả danh mục
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ExploreDropdown;