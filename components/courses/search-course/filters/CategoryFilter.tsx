"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useCategories } from "@/context/CategoryContext";
import FilterSection from "../ui/FilterSection";
import CategoryFilterTree from "./CategoryFilterTree";

interface CategoryFilterProps {
  expanded: boolean;
  toggleSection: () => void;
  categories: string[];
  expandedCategories: string[];
  handleCategoryToggle: (category: string) => void;
  handleCategoryExpand: (category: string) => void;
  subCategories?: string[];
  expandedSubCategories?: string[];
  handleSubCategoryToggle?: (subCategory: string) => void;
  handleSubCategoryExpand?: (subCategory: string) => void;
  selectedTopics?: string[];
  handleTopicToggle?: (topic: string) => void;
}

export default function CategoryFilter({
  expanded,
  toggleSection,
  categories,
  expandedCategories,
  handleCategoryToggle,
  handleCategoryExpand,
  subCategories = [],
  expandedSubCategories = [],
  handleSubCategoryToggle = () => {},
  handleSubCategoryExpand = () => {},
  selectedTopics = [],
  handleTopicToggle = () => {}
}: CategoryFilterProps) {
  const { categories: allCategories, isLoading } = useCategories();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter categories by search term
  const getFilteredCategories = () => {
    if (!searchTerm) return allCategories;

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Recursive function to search through category hierarchy
    const filterCategories = (cats: any[]): any[] => {
      return cats.reduce((filtered, category) => {
        const matchesSearch = category.name.toLowerCase().includes(lowerSearchTerm);
        
        // Filter children recursively
        const filteredChildren = category.children && category.children.length > 0 
          ? filterCategories(category.children) 
          : [];
        
        // Include this category if it matches or if any children match
        if (matchesSearch || filteredChildren.length > 0) {
          filtered.push({
            ...category,
            children: filteredChildren
          });
        }
        
        return filtered;
      }, [] as any[]);
    };
    
    return filterCategories(allCategories);
  };

  const filteredCategories = getFilteredCategories();

  return (
    <FilterSection
      title="Danh mục"
      expanded={expanded}
      toggleSection={toggleSection}
      className="mb-6 border-b pb-4"
    >
      {/* Search input for categories */}
      <div className="mb-3">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-2 py-1.5 border rounded-md text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Categories tree */}
      <div className="max-h-[300px] overflow-y-auto pr-2">
        {isLoading ? (
          <div className="py-4 text-center text-sm text-gray-500">
            Đang tải danh mục...
          </div>
        ) : filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <CategoryFilterTree
              key={category.id}
              category={category}
              selectedCategories={categories}
              onCategoryChange={handleCategoryToggle}
              expandedCategories={expandedCategories}
              toggleExpanded={handleCategoryExpand}
            />
          ))
        ) : (
          <div className="py-4 text-center text-sm text-gray-500">
            Không tìm thấy danh mục phù hợp
          </div>
        )}
      </div>
    </FilterSection>
  );
}