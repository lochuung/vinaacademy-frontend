import { ChevronRight } from "lucide-react";
import { SubCategory } from "@/types/navbar";
import TrendingTopics from "./TrendingTopics";

const SubCategoryItem = ({ subCategory }: { subCategory: SubCategory }) => {
    return (
        <div className="relative group/subitem">
            <a href={subCategory.link} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                {subCategory.name}
                <ChevronRight className="w-4 h-4" />
            </a>
            <TrendingTopics topics={subCategory.trendingTopics} />
        </div>
    );
};

export default SubCategoryItem;