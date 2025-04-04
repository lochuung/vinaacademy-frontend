import { useRouter } from "next/navigation";
import { Category } from "@/types/navbar";
import { ChevronRight } from "lucide-react";
import TopicsList from "./TopicsList";

interface SubCategoriesListProps {
    category: Category;
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
    const handleSubCategoryClick = (subCategoryLink: string, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(subCategoryLink);
    };

    return (
        <div
            className={`absolute left-full top-0 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50 transition-all duration-200 -ml-2 ${activeCategory === categoryIndex
                ? "transform-none opacity-100 visible"
                : "transform translate-x-2 opacity-0 invisible pointer-events-none"
                }`}
        >
            <div className="py-2">
                {category.subCategories.map((subCategory, subIndex) => (
                    <div
                        key={subIndex}
                        className="relative"
                        onMouseEnter={() => onSubCategoryHover(subIndex)}
                    >
                        <a
                            href={subCategory.link}
                            className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                            onClick={(e) => handleSubCategoryClick(subCategory.link, e)}
                        >
                            <span>{subCategory.name}</span>
                            <ChevronRight className="w-4 h-4" />
                        </a>

                        {activeCategory === categoryIndex && activeSubCategory === subIndex && (
                            <TopicsList
                                subCategory={subCategory}
                                categoryLink={category.link}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SubCategoriesList;