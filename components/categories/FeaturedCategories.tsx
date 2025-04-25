import Link from "next/link";
import { CategoryDto } from "@/types/category";
import { BookOpen } from "lucide-react";

interface FeaturedCategoriesProps {
  categories: CategoryDto[];
}

export function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
  // Use a predefined set of colors for variety
  const backgroundColors = [
    "bg-blue-50 hover:bg-blue-100 border-blue-200",
    "bg-green-50 hover:bg-green-100 border-green-200",
    "bg-amber-50 hover:bg-amber-100 border-amber-200",
    "bg-purple-50 hover:bg-purple-100 border-purple-200",
    "bg-rose-50 hover:bg-rose-100 border-rose-200",
    "bg-indigo-50 hover:bg-indigo-100 border-indigo-200",
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category, index) => (
        <Link 
          href={`/categories/${category.slug}`}
          key={category.id} 
          className={`p-6 rounded-lg border ${backgroundColors[index % backgroundColors.length]} transition-all hover:shadow-md`}
        >
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-medium mb-2">{category.name}</h3>
            <div className="p-2 rounded-full bg-white shadow-sm">
              <BookOpen className="h-5 w-5 text-gray-600" />
            </div>
          </div>
          
          {/* Show a few subcategories if available */}
          {category.children && category.children.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-gray-500 mb-1">Danh mục nổi bật:</p>
              <div className="flex flex-wrap gap-2">
                {category.children.slice(0, 3).map(subCategory => (
                  <span 
                    key={subCategory.id} 
                    className="inline-block px-2 py-1 bg-white rounded-full text-xs border border-gray-200"
                  >
                    {subCategory.name}
                  </span>
                ))}
                {category.children.length > 3 && (
                  <span className="inline-block px-2 py-1 bg-white rounded-full text-xs border border-gray-200">
                    +{category.children.length - 3} khác
                  </span>
                )}
              </div>
            </div>
          )}
          
          {/* Course count and call to action */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {category.coursesCount || 0} khóa học
            </span>
            <span className="text-blue-600 text-sm font-medium">Khám phá →</span>
          </div>
        </Link>
      ))}
    </div>
  );
}