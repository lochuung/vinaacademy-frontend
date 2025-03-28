"use client";

import { useState, useRef, useEffect } from "react";
import { Category } from "@/types/navbar";
import { categoriesData } from "@/data/categories";
import { ChevronDown } from "lucide-react";
import CategoriesList from "./CategoriesList";

interface ExploreDropdownProps {
    categories?: Category[];
}

const ExploreDropdown = ({ categories = categoriesData }: ExploreDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
                className="flex items-center gap-1 hover:text-gray-500 py-2 font-medium"
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
                <CategoriesList
                    categories={categories}
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    onCategoryHover={handleCategoryHover}
                    onSubCategoryHover={handleSubCategoryHover}
                />
            </div>
        </div>
    );
};

export default ExploreDropdown;