import { useRouter } from "next/navigation";
import { CategoryDto } from "@/types/category";
import { ChevronRight } from "lucide-react";
import TopicsList from "./TopicsList";

interface SubCategoriesListProps {
    category: CategoryDto;
    activeCategory: number | null;
    activeSubCategory: number | null;
    categoryIndex: number;
    onSubCategoryHover: (index: number) => void;
}

const SubCategoriesList = ({
    category,
    activeCategory,
    activeSubCategory,
    categoryIndex,
    onSubCategoryHover
}: SubCategoriesListProps) => {
    const router = useRouter();

    // Chuyển hướng đến trang danh mục con
    const handleSubCategoryClick = (parentCategory: CategoryDto, childCategory: CategoryDto, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/categories/${parentCategory.slug}/${childCategory.slug}`);
    };

    return (
        <div
            className={`absolute left-full top-0 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 -ml-2 ${activeCategory === categoryIndex
                ? "transform-none opacity-100 visible"
                : "transform translate-x-2 opacity-0 invisible pointer-events-none"
                }`}
        >
            <div className="py-2">
                {category.children.map((child, subIndex) => (
                    <div
                        key={child.id}
                        className="relative"
                        onMouseEnter={() => onSubCategoryHover(subIndex)}
                    >
                        <a
                            href={`/categories/${category.slug}/${child.slug}`}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                            onClick={(e) => handleSubCategoryClick(category, child, e)}
                        >
                            <span>{child.name}</span>
                            {/* Show chevron only if this subcategory has children */}
                            {child.children && child.children.length > 0 && (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </a>

                        {/* Show third level (topics) if this subcategory is active and has children */}
                        {activeCategory === categoryIndex && activeSubCategory === subIndex && 
                         child.children && child.children.length > 0 && (
                            <TopicsList
                                parentCategory={category}
                                subCategory={child}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubCategoriesList;