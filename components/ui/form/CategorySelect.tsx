import React, { JSX } from "react";
import { CategoryDto } from "@/types/category";
import { ChevronDown, BookOpen } from "lucide-react";

interface CategorySelectProps {
  categories: CategoryDto[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: boolean;
}

export default function CategorySelect({
  categories,
  value,
  onChange,
  className = "",
  error = false
}: CategorySelectProps) {
  // Function to render category options with proper indentation and correct typing
  const renderCategoryOptions = (categories: CategoryDto[], level = 0): JSX.Element[] => {
    // Using flatMap to flatten nested arrays while ensuring proper type
    return categories.flatMap((category): JSX.Element[] => {
      const hasChildren = category.children && category.children.length > 0;
      const courseCount = category.coursesCount || 0;
      
      const prefix = level > 0 ? '— '.repeat(level) : '';
      // Make parent categories stand out with bold text
      const label = `${prefix}${category.name} (${courseCount})`;
      
      // Remove the disabled attribute to allow selecting parent categories
      const options: JSX.Element[] = [
        <option 
          key={category.id.toString()} 
          value={category.id.toString()}
          className={hasChildren ? "font-semibold" : ""}
        >
          {label}
        </option>
      ];
      
      if (hasChildren) {
        options.push(...renderCategoryOptions(category.children, level + 1));
      }
      
      return options;
    });
  };

  return (
    <div className="relative">
      <select
        id="category"
        name="category"
        required
        className={`shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                  block w-full sm:text-base border-gray-300 rounded-md bg-white 
                  text-gray-900 p-3 pl-10 appearance-none ${error ? "border-red-500" : ""} ${className}`}
        value={value}
        onChange={onChange}
      >
        <option value="">Chọn danh mục khóa học</option>
        {categories && categories.length > 0 && renderCategoryOptions(categories)}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <ChevronDown className="h-4 w-4 text-gray-500" />
      </div>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <BookOpen className="h-4 w-4 text-blue-500" />
      </div>
    </div>
  );
}
