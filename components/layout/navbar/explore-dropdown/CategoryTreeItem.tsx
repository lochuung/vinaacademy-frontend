"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CategoryDto } from "@/types/category";
import { ChevronRight, ChevronDown } from "lucide-react";

interface CategoryTreeItemProps {
  category: CategoryDto;
  depth: number;
  isExpanded?: boolean;
  activePath?: string[];
}

const CategoryTreeItem = ({
  category,
  depth = 0,
  isExpanded = false,
  activePath = []
}: CategoryTreeItemProps) => {
  const router = useRouter();
  const [expanded, setExpanded] = useState(isExpanded);
  const [isHovering, setIsHovering] = useState(false);
  const isActive = activePath.includes(category.slug);
  
  // Calculate indentation based on depth
  const paddingLeft = `${depth * 12 + 16}px`;
  
  // Determine if this category has children
  const hasChildren = category.children && category.children.length > 0;

  // Handle click on category
  const handleCategoryClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/categories/${category.slug}`);
  };

  // Toggle expand/collapse
  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div className="category-tree-item">
      {/* Category item with appropriate depth indentation */}
      <div 
        className={`
          flex justify-between items-center py-2 px-4 rounded-md transition-all duration-200
          ${isActive ? 'bg-gray-100 font-medium text-black' : ''}
          ${isHovering ? 'bg-gray-50' : ''}
          hover:bg-gray-50 cursor-pointer
        `}
        onClick={handleCategoryClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ paddingLeft }}
      >
        <div className="flex items-center gap-2 relative">
          {/* Visual indicator of hierarchy level */}
          {depth > 0 && (
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-[1px] bg-gray-300"></span>
          )}
          
          {/* Category name with badge for children count */}
          <div className="flex items-center gap-2">
            <span className="truncate max-w-[180px] text-sm">{category.name}</span>
            {hasChildren && (
              <span className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                {category.children.length}
              </span>
            )}
          </div>
        </div>
        
        {/* Expand/collapse button for categories with children */}
        {hasChildren && (
          <button 
            onClick={toggleExpand} 
            className="focus:outline-none p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>
        )}
      </div>

      {/* Render children recursively if expanded */}
      {hasChildren && (
        <div 
          className={`
            children overflow-hidden transition-all duration-300
            ${expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
          `}
        >
          {category.children.map(child => (
            <CategoryTreeItem
              key={child.id}
              category={child}
              depth={depth + 1}
              activePath={activePath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryTreeItem;