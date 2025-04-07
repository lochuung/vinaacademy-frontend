// components/FilterSidebar.tsx
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";
import { CategoryDto } from "@/types/category";

interface SubCategory {
    name: string;
    link: string;
}

interface FilterSidebarProps {
    selectedLevel?: string;
    setSelectedLevel: (level: string | undefined) => void;
    priceRange?: string;
    setPriceRange: (price: string | undefined) => void;
    subCategories: SubCategory[];
    categoryInfo: {
        category?: string;
        categoryLink?: string;
        subCategory?: string;
        subCategoryLink?: string;
    };
    router: ReturnType<typeof useRouter>;
}

export function FilterSidebar({
    selectedLevel,
    setSelectedLevel,
    priceRange,
    setPriceRange,
    subCategories,
    categoryInfo,
    router,
}: FilterSidebarProps) {
    const { categories, getCategoryBySlug } = useCategories();
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState<CategoryDto[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
        categoryInfo.category ? categoryInfo.category.toLowerCase() : undefined
    );

    // Set initial expanded state based on active category
    useEffect(() => {
        if (categoryInfo.category) {
            const category = getCategoryBySlug(categoryInfo.category.toLowerCase());
            if (category) {
                setExpandedCategories([category.slug]);
                if (categoryInfo.subCategory && category.children) {
                    // Find and expand the subcategory that matches
                    const subCategory = category.children.find(
                        child => child.name.toLowerCase() === categoryInfo.subCategory?.toLowerCase()
                    );
                    if (subCategory) {
                        setExpandedCategories(prev => [...prev, subCategory.slug]);
                    }
                }
            }
        }
    }, [categoryInfo, getCategoryBySlug]);

    // Filter categories based on search
    useEffect(() => {
        if (!searchTerm) {
            setFilteredCategories(categories);
            return;
        }

        const lowerSearchTerm = searchTerm.toLowerCase();
        const filtered = categories.filter(category => 
            category.name.toLowerCase().includes(lowerSearchTerm)
        );
        setFilteredCategories(filtered);
    }, [searchTerm, categories]);

    // Toggle category expansion
    const toggleCategory = (slug: string) => {
        setExpandedCategories(prev => 
            prev.includes(slug)
                ? prev.filter(id => id !== slug)
                : [...prev, slug]
        );
    };

    // Navigate to category page
    const handleCategorySelect = (category: CategoryDto) => {
        router.push(`/categories/${category.slug}`);
    };

    const clearAllFilters = () => {
        setSelectedLevel(undefined);
        setPriceRange(undefined);
    };

    // Recursive function to render category tree
    const renderCategoryTree = (category: CategoryDto, depth = 0) => {
        const isExpanded = expandedCategories.includes(category.slug);
        const isActive = category.slug.toLowerCase() === categoryInfo.category?.toLowerCase();
        const hasChildren = category.children && category.children.length > 0;
        const paddingLeft = `${depth * 12 + 4}px`;

        return (
            <div key={category.id} className="category-item">
                <div 
                    className={`
                        flex items-center py-2 cursor-pointer group transition-colors
                        ${isActive ? 'font-medium text-black' : 'text-gray-700 hover:text-black'}
                    `}
                    style={{ paddingLeft }}
                    onClick={() => handleCategorySelect(category)}
                >
                    <div className="flex items-center flex-1 min-w-0">
                        <input
                            type="radio"
                            id={`category-${category.slug}`}
                            name="category"
                            checked={isActive}
                            onChange={() => handleCategorySelect(category)}
                            className="mr-2"
                        />
                        <label 
                            htmlFor={`category-${category.slug}`} 
                            className="truncate text-sm cursor-pointer"
                        >
                            {category.name}
                        </label>
                    </div>
                    
                    {hasChildren && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleCategory(category.slug);
                            }}
                            className="p-1 rounded-full opacity-70 hover:opacity-100 focus:outline-none"
                        >
                            <svg 
                                className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M9 5l7 7-7 7" 
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Render children if expanded */}
                {isExpanded && hasChildren && (
                    <div className="pl-4 border-l border-gray-200 ml-2">
                        {category.children.map(child => renderCategoryTree(child, depth + 1))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-4 bg-white border rounded-md p-4">
                <div className="mb-6">
                    <h3 className="font-medium text-lg border-b pb-2 mb-4">Bộ lọc</h3>

                    {/* Categories with search */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium">Danh mục</h4>
                            <button 
                                className="text-xs text-blue-600 hover:underline"
                                onClick={() => router.push('/categories')}
                            >
                                Xem tất cả
                            </button>
                        </div>

                        {/* Search input */}
                        <div className="relative mb-3">
                            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Tìm danh mục..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-8 pr-2 py-1.5 border rounded-md text-sm focus:outline-none"
                            />
                        </div>

                        {/* Category tree */}
                        <div className="max-h-[240px] overflow-y-auto pr-1 space-y-1">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map(category => renderCategoryTree(category))
                            ) : (
                                <div className="text-sm text-gray-500 text-center py-2">
                                    Không tìm thấy danh mục
                                </div>
                            )}
                        </div>
                    </div>

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
                    {(selectedLevel || priceRange) && (
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