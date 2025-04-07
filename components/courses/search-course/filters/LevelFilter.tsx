// LevelFilter.tsx
"use client";

import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import FilterSection from "../ui/FilterSection";

interface LevelFilterProps {
    expanded: boolean;
    toggleSection: () => void;
    levels: string[];
    handleLevelToggle: (level: string) => void;
}

export default function LevelFilter({
                                        expanded,
                                        toggleSection,
                                        levels,
                                        handleLevelToggle
                                    }: LevelFilterProps) {
    // Level options
    const levelOptions = ["Cơ bản", "Trung cấp", "Nâng cao"];

    return (
        <FilterSection
            title="Cấp độ"
            expanded={expanded}
            toggleSection={toggleSection}
            className="mb-6 border-b pb-4"
        >
            <div className="space-y-2 mt-3">
                {levelOptions.map((levelItem) => (
                    <div key={levelItem} className="flex items-center">
                        <Checkbox
                            id={`level-${levelItem}`}
                            checked={levels.includes(levelItem)}
                            onCheckedChange={() => handleLevelToggle(levelItem)}
                        />
                        <Label
                            htmlFor={`level-${levelItem}`}
                            className="ml-2 text-sm cursor-pointer"
                            onClick={() => handleLevelToggle(levelItem)}
                        >
                            {levelItem}
                        </Label>
                    </div>
                ))}
            </div>
        </FilterSection>
    );
}
