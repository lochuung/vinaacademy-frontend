// components/SubCategoryFilterSidebar.tsx
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";
import { CategoryBreadcrumb } from "../ui/CategoryBreadcrumb";
import { CategoryDto } from "@/types/category";

interface SubCategory {
    name: string;
    link: string;
}

interface SubCategoryFilterSidebarProps {
    categoryData: any;
    category: string;
    subcategory: string;
    selectedLevel?: string;
    setSelectedLevel: (level: string | undefined) => void;
    priceRange?: string;
    setPriceRange: (price: string | undefined) => void;
    selectedTopic: string | null;
    setSelectedTopic: (topic: string | null) => void;
    topics: string[];
    topicParam: string | null;
    router: ReturnType<typeof useRouter>;
}

export function SubCategoryFilterSidebar({
    categoryData,
    category,
    subcategory,
    selectedLevel,
    setSelectedLevel,
    priceRange,
    setPriceRange,
    selectedTopic,
    setSelectedTopic,
    topics,
    topicParam,
    router,
}: SubCategoryFilterSidebarProps) {
    const { getCategoryBySlug, getCategoryPath } = useCategories();
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [parentCategory, setParentCategory] = useState<CategoryDto | null>(null);
    const [siblingCategories, setSiblingCategories] = useState<CategoryDto[]>([]);
    const [activeBreadcrumb, setActiveBreadcrumb] = useState<string[]>([]);
    
    // Set initial component state
    useEffect(() => {
        const parent = getCategoryBySlug(category);
        setParentCategory(parent || null);
        
        if (parent && parent.children) {
            setSiblingCategories(parent.children);
            // Auto-expand current subcategory
            const currentSubCat = parent.children.find(
                child => child.slug === subcategory
            );
            if (currentSubCat) {
                setExpandedCategories([parent.slug, currentSubCat.slug]);
            } else {
                setExpandedCategories([parent.slug]);
            }
        }
        
        // Build breadcrumb path
        const path = getCategoryPath(subcategory);
        setActiveBreadcrumb(path.map(cat => cat.slug));
    }, [category, subcategory, getCategoryBySlug, getCategoryPath]);

    const clearAllFilters = () => {
        setSelectedLevel(undefined);
        setPriceRange(undefined);
        setSelectedTopic(null);
        if (topicParam) {
            router.replace(`/categories/${category}/${subcategory}`, { scroll: false });
        }
    };
    
    // Toggle category expansion
    const toggleCategory = (slug: string) => {
        setExpandedCategories(prev => 
            prev.includes(slug)
                ? prev.filter(id => id !== slug)
                : [...prev, slug]
        );
    };

    // Navigate to category or subcategory
    const navigateToCategory = (cat: CategoryDto) => {
        router.push(`/categories/${cat.slug}`);
    };

    const navigateToSubcategory = (subCat: CategoryDto) => {
        if (parentCategory) {
            router.push(`/categories/${parentCategory.slug}/${subCat.slug}`);
        }
    };

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-4 bg-white border rounded-md p-4">
                <div className="mb-6">
                    <h3 className="font-medium text-lg border-b pb-2 mb-2">Bộ lọc</h3>
                    
                    {/* Breadcrumb navigation */}
                    <div className="mb-4">
                        <CategoryBreadcrumb slug={subcategory} className="text-xs" />
                    </div>

                    {/* Sibling Subcategories */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2 flex justify-between items-center">
                            <span>Danh mục con</span>
                            {parentCategory && (
                                <button 
                                    className="text-xs text-blue-600 hover:underline"
                                    onClick={() => router.push(`/categories/${parentCategory.slug}`)}
                                >
                                    Xem tất cả
                                </button>
                            )}
                        </h4>
                        
                        <div className="space-y-1 max-h-[180px] overflow-y-auto pr-1">
                            {/* Parent category link */}
                            {parentCategory && (
                                <div className="flex items-center py-1.5">
                                    <input
                                        type="radio"
                                        id={`category-parent`}
                                        name="subcategory"
                                        onChange={() => navigateToCategory(parentCategory)}
                                        className="mr-2"
                                    />
                                    <label 
                                        htmlFor={`category-parent`} 
                                        className="text-sm cursor-pointer font-medium"
                                    >
                                        Tất cả {parentCategory.name}
                                    </label>
                                </div>
                            )}
                            
                            {/* Subcategories */}
                            <div className="pl-3 border-l border-gray-200 ml-1 mt-1 space-y-1">
                                {siblingCategories.map(subCat => {
                                    const isActive = subCat.slug === subcategory;
                                    return (
                                        <div key={subCat.id} className="flex items-center py-1">
                                            <input
                                                type="radio"
                                                id={`subcategory-${subCat.slug}`}
                                                name="subcategory"
                                                checked={isActive}
                                                onChange={() => navigateToSubcategory(subCat)}
                                                className="mr-2"
                                            />
                                            <label 
                                                htmlFor={`subcategory-${subCat.slug}`} 
                                                className={`text-sm cursor-pointer ${isActive ? 'font-medium' : ''}`}
                                            >
                                                {subCat.name}
                                            </label>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Topics */}
                    {topics.length > 0 && (
                        <div className="mb-6">
                            <h4 className="font-medium mb-3">Chủ đề</h4>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="all-topics"
                                        name="topic"
                                        checked={selectedTopic === null}
                                        onChange={() => setSelectedTopic(null)}
                                        className="mr-2"
                                    />
                                    <label htmlFor="all-topics" className="text-sm">
                                        Tất cả
                                    </label>
                                </div>
                                {topics.map((topic, index) => (
                                    <div key={index} className="flex items-center">
                                        <input
                                            type="radio"
                                            id={`topic-${topic}`}
                                            name="topic"
                                            checked={selectedTopic === topic}
                                            onChange={() => setSelectedTopic(topic)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={`topic-${topic}`} className="text-sm">
                                            {topic}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Level */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-3">Cấp độ</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="all-levels"
                                    name="level"
                                    checked={selectedLevel === undefined}
                                    onChange={() => setSelectedLevel(undefined)}
                                    className="mr-2"
                                />
                                <label htmlFor="all-levels" className="text-sm">
                                    Tất cả
                                </label>
                            </div>
                            {["Cơ bản", "Trung cấp", "Nâng cao"].map((level) => (
                                <div key={level} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`level-${level}`}
                                        name="level"
                                        checked={selectedLevel === level}
                                        onChange={() => setSelectedLevel(level)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`level-${level}`} className="text-sm">
                                        {level}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <h4 className="font-medium mb-3">Giá</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="all-prices"
                                    name="price"
                                    checked={priceRange === undefined}
                                    onChange={() => setPriceRange(undefined)}
                                    className="mr-2"
                                />
                                <label htmlFor="all-prices" className="text-sm">
                                    Tất cả
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="price-free"
                                    name="price"
                                    checked={priceRange === "free"}
                                    onChange={() => setPriceRange("free")}
                                    className="mr-2"
                                />
                                <label htmlFor="price-free" className="text-sm">
                                    Miễn phí
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="price-low"
                                    name="price"
                                    checked={priceRange === "low"}
                                    onChange={() => setPriceRange("low")}
                                    className="mr-2"
                                />
                                <label htmlFor="price-low" className="text-sm">
                                    &lt; 500,000đ
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="price-medium"
                                    name="price"
                                    checked={priceRange === "medium"}
                                    onChange={() => setPriceRange("medium")}
                                    className="mr-2"
                                />
                                <label htmlFor="price-medium" className="text-sm">
                                    500,000đ - 1,000,000đ
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="price-high"
                                    name="price"
                                    checked={priceRange === "high"}
                                    onChange={() => setPriceRange("high")}
                                    className="mr-2"
                                />
                                <label htmlFor="price-high" className="text-sm">
                                    &gt; 1,000,000đ
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Clear filters button */}
                    {(selectedLevel || priceRange || selectedTopic) && (
                        <div className="mt-6 pt-4 border-t">
                            <Button
                                onClick={clearAllFilters}
                                variant="outline"
                                className="w-full"
                            >
                                Xóa tất cả bộ lọc
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}