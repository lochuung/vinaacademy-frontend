    "use client";

import Link from 'next/link';
import { useState } from 'react';
import { CategoryDto } from '@/types/category';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryHierarchyDisplayProps {
  categories: CategoryDto[];
  className?: string;
}

export function CategoryHierarchyDisplay({ categories, className = "" }: CategoryHierarchyDisplayProps) {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const toggleCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Recursive function to render a category and its children
  const renderCategory = (category: CategoryDto, depth = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isExpanded = expandedCategories.includes(category.id);
    
    return (
      <div key={category.id} className="category-item">
        {/* Category header */}
        <div 
          className={`
            flex items-center justify-between p-3 rounded-lg transition-all
            ${depth === 0 
              ? 'bg-white shadow-sm border hover:shadow-md' 
              : 'bg-gray-50 hover:bg-gray-100 ml-4'}
            ${depth === 1 ? 'border-l-2 border-gray-200' : ''}
            ${depth === 2 ? 'border-l border-gray-200 ml-8' : ''}
          `}
        >
          <div className="flex items-center gap-3">
            {/* Icon or indicator for level */}
            <div className={`
              w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center
              ${depth === 0 ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}
            `}>
              {depth === 0 ? (
                <span className="font-bold">{category.name.charAt(0)}</span>
              ) : (
                <span className="text-xs">{category.children?.length || 0}</span>
              )}
            </div>
            
            {/* Category name and count */}
            <div>
              <Link 
                href={`/categories/${category.slug}`}
                className={`font-medium hover:underline ${depth === 0 ? 'text-lg' : 'text-base'}`}
              >
                {category.name}
              </Link>
              {hasChildren && (
                <div className="text-sm text-gray-500">
                  {category.children.length} {category.children.length === 1 ? 'subcategory' : 'subcategories'}
                </div>
              )}
            </div>
          </div>
          
          {/* Expand/collapse button */}
          {hasChildren && (
            <button
              onClick={() => toggleCategory(category.id)}
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              aria-expanded={isExpanded}
            >
              {isExpanded ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>
          )}
        </div>
        
        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="ml-4 mt-2 space-y-2">
            {category.children.map(child => renderCategory(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`category-hierarchy ${className}`}>
      <div className="space-y-4">
        {categories.map(category => renderCategory(category))}
      </div>
    </div>
  );
}