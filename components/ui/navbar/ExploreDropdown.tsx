import { Category } from "@/types/navbar";
import CategoryItem from "./CategoryItem";

interface ExploreDropdownProps {
    categories: Category[];
}

const ExploreDropdown = ({ categories }: ExploreDropdownProps) => {
    return (
        <div className="relative group">
            <button className="hover:text-gray-600 py-2">
                Khám phá
            </button>
            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <div className="py-2">
                    {categories.map((category, index) => (
                        <CategoryItem key={index} category={category} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ExploreDropdown;