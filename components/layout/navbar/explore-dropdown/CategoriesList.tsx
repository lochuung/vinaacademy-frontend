import { useRouter } from "next/navigation";
import { CategoryDto } from "@/types/category";
import { ChevronRight } from "lucide-react";
import SubCategoriesList from "./SubCategoriesList";
import Link from "next/link";

interface CategoriesListProps {
    categories: CategoryDto[];
    activeCategory: number | null;
    activeSubCategory: number | null;
    onCategoryHover: (index: number) => void;
    onSubCategoryHover: (index: number) => void;
}

const CategoriesList = ({
    categories,
    activeCategory,
    activeSubCategory,
    onCategoryHover,
    onSubCategoryHover
}: CategoriesListProps) => {
    const router = useRouter();

    // Chuyển hướng đến trang danh mục
    const handleCategoryClick = (category: CategoryDto, e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/categories/${category.slug}`);
    };

    // Display hierarchical path in the component title
    const getCategoryPath = (category: CategoryDto) => {
        return category.parentSlug ? `${category.parentSlug} > ${category.name}` : category.name;
    };

    return (
        <div className="py-2">
            {categories.map((category, index) => (
                <div
                    key={category.id}
                    className="relative"
                    onMouseEnter={() => onCategoryHover(index)}
                >
                    <Link
                        href={`/categories/${category.slug}`}
                        className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                        onClick={(e) => handleCategoryClick(category, e)}
                    >
                        <span>{category.name}</span>
                        {/* Only show chevron if category has children */}
                        {category.children && category.children.length > 0 && (
                            <ChevronRight className="w-4 h-4" />
                        )}
                    </Link>

                    {activeCategory === index && category.children && category.children.length > 0 && (
                        <SubCategoriesList
                            category={category}
                            activeCategory={activeCategory}
                            activeSubCategory={activeSubCategory}
                            categoryIndex={index}
                            onSubCategoryHover={onSubCategoryHover}
                        />
                    )}
                </div>
            ))}

            <div className="border-t my-1"></div>

            <Link
                href="/categories"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
                Xem tất cả danh mục
            </Link>
        </div>
    );
};

export default CategoriesList;