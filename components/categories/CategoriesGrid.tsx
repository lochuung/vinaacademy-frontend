import { CategoryCard } from "./CategoryCard";
import { Button } from "@/components/ui/button";

interface CategoriesGridProps {
    categories: any[];
    resetSearch: () => void;
}

export function CategoriesGrid({ categories, resetSearch }: CategoriesGridProps) {
    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-4">Tất cả danh mục</h2>
                <p className="text-gray-600 mb-10">
                    Tìm kiếm các khóa học theo danh mục yêu thích của bạn
                </p>

                {categories.length === 0 ? (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-medium text-gray-600 mb-4">
                            Không tìm thấy danh mục nào phù hợp
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Hãy thử tìm kiếm với từ khóa khác
                        </p>
                        <Button onClick={resetSearch}>Xem tất cả danh mục</Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}