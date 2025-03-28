import { useState, useRef } from "react";
import { ChevronRight } from "lucide-react";
import { Category } from "@/types/navbar";
import SubCategoryItem from "./SubCategoryItem";

interface CategoryItemProps {
    category: Category;
    isActive: boolean;
    onHover: () => void;
}

const CategoryItem = ({ category, isActive, onHover }: CategoryItemProps) => {
    const [activeSubCategory, setActiveSubCategory] = useState<number | null>(null);

    const handleSubCategoryHover = (index: number) => {
        setActiveSubCategory(index);
    };

    return (
        <div
            className="relative"
            onMouseEnter={onHover}
        >
            <a href={category.link} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                {category.name}
                <ChevronRight className="w-4 h-4" />
            </a>

            <div
                className={`absolute left-full top-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 -ml-2 z-50 ${isActive
                    ? "transform-none opacity-100 visible"
                    : "transform translate-x-2 opacity-0 invisible pointer-events-none"
                    }`}
            >
                <div className="py-2">
                    {category.subCategories.map((subCategory, index) => (
                        <SubCategoryItem
                            key={index}
                            subCategory={subCategory}
                            isActive={activeSubCategory === index}
                            onHover={() => handleSubCategoryHover(index)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;