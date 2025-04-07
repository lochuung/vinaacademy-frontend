"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CategoryDto } from "@/types/category";
import CategoryTreeItem from "./CategoryTreeItem";
import { useCategories } from "@/context/CategoryContext";
import { Search } from "lucide-react";

interface CategoryTreeProps {
  categories: CategoryDto[];
  className?: string;
}

const CategoryTree = ({ categories, className = "" }: CategoryTreeProps) => {
  const pathname = usePathname();
  const { getCategoryPath } = useCategories();
  const [activePath, setActivePath] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState<CategoryDto[]>(categories);
  
  // Extract current category slug from the pathname
  useEffect(() => {
    if (pathname) {
      const parts = pathname.split('/');
      if (parts.length > 2 && parts[1] === 'categories') {
        const slug = parts[2];
        // Get the full path of categories from the context (parent -> child -> etc)
        const path = getCategoryPath(slug).map(cat => cat.slug);
        setActivePath(path);
      } else {
        setActivePath([]);
      }
    }
  }, [pathname, getCategoryPath]);

  // Filter categories based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredCategories(categories);
      return;
    }

    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Recursive function to search through category hierarchy
    const filterCategories = (cats: CategoryDto[]): CategoryDto[] => {
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
      }, [] as CategoryDto[]);
    };
    
    setFilteredCategories(filterCategories(categories));
  }, [searchTerm, categories]);

  // Group categories by their first letter for better organization
  const groupedCategories = filteredCategories.reduce((groups, category) => {
    const firstLetter = category.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(category);
    return groups;
  }, {} as Record<string, CategoryDto[]>);

  // Sort groups alphabetically
  const sortedGroupKeys = Object.keys(groupedCategories).sort();

  return (
    <div className={`category-tree ${className}`}>
      {/* Search input */}
      <div className="px-4 py-2 sticky top-0 bg-white z-10 border-b">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Display categories by group when not searching, otherwise flat list */}
      <div className="overflow-y-auto max-h-[60vh]">
        {searchTerm ? (
          <>
            {filteredCategories.length > 0 ? (
              filteredCategories.map(category => (
                <CategoryTreeItem
                  key={category.id}
                  category={category}
                  depth={0}
                  isExpanded={activePath.includes(category.slug)}
                  activePath={activePath}
                />
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 text-sm">
                Không tìm thấy danh mục phù hợp
              </div>
            )}
          </>
        ) : (
          <>
            {sortedGroupKeys.map(letter => (
              <div key={letter} className="category-group">
                <div className="px-4 py-1 bg-gray-50 text-xs font-semibold text-gray-500">
                  {letter}
                </div>
                {groupedCategories[letter].map(category => (
                  <CategoryTreeItem
                    key={category.id}
                    category={category}
                    depth={0}
                    isExpanded={activePath.includes(category.slug)}
                    activePath={activePath}
                  />
                ))}
              </div>
            ))}
          </>
        )}
      </div>
      
      <div className="border-t my-2"></div>
      
      <div className="px-4 py-2 hover:bg-gray-100 transition-colors rounded-md mx-2">
        <a href="/categories" className="block text-blue-600 text-sm font-medium">
          Xem tất cả danh mục
        </a>
      </div>
    </div>
  );
};

export default CategoryTree;