"use client";

import { useEffect, useState } from "react";
import { useCategories } from "@/context/CategoryContext";
import { CategoryHierarchyDisplay } from "@/components/categories/ui/CategoryHierarchyDisplay";
import { FeaturedCategories } from "@/components/categories/FeaturedCategories";
import { Search } from "lucide-react";
import { CategoryDto } from "@/types/category";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CategoriesPage() {
    const { categories, isLoading } = useCategories();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState<CategoryDto[]>([]);
    const [activeView, setActiveView] = useState<'hierarchy' | 'grid'>('hierarchy');

    // Filter categories based on search
    useEffect(() => {
        if (!searchTerm) {
            setFilteredCategories(categories);
            return;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();

        // Recursive function to search through category hierarchy
        const filterCategories = (cats: CategoryDto[]): CategoryDto[] => {
            return cats.reduce((filtered, category) => {
                const matchesSearch = category.name.toLowerCase().includes(lowerSearchTerm);

                // Filter children recursively
                const filteredChildren = category.children && category.children.length > 0
                    ? filterCategories(category.children)
                    : [];

                // Include this category if it matches or if any children match
                if (matchesSearch || filteredChildren.length > 0) {
                    filtered.push({
                        ...category,
                        children: filteredChildren
                    });
                }

                return filtered;
            }, [] as CategoryDto[]);
        };

        setFilteredCategories(filterCategories(categories));
    }, [searchTerm, categories]);

    // Get popular categories (top 6 for featured section)
    const popularCategories = categories.slice(0, 6);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero section with search */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl font-bold mb-6">Khám phá tất cả danh mục</h1>
                        <p className="text-xl mb-8">
                            Tìm kiếm khóa học chất lượng cao trong các chủ đề đa dạng
                        </p>

                        {/* Search input */}
                        <div className="relative max-w-xl mx-auto">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm danh mục..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full py-3 pl-12 pr-4 rounded-full bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured categories section */}
            <div className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-8 text-center">Danh mục phổ biến</h2>
                    <FeaturedCategories categories={popularCategories} />
                </div>
            </div>

            {/* All categories with view toggle */}
            <div className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold">Tất cả danh mục</h2>
                        <div className="flex gap-2">
                            <Button
                                variant={activeView === 'hierarchy' ? 'default' : 'outline'}
                                onClick={() => setActiveView('hierarchy')}
                                className="flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="8" y1="6" x2="21" y2="6"></line>
                                    <line x1="8" y1="12" x2="21" y2="12"></line>
                                    <line x1="8" y1="18" x2="21" y2="18"></line>
                                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                                </svg>
                                Phân cấp
                            </Button>
                            <Button
                                variant={activeView === 'grid' ? 'default' : 'outline'}
                                onClick={() => setActiveView('grid')}
                                className="flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="3" width="7" height="7"></rect>
                                    <rect x="14" y="14" width="7" height="7"></rect>
                                    <rect x="3" y="14" width="7" height="7"></rect>
                                </svg>
                                Lưới
                            </Button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
                        </div>
                    ) : filteredCategories.length > 0 ? (
                        <>
                            {activeView === 'hierarchy' ? (
                                <CategoryHierarchyDisplay categories={filteredCategories} />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {filteredCategories.map(category => (
                                        <Link
                                            key={category.id}
                                            href={`/categories/${category.slug}`}
                                            className="bg-white p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow"
                                        >
                                            <h3 className="font-medium text-lg mb-2">{category.name}</h3>
                                            {category.children && category.children.length > 0 && (
                                                <p className="text-sm text-gray-500">
                                                    {category.children.length} {category.children.length === 1 ? 'subcategory' : 'subcategories'}
                                                </p>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-lg border">
                            <h3 className="text-xl font-medium mb-2">Không tìm thấy danh mục</h3>
                            <p className="text-gray-500">
                                Hãy thử tìm kiếm với từ khóa khác
                            </p>
                            {searchTerm && (
                                <Button
                                    variant="outline"
                                    className="mt-4"
                                    onClick={() => setSearchTerm('')}
                                >
                                    Xóa tìm kiếm
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}