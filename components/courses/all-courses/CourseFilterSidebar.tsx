// components/CourseFilterSidebar.tsx
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CategoryOption {
    value: string;
    label: string;
}

interface CourseFilterSidebarProps {
    categories: CategoryOption[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedLevel: string;
    setSelectedLevel: (level: string) => void;
    priceRange: string;
    setPriceRange: (range: string) => void;
    clearAllFilters: () => void;
    levels: string[];
}

export function CourseFilterSidebar({
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    priceRange,
    setPriceRange,
    clearAllFilters,
    levels
}: CourseFilterSidebarProps) {
    return (
        <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white border rounded-md p-4 sticky top-4">
                <h3 className="font-bold text-lg border-b pb-2 mb-4">Bộ lọc</h3>

                {/* Filter theo danh mục */}
                <div className="mb-6">
                    <h4 className="font-medium mb-2">Danh mục</h4>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Tất cả danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Tất cả danh mục</SelectItem>
                            {categories.map(category => (
                                <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Filter theo cấp độ */}
                <div className="mb-6">
                    <h4 className="font-medium mb-2">Cấp độ</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="level-all"
                                name="level"
                                checked={selectedLevel === ""}
                                onChange={() => setSelectedLevel("")}
                                className="mr-2"
                            />
                            <label htmlFor="level-all">Tất cả</label>
                        </div>
                        {levels.map(level => (
                            <div key={level} className="flex items-center">
                                <input
                                    type="radio"
                                    id={`level-${level}`}
                                    name="level"
                                    checked={selectedLevel === level}
                                    onChange={() => setSelectedLevel(level)}
                                    className="mr-2"
                                />
                                <label htmlFor={`level-${level}`}>{level}</label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Filter theo giá */}
                <div className="mb-6">
                    <h4 className="font-medium mb-2">Giá</h4>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="price-all"
                                name="price"
                                checked={priceRange === ""}
                                onChange={() => setPriceRange("")}
                                className="mr-2"
                            />
                            <label htmlFor="price-all">Tất cả</label>
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
                            <label htmlFor="price-free">Miễn phí</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="price-under-500k"
                                name="price"
                                checked={priceRange === "under_500k"}
                                onChange={() => setPriceRange("under_500k")}
                                className="mr-2"
                            />
                            <label htmlFor="price-under-500k">Dưới 500.000đ</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="price-500k-1m"
                                name="price"
                                checked={priceRange === "500k_1m"}
                                onChange={() => setPriceRange("500k_1m")}
                                className="mr-2"
                            />
                            <label htmlFor="price-500k-1m">500.000đ - 1.000.000đ</label>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                id="price-over-1m"
                                name="price"
                                checked={priceRange === "over_1m"}
                                onChange={() => setPriceRange("over_1m")}
                                className="mr-2"
                            />
                            <label htmlFor="price-over-1m">Trên 1.000.000đ</label>
                        </div>
                    </div>
                </div>

                {/* Nút xóa bộ lọc */}
                {(selectedCategory || selectedLevel || priceRange) && (
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={clearAllFilters}
                    >
                        Xóa tất cả bộ lọc
                    </Button>
                )}
            </div>
        </div>
    );
}