import { ChevronRight, Flame } from "lucide-react";
import { Category } from "@/types/navbar";
import SubCategoryItem from "./SubCategoryItem";

const CategoryItem = ({ category }: { category: Category }) => {
    return (
        <div className="relative group/item">
            <a href={category.link} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                {category.name}
                <ChevronRight className="w-4 h-4" />
            </a>
            <div className="absolute left-full top-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 -ml-2 z-50">
                <div className="py-2">
                    {category.subCategories.map((subCategory, index) => (
                        <SubCategoryItem key={index} subCategory={subCategory} />
                    ))}
                </div>
            </div>
        </div>
    );
};
export default CategoryItem;