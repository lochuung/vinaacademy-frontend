"use client";

import { useState, useRef, useEffect } from "react";
import { CategoryDto } from "@/types/category";
import { ChevronDown } from "lucide-react";
import CategoryTree from "./CategoryTree";

interface ExploreDropdownProps {
    categories?: CategoryDto[];
}

const ExploreDropdown = ({ categories = [] }: ExploreDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Handle opening the dropdown menu
    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    // Handle closing the dropdown with a delay
    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300);
    };

    // Clean up timeout on unmount
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

            {/* Category dropdown using recursive CategoryTree component */}
            <div
                className={`absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 max-h-[80vh] overflow-y-auto ${
                    isOpen
                        ? "transform-none opacity-100 visible"
                        : "transform translate-y-2 opacity-0 invisible pointer-events-none"
                }`}
                aria-hidden={!isOpen}
            >
                <CategoryTree 
                    categories={categories} 
                    className="py-2"
                />
            </div>
        </div>
    );
};

export default ExploreDropdown;