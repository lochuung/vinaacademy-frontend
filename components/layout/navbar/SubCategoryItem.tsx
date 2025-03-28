import { ChevronRight } from "lucide-react";
import { SubCategory } from "@/types/navbar";
import TrendingTopics from "./TrendingTopics";

interface SubCategoryItemProps {
    subCategory: SubCategory;
    isActive: boolean;
    onHover: () => void;
}

const SubCategoryItem = ({ subCategory, isActive, onHover }: SubCategoryItemProps) => {
    return (
        <div
            className="relative"
            onMouseEnter={onHover}
        >
            <a href={subCategory.link} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                {subCategory.name}
                <ChevronRight className="w-4 h-4" />
            </a>

            <TrendingTopics topics={subCategory.trendingTopics} isVisible={isActive} />
        </div>
    );
};

export default SubCategoryItem;