// FilterSection.tsx
"use client";

import { ReactNode } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FilterSectionProps {
    title: string;
    expanded: boolean;
    toggleSection: () => void;
    children: ReactNode;
    className?: string;
}

export default function FilterSection({
    title,
    expanded,
    toggleSection,
    children,
    className = ""
}: FilterSectionProps) {
    return (
        <div className={className}>
            <div
                className="flex justify-between items-center cursor-pointer mb-2"
                onClick={toggleSection}
            >
                <h3 className="font-semibold">{title}</h3>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>

            {expanded && children}
        </div>
    );
}