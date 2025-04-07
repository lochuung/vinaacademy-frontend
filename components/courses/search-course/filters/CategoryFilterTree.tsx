"use client";

import { useState } from "react";
import { CategoryDto } from "@/types/category";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronRight, ChevronDown } from "lucide-react";

interface CategoryFilterTreeProps {
  category: CategoryDto;
  selectedCategories: string[];
  onCategoryChange: (slug: string) => void;
  depth?: number;
  expandedCategories: string[];
  toggleExpanded: (slug: string) => void;
}

const CategoryFilterTree = ({
  category,
  selectedCategories,
  onCategoryChange,
  depth = 0,
  expandedCategories,
  toggleExpanded
}: CategoryFilterTreeProps) => {
  const isSelected = selectedCategories.includes(category.slug);
  const hasChildren = category.children && category.children.length > 0;
  const isExpanded = expandedCategories.includes(category.slug);
  const paddingLeft = `${depth * 12}px`;

  // Check if any descendant categories are selected
  const hasSelectedDescendant = () => {
    if (!hasChildren) return false;

    const checkChildren = (children: CategoryDto[]): boolean => {
      return children.some(child => 
        selectedCategories.includes(child.slug) || 
        (child.children && checkChildren(child.children))
      );
    };

    return checkChildren(category.children);
  };

  // Visual indicator for partially selected (when children are selected)
  const isPartiallySelected = !isSelected && hasSelectedDescendant();

  // Safe handler for category change
  const handleCategoryChange = () => {
    if (typeof onCategoryChange === 'function') {
      onCategoryChange(category.slug);
    } else {
      console.error('onCategoryChange is not a function', onCategoryChange);
    }
  };

  return (
    <div className="category-filter-item">
      {/* Category with checkbox */}
      <div 
        className="flex items-center py-1.5 group"
        style={{ paddingLeft }}
      >
        <div className="flex items-center flex-1 min-w-0">
          <Checkbox 
            id={`category-${category.slug}`}
            checked={isSelected}
            onCheckedChange={handleCategoryChange}
            className="mr-2 data-[state=indeterminate]:bg-gray-300"
            data-state={isPartiallySelected ? "indeterminate" : isSelected ? "checked" : "unchecked"}
          />
          <label 
            htmlFor={`category-${category.slug}`}
            className="truncate text-sm cursor-pointer flex-1"
          >
            {category.name}
          </label>
        </div>

        {hasChildren && (
          <button
            type="button"
            onClick={() => toggleExpanded(category.slug)}
            className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none hover:bg-gray-200"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-gray-500" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {/* Render children */}
      {hasChildren && isExpanded && (
        <div className="pl-4 ml-1.5 border-l border-dashed border-gray-200">
          {category.children.map(child => (
            <CategoryFilterTree
              key={child.id}
              category={child}
              selectedCategories={selectedCategories}
              onCategoryChange={onCategoryChange}
              depth={depth + 1}
              expandedCategories={expandedCategories}
              toggleExpanded={toggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilterTree;