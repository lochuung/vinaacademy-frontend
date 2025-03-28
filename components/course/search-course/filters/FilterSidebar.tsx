"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryFilter from "./CategoryFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import LevelFilter from "./LevelFilter";
import RatingFilter from "./RatingFilter";
import { FilterUpdates } from "@/app/(public)/courses/search/page";

interface FilterSidebarProps {
    showMobileFilters: boolean;
    toggleMobileFilters: () => void;
    categories: string[];
    subCategories: string[];
    topics: string[];
    selectedTopics: string[];
    setSelectedTopics: (topics: string[]) => void;
    minPrice: string;
    maxPrice: string;
    levels: string[];
    applyFilters: (filters: FilterUpdates) => void;
    clearAllFilters: () => void;
}

export default function FilterSidebar({
    showMobileFilters,
    toggleMobileFilters,
    categories,
    subCategories,
    topics,
    selectedTopics,
    setSelectedTopics,
    minPrice,
    maxPrice,
    levels,
    applyFilters,
    clearAllFilters
}: FilterSidebarProps) {
    // State for expanded filter sections
    const [expandedSections, setExpandedSections] = useState({
        categories: true,
        price: true,
        level: true,
        rating: true,
    });

    // State for expanded categories
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
    const [expandedSubCategories, setExpandedSubCategories] = useState<string[]>([]);

    // Toggle filter section visibility
    const toggleSection = (section: 'categories' | 'price' | 'level' | 'rating') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    // Handle category toggle
    const handleCategoryToggle = (categoryName: string) => {
        // Toggle expanded state
        if (expandedCategories.includes(categoryName)) {
            setExpandedCategories(expandedCategories.filter(cat => cat !== categoryName));
        } else {
            setExpandedCategories([...expandedCategories, categoryName]);
        }

        // Update filter selection
        let newCategories;
        if (categories.includes(categoryName)) {
            newCategories = categories.filter(c => c !== categoryName);
        } else {
            newCategories = [...categories, categoryName];
        }

        applyFilters({
            categories: newCategories.length > 0 ? newCategories.join(',') : null
        });
    };

    // Handle subcategory toggle
    const handleSubCategoryToggle = (subCategoryId: string) => {
        // Toggle expanded state
        if (expandedSubCategories.includes(subCategoryId)) {
            setExpandedSubCategories(expandedSubCategories.filter(id => id !== subCategoryId));
        } else {
            setExpandedSubCategories([...expandedSubCategories, subCategoryId]);
        }

        // Update filter selection
        let newSubCategories;
        if (subCategories.includes(subCategoryId)) {
            newSubCategories = subCategories.filter(id => id !== subCategoryId);
        } else {
            newSubCategories = [...subCategories, subCategoryId];
        }

        applyFilters({
            subCategories: newSubCategories.length > 0 ? newSubCategories.join(',') : null
        });
    };

    // Handle topic toggle
    const handleTopicToggle = (topicName: string) => {
        let newTopics;
        if (topics.includes(topicName)) {
            newTopics = topics.filter(name => name !== topicName);
        } else {
            newTopics = [...topics, topicName];
        }

        // Update local state immediately for responsive UI
        setSelectedTopics(newTopics);

        applyFilters({
            topics: newTopics.length > 0 ? newTopics.join(',') : null
        });
    };

    // Handle level toggle
    const handleLevelToggle = (levelName: string) => {
        let newLevels;
        if (levels.includes(levelName)) {
            newLevels = levels.filter(l => l !== levelName);
        } else {
            newLevels = [...levels, levelName];
        }

        applyFilters({
            level: newLevels.length > 0 ? newLevels.join(',') : null
        });
    };

    return (
        <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block lg:w-1/4`}>
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24" style={{ position: "sticky", top: "24px" }}>
                {/* Mobile header */}
                <div className="lg:hidden flex justify-between items-center mb-4">
                    <h3 className="font-bold">Bộ lọc</h3>
                    <Button variant="ghost" size="sm" onClick={toggleMobileFilters}>
                        <X size={18} />
                    </Button>
                </div>

                {/* Category filter */}
                <CategoryFilter
                    expanded={expandedSections.categories}
                    toggleSection={() => toggleSection('categories')}
                    categories={categories}
                    expandedCategories={expandedCategories}
                    handleCategoryToggle={handleCategoryToggle}
                    subCategories={subCategories}
                    expandedSubCategories={expandedSubCategories}
                    handleSubCategoryToggle={handleSubCategoryToggle}
                    selectedTopics={selectedTopics}
                    handleTopicToggle={handleTopicToggle}
                />

                {/* Price range filter */}
                <PriceRangeFilter
                    expanded={expandedSections.price}
                    toggleSection={() => toggleSection('price')}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    applyFilters={applyFilters}
                />

                {/* Level filter */}
                <LevelFilter
                    expanded={expandedSections.level}
                    toggleSection={() => toggleSection('level')}
                    levels={levels}
                    handleLevelToggle={handleLevelToggle}
                />

                {/* Rating filter */}
                <RatingFilter
                    expanded={expandedSections.rating}
                    toggleSection={() => toggleSection('rating')}
                />

                {/* Clear all filters button */}
                {(categories.length > 0 || subCategories.length > 0 || topics.length > 0 || minPrice || maxPrice || levels.length > 0) && (
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full mb-4 text-blue-600 border-blue-600"
                        onClick={clearAllFilters}
                    >
                        <X size={16} className="mr-1" />
                        Xóa tất cả bộ lọc
                    </Button>
                )}
            </div>
        </div>
    );
}