// components/SubCategoryNavigation.tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SubCategoryNavigationProps {
    categoryData: any;
    categoryInfo: {
        category?: string;
        categoryLink?: string;
        subCategory?: string;
        subCategoryLink?: string;
    };
    category: string;
    subcategory: string;
}

export function SubCategoryNavigation({
    categoryData,
    categoryInfo,
    category,
    subcategory
}: SubCategoryNavigationProps) {
    if (!categoryData || !categoryInfo.category) {
        return (
            <div className="border-b">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto scrollbar-hide py-2 space-x-2 items-center">
                        <div className="text-gray-500 py-2">Không có dữ liệu danh mục</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="border-b">
            <div className="container mx-auto px-4">
                <div className="flex overflow-x-auto scrollbar-hide py-2 space-x-2 items-center">
                    {/* Hiển thị danh mục cha */}
                    <Link
                        href={`/categories/${category}`}
                        className={`whitespace-nowrap px-4 py-2 text-gray-700 hover:text-purple-700`}
                    >
                        {categoryInfo.category}
                    </Link>

                    {/* Mũi tên phân cách lớn giữa danh mục cha và con */}
                    <div className="flex items-center self-stretch mx-1 py-2">
                        <ChevronRight className="text-gray-400" size={24} strokeWidth={1.5} />
                    </div>

                    {/* Danh mục con container */}
                    <div className="flex space-x-6">
                        {/* Hiển thị tất cả danh mục con của cùng danh mục cha */}
                        {categoryData.subCategories && categoryData.subCategories.map((subCat: { name: string; link: string }, index: number) => {
                            const subCatSlug = subCat.link.split('/').pop();
                            return (
                                <Link
                                    key={index}
                                    href={subCat.link}
                                    className={`whitespace-nowrap px-4 py-2 text-gray-700 hover:text-purple-700 ${subcategory && subcategory === subCatSlug ? 'font-medium border-b-2 border-black' : ''
                                        }`}
                                >
                                    {subCat.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}