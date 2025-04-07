'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategories } from "@/services/categoryService";
import { CategoryDto } from "@/types/category";

interface CategoryContextType {
  categories: CategoryDto[];
  isLoading: boolean;
  error: Error | null;
  refreshCategories: () => Promise<void>;
  getCategoryBySlug: (slug: string) => CategoryDto | undefined;
  getCategoryPath: (slug: string) => CategoryDto[];
  findSubcategories: (parentSlug: string) => CategoryDto[];
}

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  isLoading: true,
  error: null,
  refreshCategories: async () => {},
  getCategoryBySlug: () => undefined,
  getCategoryPath: () => [],
  findSubcategories: () => [],
});

export const useCategories = () => useContext(CategoryContext);

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const categoriesData = await getCategories();
      if (categoriesData && categoriesData.length > 0) {
        setCategories(categoriesData);
      } else {
        console.log("No categories found from API");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err instanceof Error ? err : new Error('Failed to fetch categories'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Helper function to find a category by slug at any level in the hierarchy
  const getCategoryBySlug = (slug: string): CategoryDto | undefined => {
    // Recursive function to search through category hierarchy
    const findInCategories = (cats: CategoryDto[]): CategoryDto | undefined => {
      for (const cat of cats) {
        if (cat.slug === slug) {
          return cat;
        }
        
        if (cat.children && cat.children.length > 0) {
          const found = findInCategories(cat.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    
    return findInCategories(categories);
  };

  // Get complete path to a category (parent -> child -> grandchild)
  const getCategoryPath = (slug: string): CategoryDto[] => {
    const path: CategoryDto[] = [];
    
    // Recursive function to build the path
    const buildPath = (cats: CategoryDto[], targetSlug: string): boolean => {
      for (const cat of cats) {
        if (cat.slug === targetSlug) {
          path.push(cat);
          return true;
        }
        
        if (cat.children && cat.children.length > 0) {
          if (buildPath(cat.children, targetSlug)) {
            path.unshift(cat); // Add parent to beginning of path
            return true;
          }
        }
      }
      return false;
    };
    
    buildPath(categories, slug);
    return path;
  };

  // Find all subcategories of a given category
  const findSubcategories = (parentSlug: string): CategoryDto[] => {
    const parent = getCategoryBySlug(parentSlug);
    return parent?.children || [];
  };

  const refreshCategories = async () => {
    await fetchCategories();
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        isLoading,
        error,
        refreshCategories,
        getCategoryBySlug,
        getCategoryPath,
        findSubcategories,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};