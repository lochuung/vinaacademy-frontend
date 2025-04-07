"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useCategories } from '@/context/CategoryContext';
import { useEffect, useState } from 'react';
import { CategoryDto } from '@/types/category';

interface CategoryBreadcrumbProps {
  slug: string;
  className?: string;
}

export function CategoryBreadcrumb({ slug, className = "" }: CategoryBreadcrumbProps) {
  const { getCategoryPath } = useCategories();
  const [categoryPath, setCategoryPath] = useState<CategoryDto[]>([]);
  
  useEffect(() => {
    if (slug) {
      const path = getCategoryPath(slug);
      setCategoryPath(path);
    }
  }, [slug, getCategoryPath]);

  if (categoryPath.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-sm ${className}`}>
      <ol className="flex items-center flex-wrap">
        <li className="flex items-center">
          <Link 
            href="/categories" 
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            Danh mục
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />
        </li>
        
        {categoryPath.map((category, index) => (
          <li key={category.id} className="flex items-center">
            {index < categoryPath.length - 1 ? (
              <>
                <Link 
                  href={`/categories/${category.slug}`} 
                  className="text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400 flex-shrink-0" />
              </>
            ) : (
              <span className="font-medium text-gray-900">
                {category.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}