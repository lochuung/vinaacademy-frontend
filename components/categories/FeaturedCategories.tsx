import {CategoryCard} from "./CategoryCard";

interface FeaturedCategoriesProps {
    categories: any[];
}

export function FeaturedCategories({categories}: FeaturedCategoriesProps) {
    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Danh mục phổ biến nhất</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.map((category) => (
                        <CategoryCard key={category.id} category={category} featured={true}/>
                    ))}
                </div>
            </div>
        </div>
    );
}