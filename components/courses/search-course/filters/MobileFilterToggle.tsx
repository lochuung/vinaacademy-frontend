// MobileFilterToggle.tsx
"use client";

import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileFilterToggleProps {
    toggleMobileFilters: () => void;
}

export default function MobileFilterToggle({
    toggleMobileFilters
}: MobileFilterToggleProps) {
    return (
        <div className="lg:hidden mb-4">
            <Button
                onClick={toggleMobileFilters}
                variant="outline"
                className="w-full flex items-center justify-between"
            >
                <span className="flex items-center">
                    <Filter size={16} className="mr-2" />
                    Bộ lọc
                </span>
                <ChevronDown size={16} />
            </Button>
        </div>
    );
}