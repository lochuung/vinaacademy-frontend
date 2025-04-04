// components/SortingControls.tsx
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SortingControlsProps {
    sortBy: string;
    setSortBy: (value: string) => void;
    selectedLevel?: string;
    setSelectedLevel: (value: string | undefined) => void;
    priceRange?: string;
    setPriceRange: (value: string | undefined) => void;
}

export function SortingControls({
    sortBy,
    setSortBy,
    selectedLevel,
    setSelectedLevel,
    priceRange,
    setPriceRange,
}: SortingControlsProps) {
    const hasFilters = selectedLevel || priceRange;

    return (
        <div className="mb-4">
            <div className="flex items-center gap-6 mb-4">
                {/* Sort dropdown - left side */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Phổ biến nhất" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Phổ biến nhất</SelectItem>
                            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                            <SelectItem value="newest">Mới nhất</SelectItem>
                            <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
                            <SelectItem value="price-high">Giá: Cao đến thấp</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Filter tags - right side */}
                {hasFilters && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Lọc theo:</span>

                        {selectedLevel && (
                            <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
                                <span>Cấp độ: {selectedLevel}</span>
                                <button className="ml-2" onClick={() => setSelectedLevel(undefined)}>
                                    ×
                                </button>
                            </div>
                        )}

                        {priceRange && (
                            <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
                                <span>
                                    Giá:{" "}
                                    {priceRange === "free"
                                        ? "Miễn phí"
                                        : priceRange === "low"
                                            ? "< 500,000đ"
                                            : priceRange === "medium"
                                                ? "500,000đ - 1,000,000đ"
                                                : "> 1,000,000đ"}
                                </span>
                                <button className="ml-2" onClick={() => setPriceRange(undefined)}>
                                    ×
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}