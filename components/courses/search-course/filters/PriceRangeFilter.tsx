// PriceRangeFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FilterSection from "../ui/FilterSection";
import { FilterUpdates } from "@/app/(public)/courses/search/page";

interface PriceRangeFilterProps {
    expanded: boolean;
    toggleSection: () => void;
    minPrice: string;
    maxPrice: string;
    applyFilters: (filters: FilterUpdates) => void;
}

export default function PriceRangeFilter({
    expanded,
    toggleSection,
    minPrice,
    maxPrice,
    applyFilters
}: PriceRangeFilterProps) {
    // Local state for price inputs
    const [priceInputs, setPriceInputs] = useState({
        min: "",
        max: ""
    });

    // Update local inputs when URL params change
    useEffect(() => {
        setPriceInputs({
            min: minPrice,
            max: maxPrice
        });
    }, [minPrice, maxPrice]);

    // Apply price range filter
    const applyPriceRange = () => {
        applyFilters({
            minPrice: priceInputs.min || null,
            maxPrice: priceInputs.max || null
        });
    };

    return (
        <FilterSection
            title="Mức giá"
            expanded={expanded}
            toggleSection={toggleSection}
            className="mb-6 border-b pb-4"
        >
            <div className="space-y-3 mt-3">
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Từ"
                        value={priceInputs.min}
                        onChange={(e) => setPriceInputs({ ...priceInputs, min: e.target.value })}
                        className="w-1/2 p-2 text-sm border border-gray-300 rounded bg-white text-gray-700"
                    />
                    <input
                        type="number"
                        placeholder="Đến"
                        value={priceInputs.max}
                        onChange={(e) => setPriceInputs({ ...priceInputs, max: e.target.value })}
                        className="w-1/2 p-2 text-sm border border-gray-300 rounded bg-white text-gray-700"
                    />
                </div>
                <div className="text-xs text-gray-500">
                    Nhập giá trị theo đơn vị nghìn đồng (VD: 100 = 100.000đ)
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2"
                    onClick={applyPriceRange}
                >
                    Áp dụng
                </Button>
            </div>
        </FilterSection>
    );
}




