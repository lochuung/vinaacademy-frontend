"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { categoriesData } from "@/data/categories";
import FilterSection from "../ui/FilterSection";

interface CategoryFilterProps {
    expanded: boolean;
    toggleSection: () => void;
    categories: string[];
    expandedCategories: string[];
    handleCategoryToggle: (category: string) => void;
    handleCategoryExpand: (category: string) => void;
    subCategories: string[];
    expandedSubCategories: string[];
    handleSubCategoryToggle: (subCategory: string) => void;
    handleSubCategoryExpand: (subCategory: string) => void;
    selectedTopics: string[];
    handleTopicToggle: (topic: string) => void;
}

export default function CategoryFilter({
    expanded,
    toggleSection,
    categories,
    expandedCategories,
    handleCategoryToggle,
    handleCategoryExpand,
    subCategories,
    expandedSubCategories,
    handleSubCategoryToggle,
    handleSubCategoryExpand,
    selectedTopics,
    handleTopicToggle
}: CategoryFilterProps) {
    return (
        <FilterSection
            title="Danh mục"
            expanded={expanded}
            toggleSection={toggleSection}
            className="mb-6 border-b pb-4"
        >
            <div className="space-y-2 mt-3 max-h-96 overflow-y-auto pr-1">
                {categoriesData.map((category) => (
                    <div key={category.name} className="mb-2">
                        {/* Main category */}
                        <div className="flex items-center">
                            <Checkbox
                                id={`category-${category.name}`}
                                checked={categories.includes(category.name)}
                                onCheckedChange={() => handleCategoryToggle(category.name)}
                            />
                            <div className="flex items-center justify-between w-full ml-2">
                                <Label
                                    htmlFor={`category-${category.name}`}
                                    className="text-sm cursor-pointer font-medium"
                                    onClick={() => handleCategoryToggle(category.name)}
                                >
                                    {category.name}
                                </Label>
                                <button
                                    className="focus:outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCategoryExpand(category.name);
                                    }}
                                >
                                    {expandedCategories.includes(category.name) ?
                                        <ChevronUp size={14} /> :
                                        <ChevronDown size={14} />
                                    }
                                </button>
                            </div>
                        </div>

                        {/* Subcategories */}
                        {expandedCategories.includes(category.name) && (
                            <div className="ml-6 mt-1">
                                {category.subCategories.map(subCat => (
                                    <div key={subCat.name} className="mt-2">
                                        <div className="flex items-center">
                                            <Checkbox
                                                id={`subcat-${subCat.name}`}
                                                checked={subCategories.includes(subCat.name)}
                                                onCheckedChange={() => handleSubCategoryToggle(subCat.name)}
                                            />
                                            <div className="flex items-center justify-between w-full ml-2">
                                                <Label
                                                    htmlFor={`subcat-${subCat.name}`}
                                                    className="text-sm cursor-pointer"
                                                    onClick={() => handleSubCategoryToggle(subCat.name)}
                                                >
                                                    {subCat.name}
                                                </Label>
                                                <button
                                                    className="focus:outline-none"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleSubCategoryExpand(subCat.name);
                                                    }}
                                                >
                                                    {expandedSubCategories.includes(subCat.name) ?
                                                        <ChevronUp size={14} /> :
                                                        <ChevronDown size={14} />
                                                    }
                                                </button>
                                            </div>
                                        </div>

                                        {/* Trending topics */}
                                        {expandedSubCategories.includes(subCat.name) && (
                                            <div className="ml-6 mt-1">
                                                {subCat.trendingTopics.map(topic => (
                                                    <div key={topic.name} className="flex items-center mt-1">
                                                        <Checkbox
                                                            id={`topic-${topic.name}`}
                                                            checked={selectedTopics.includes(topic.name)}
                                                            onCheckedChange={() => handleTopicToggle(topic.name)}
                                                        />
                                                        <div className="ml-2 flex items-center">
                                                            <Label
                                                                htmlFor={`topic-${topic.name}`}
                                                                className="text-sm cursor-pointer"
                                                                onClick={() => handleTopicToggle(topic.name)}
                                                            >
                                                                {topic.name}
                                                            </Label>
                                                            <span className="ml-2 text-xs text-gray-500">
                                                                {topic.students}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </FilterSection>
    );
}