// RatingFilter.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import FilterSection from "../ui/FilterSection";

interface RatingFilterProps {
    expanded: boolean;
    toggleSection: () => void;
}

export default function RatingFilter({
    expanded,
    toggleSection
}: RatingFilterProps) {
    // Rating options
    const ratingOptions = [
        { value: "4.5", label: "4.5 trở lên" },
        { value: "4.0", label: "4.0 trở lên" },
        { value: "3.5", label: "3.5 trở lên" },
        { value: "3.0", label: "3.0 trở lên" }
    ];

    return (
        <FilterSection
            title="Đánh giá"
            expanded={expanded}
            toggleSection={toggleSection}
            className="mb-6"
        >
            <div className="space-y-2 mt-3">
                {ratingOptions.map((option) => (
                    <div key={option.value} className="flex items-center">
                        <Checkbox
                            id={`rating-${option.value}`}
                        />
                        <Label
                            htmlFor={`rating-${option.value}`}
                            className="ml-2 text-sm flex items-center"
                        >
                            <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                            {option.label}
                        </Label>
                    </div>
                ))}
            </div>
        </FilterSection>
    );
}