// components/FilterSidebar.tsx
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";
import { CategoryDto } from "@/types/category";
import { CourseLevel } from "@/types/new-course";

interface FilterSidebarProps {
    selectedLevel?: string;
    priceRange?: string;
    categorySlug: string;
    router: ReturnType<typeof useRouter>;
}

export function FilterSidebar({
    selectedLevel,
    priceRange,
    categorySlug,
    router,
}: FilterSidebarProps) {
    const { categories, getCategoryBySlug } = useCategories();
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCategories, setFilteredCategories] = useState<CategoryDto[]>([]);
    const levels = [{
        label: 'Cơ bản',
        value: CourseLevel.BEGINNER
    }, {
        label: 'Trung cấp',
        value: CourseLevel.INTERMEDIATE
    }, {
        label: 'Nâng cao',
        value: CourseLevel.ADVANCED
    }];

    // Set initial expanded state based on active category
    useEffect(() => {
        if (categorySlug) {
            const category = getCategoryBySlug(categorySlug);
            if (category) {
                setExpandedCategories([category.slug]);
            }
        }
    }, [categorySlug, getCategoryBySlug]);

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

    // Apply level filter
    const handleLevelChange = (level: string | undefined) => {


        const params = new URLSearchParams();
        
        if (level && levels.map(level => level.value).includes(level as CourseLevel)) {
            params.set('level', level as string);
        }
        
        if (priceRange) {
            params.set('price', priceRange);
        }
        
        const queryString = params.toString();
        router.push(`/categories/${categorySlug}${queryString ? `?${queryString}` : ''}`);
    };

    // Apply price filter
    const handlePriceChange = (price: string | undefined) => {
        const params = new URLSearchParams();
        
        if (selectedLevel) {
            params.set('level', selectedLevel);
        }
        
        if (price) {
            params.set('price', price);
        }
        
        const queryString = params.toString();
        router.push(`/categories/${categorySlug}${queryString ? `?${queryString}` : ''}`);
    };

    const clearAllFilters = () => {
        router.push(`/categories/${categorySlug}`);
    };

    return (
        <div className="w-full flex-shrink-0">
            <div className="bg-white border rounded-md p-4">
                <div className="mb-6">
                    <h3 className="font-medium text-lg border-b pb-2 mb-4">Bộ lọc</h3>
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
                                    onChange={() => handleLevelChange(undefined)}
                                    className="mr-2"
                                />
                                <label htmlFor="all-levels" className="text-sm">
                                    Tất cả
                                </label>
                            </div>
                            {levels.map((level) => (
                                <div key={level.value} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`level-${level}`}
                                        name="level"
                                        checked={selectedLevel === level.value}
                                        onChange={() => handleLevelChange(level.value)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`level-${level.value}`} className="text-sm">
                                        {level.label}
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
                                    onChange={() => handlePriceChange(undefined)}
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
                                    onChange={() => handlePriceChange("free")}
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
                                    onChange={() => handlePriceChange("low")}
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
                                    onChange={() => handlePriceChange("medium")}
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
                                    onChange={() => handlePriceChange("high")}
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