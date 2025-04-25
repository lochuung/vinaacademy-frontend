"use client";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SortAsc, SortDesc } from "lucide-react";

interface SortCoursesProps {
    sortBy: string;
    sortDirection: "asc" | "desc";
    onSortByChange: (value: string) => void;
    onSortDirectionChange: () => void;
}

export function SortCourses({
    sortBy,
    sortDirection,
    onSortByChange,
    onSortDirectionChange,
}: SortCoursesProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sắp xếp theo:</span>
                <Select value={sortBy} onValueChange={onSortByChange}>
                    <SelectTrigger className="w-[150px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="totalStudent">Phổ biến</SelectItem>
                        <SelectItem value="rating">Đánh giá</SelectItem>
                        <SelectItem value="createdDate">Mới nhất</SelectItem>
                        <SelectItem value="price">Giá</SelectItem>
                        <SelectItem value="name">Tên</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button
                variant="outline"
                size="icon"
                onClick={onSortDirectionChange}
                className="h-9 w-9"
            >
                {sortDirection === "asc" ? <SortAsc size={16} /> : <SortDesc size={16} />}
            </Button>
        </div>
    );
}
