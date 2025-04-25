"use client";

import React from "react";
import Link from "next/link";
import { CategoryDto } from "@/types/category";
import { ChevronRight } from "lucide-react";

interface CategoryHierarchyDisplayProps {
  categories: CategoryDto[];
}

export function CategoryHierarchyDisplay({ categories }: CategoryHierarchyDisplayProps) {
  // Render each category and its children in a hierarchical list
  const renderCategory = (category: CategoryDto) => {
    const hasChildren = category.children && category.children.length > 0;
    
    return (
      <div key={category.id} className="mb-8">
        <Link 
          href={`/categories/${category.slug}`}
          className="text-xl font-semibold text-blue-700 hover:text-blue-800 flex items-center"
        >
          {category.name}
          <ChevronRight className="h-5 w-5 ml-1" />
        </Link>
        
        {hasChildren && (
          <div className="mt-4 pl-4 border-l-2 border-gray-200">
            {category.children.map(subCategory => (
              <div key={subCategory.id} className="mb-4">
                <Link 
                  href={`/categories/${subCategory.slug}`} 
                  className="text-lg font-medium text-gray-800 hover:text-blue-600 flex items-center"
                >
                  {subCategory.name}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                
                {subCategory.children && subCategory.children.length > 0 && (
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-4">
                    {subCategory.children.map(grandChild => (
                      <Link
                        key={grandChild.id}
                        href={`/categories/${grandChild.slug}`}
                        className="text-base text-gray-600 hover:text-blue-600 hover:underline flex items-center"
                      >
                        {grandChild.name}
                        <span className="text-gray-400 text-xs ml-2">
                          {grandChild.coursesCount || 0} khóa học
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="space-y-4">
        {categories.map(renderCategory)}
      </div>
    </div>
  );
}