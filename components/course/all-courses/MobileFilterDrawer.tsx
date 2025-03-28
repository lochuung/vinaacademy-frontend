// components/MobileFilterDrawer.tsx
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
    DrawerClose,
} from "@/components/ui/drawer";
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

interface MobileFilterDrawerProps {
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

export function MobileFilterDrawer({
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedLevel,
    setSelectedLevel,
    priceRange,
    setPriceRange,
    clearAllFilters,
    levels
}: MobileFilterDrawerProps) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" className="md:hidden flex items-center gap-2">
                    <Filter size={16} />
                    Bộ lọc
                </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Bộ lọc</h3>
                    <DrawerClose asChild>
                        <Button variant="ghost" size="icon">
                            <X size={18} />
                        </Button>
                    </DrawerClose>
                </div>

                {/* Nội dung filter giống như phần desktop */}
                <div className="space-y-6">
                    {/* Filter theo danh mục */}
                    <div>
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
                    <div>
                        <h4 className="font-medium mb-2">Cấp độ</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="mobile-level-all"
                                    name="mobile-level"
                                    checked={selectedLevel === ""}
                                    onChange={() => setSelectedLevel("")}
                                    className="mr-2"
                                />
                                <label htmlFor="mobile-level-all">Tất cả</label>
                            </div>
                            {levels.map(level => (
                                <div key={level} className="flex items-center">
                                    <input
                                        type="radio"
                                        id={`mobile-level-${level}`}
                                        name="mobile-level"
                                        checked={selectedLevel === level}
                                        onChange={() => setSelectedLevel(level)}
                                        className="mr-2"
                                    />
                                    <label htmlFor={`mobile-level-${level}`}>{level}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filter theo giá */}
                    <div>
                        <h4 className="font-medium mb-2">Giá</h4>
                        <div className="space-y-2">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="mobile-price-all"
                                    name="mobile-price"
                                    checked={priceRange === ""}
                                    onChange={() => setPriceRange("")}
                                    className="mr-2"
                                />
                                <label htmlFor="mobile-price-all">Tất cả</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="mobile-price-free"
                                    name="mobile-price"
                                    checked={priceRange === "free"}
                                    onChange={() => setPriceRange("free")}
                                    className="mr-2"
                                />
                                <label htmlFor="mobile-price-free">Miễn phí</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="mobile-price-under-500k"
                                    name="mobile-price"
                                    checked={priceRange === "under_500k"}
                                    onChange={() => setPriceRange("under_500k")}
                                    className="mr-2"
                                />
                                <label htmlFor="mobile-price-under-500k">Dưới 500.000đ</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="mobile-price-500k-1m"
                                    name="mobile-price"
                                    checked={priceRange === "500k_1m"}
                                    onChange={() => setPriceRange("500k_1m")}
                                    className="mr-2"
                                />
                                <label htmlFor="mobile-price-500k-1m">500.000đ - 1.000.000đ</label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="mobile-price-over-1m"
                                    name="mobile-price"
                                    checked={priceRange === "over_1m"}
                                    onChange={() => setPriceRange("over_1m")}
                                    className="mr-2"
                                />
                                <label htmlFor="mobile-price-over-1m">Trên 1.000.000đ</label>
                            </div>
                        </div>
                    </div>

                    {/* Nút xóa bộ lọc */}
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={clearAllFilters}
                    >
                        Xóa tất cả bộ lọc
                    </Button>
                </div>
            </DrawerContent>
        </Drawer>
    );
}