import Image from "next/image";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import {Button} from "@/components/ui/button";
import { CategoryDto } from "@/types/category";

interface CategoryCardProps {
    category: CategoryDto;
    featured?: boolean;
}

export function CategoryCard({category, featured = false}: CategoryCardProps) {
    // Use coursesCount from the category or default to 0
    const coursesCount = category.coursesCount || 0;
    // Create the navigation URL using the slug
    const categoryUrl = `/categories/${category.slug}`;

    if (featured) {
        return (
            <Link href={categoryUrl} className="group">
                <div
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 group-hover:shadow-xl h-full flex flex-col">
                    <div className="relative h-48">
                        {/* Use a default image if category.image is not available */}
                        <Image 
                            src={"/images/categories/default.jpg"} 
                            alt={category.name} 
                            fill 
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    </div>
                    <div className="p-6 flex-grow">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300">
                            {category.name}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                            {/* Display the parent category if available */}
                            {category.parentSlug ? `Danh mục con của ${category.parentSlug}` : 'Khám phá các khóa học phổ biến'}
                        </p>
                        <div className="text-sm text-gray-500">{coursesCount} khóa học</div>
                    </div>
                    <div className="px-6 pb-6">
                        <Button
                            variant="outline"
                            className="w-full group-hover:bg-black group-hover:text-white transition-all duration-300"
                        >
                            Xem khóa học <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={categoryUrl} className="group">
            <div
                className="bg-white rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col">
                <div className="relative h-40">
                    {/* Use a default image if category.image is not available */}
                    <Image 
                        src={"/images/categories/default.jpg"} 
                        alt={category.name} 
                        fill 
                        className="object-cover"
                    />
                </div>
                <div className="p-5 flex-grow">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {category.name}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                        {/* Show child categories count if any */}
                        {category.children && category.children.length > 0
                            ? `${category.children.length} danh mục con`
                            : 'Khám phá các khóa học phổ biến'
                        }
                    </p>
                    <div className="text-sm text-gray-500">{coursesCount} khóa học</div>
                </div>
            </div>
        </Link>
    );
}