// components/SortingControl.tsx
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface SortingControlProps {
    sortBy: string;
    setSortBy: (value: string) => void;
    totalCourses: number;
    onOpenMobileFilter?: () => void;
}

export function SortingControl({
    sortBy,
    setSortBy,
    totalCourses,
    onOpenMobileFilter
}: SortingControlProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
                <span className="text-gray-700 font-medium">Tìm thấy {totalCourses} khóa học</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
                {/* Button hiển thị filter trên mobile */}
                <Button
                    variant="outline"
                    className="md:hidden flex items-center gap-2"
                    onClick={onOpenMobileFilter}
                >
                    <Filter size={16} />
                    Bộ lọc
                </Button>

                {/* Sắp xếp */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm hidden md:inline">Sắp xếp theo:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="min-w-[180px]">
                            <SelectValue placeholder="Phổ biến nhất" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popular">Phổ biến nhất</SelectItem>
                            <SelectItem value="newest">Mới nhất</SelectItem>
                            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                            <SelectItem value="price_low">Giá: thấp đến cao</SelectItem>
                            <SelectItem value="price_high">Giá: cao đến thấp</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
}