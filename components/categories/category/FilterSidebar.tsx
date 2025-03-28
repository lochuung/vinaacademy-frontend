// components/FilterSidebar.tsx
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
    const clearAllFilters = () => {
        setSelectedLevel(undefined);
        setPriceRange(undefined);
    };

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="md:sticky md:top-4 bg-white border rounded-md p-4">
                <div className="mb-6">
                    <h3 className="font-medium text-lg border-b pb-2 mb-4">Bộ lọc</h3>

                    {/* Subcategories */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-3">Danh mục con</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="all-subcategories"
                                    name="subcategory"
                                    checked={!categoryInfo.subCategory}
                                    onChange={() => {
                                        if (categoryInfo.categoryLink) {
                                            router.push(categoryInfo.categoryLink);
                                        }
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="all-subcategories" className="text-sm">
                                    Tất cả
                                </label>
                            </div>
                            {subCategories.map((subCategory, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`subcategory-${index}`}
                                        name="subcategory"
                                        checked={categoryInfo.subCategory === subCategory.name}
                                        onChange={() => {
                                            router.push(subCategory.link);
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`subcategory-${index}`} className="text-sm">
                                        {subCategory.name}
                                    </label>
                                </div>
                            ))}
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