"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CategoryDto } from "@/types/category";
import { useRouter } from "next/navigation";

interface SubNavbarProps {
    categories: CategoryDto[];
}

export default function SubNavbar({ categories }: SubNavbarProps) {
    const router = useRouter();
    const [openCategory, setOpenCategory] = useState<string | null>(null);
    const [openSubcategory, setOpenSubcategory] = useState<string | null>(null);
    const [isHoveringSub, setIsHoveringSub] = useState(false);
    const [isHoveringTopic, setIsHoveringTopic] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Handle main category click
    const handleCategoryClick = (e: React.MouseEvent, category: CategoryDto) => {
        e.preventDefault();
        // Navigate directly if no children, otherwise toggle dropdown
        if (!category.children.length) {
            router.push(`/categories/${category.slug}`);
        } else {
            setOpenCategory(category.name);
        }
    };

    // Handle subcategory click
    const handleSubCategoryClick = (
        e: React.MouseEvent,
        parentCategory: CategoryDto,
        childCategory: CategoryDto
    ) => {
        e.preventDefault();
        // Navigate directly if no children, otherwise toggle dropdown
        if (!childCategory.children || !childCategory.children.length) {
            router.push(`/categories/${parentCategory.slug}/${childCategory.slug}`);
        } else {
            setOpenSubcategory(childCategory.slug);
        }
    };

    // Handle topic click (3rd level)
    const handleTopicClick = (
        e: React.MouseEvent,
        parentCategory: CategoryDto,
        childCategory: CategoryDto,
        topicCategory: CategoryDto
    ) => {
        e.preventDefault();
        router.push(`/categories/${parentCategory.slug}/${childCategory.slug}/${topicCategory.slug}`);
    };

    // Close menus when leaving
    const handleMainMenuLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
            if (!isHoveringSub && !isHoveringTopic) {
                setOpenCategory(null);
                setOpenSubcategory(null);
            }
        }, 200);
    };

    return (
        <div className="bg-gray-100 border-b shadow-sm">
            <div className="container mx-auto relative">
                <div className="flex justify-center space-x-6 py-2">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="relative"
                            onMouseEnter={() => setOpenCategory(category.name)}
                            onMouseLeave={handleMainMenuLeave}
                        >
                            <a
                                href={`/categories/${category.slug}`}
                                className="text-black hover:text-gray-500 font-medium transition duration-200 flex items-center gap-1"
                                onClick={(e) => handleCategoryClick(e, category)}
                            >
                                {category.name}
                                {category.children.length > 0 && (
                                    <ChevronDown className="w-4 h-4" />
                                )}
                            </a>
                        </div>
                    ))}
                </div>

                {/* Sub-category dropdown */}
                {openCategory !== null && (
                    <div
                        className="absolute left-0 top-full w-full bg-white shadow-lg border-t border-gray-200 z-10"
                        onMouseEnter={() => setIsHoveringSub(true)}
                        onMouseLeave={() => {
                            setIsHoveringSub(false);
                            handleMainMenuLeave();
                        }}
                    >
                        <div className="container mx-auto p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                                {categories
                                    .find((cat) => cat.name === openCategory)
                                    ?.children.map((child) => (
                                        <div key={child.id} className="subcategory-group">
                                            <a
                                                href={`/categories/${categories.find(cat => cat.name === openCategory)?.slug}/${child.slug}`}
                                                className="block font-medium mb-2 hover:text-blue-600 transition-colors"
                                                onClick={(e) => handleSubCategoryClick(
                                                    e, 
                                                    categories.find(cat => cat.name === openCategory)!, 
                                                    child
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span>{child.name}</span>
                                                    {child.children && child.children.length > 0 && (
                                                        <ChevronRight className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </div>
                                            </a>
                                            
                                            {/* Show topics (level 3) if available */}
                                            {child.children && child.children.length > 0 && (
                                                <div className="ml-3 pl-2 border-l border-gray-200 space-y-1">
                                                    {child.children.slice(0, 4).map(topic => (
                                                        <a
                                                            key={topic.id}
                                                            href={`/categories/${categories.find(cat => cat.name === openCategory)?.slug}/${child.slug}/${topic.slug}`}
                                                            className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-1"
                                                            onClick={(e) => handleTopicClick(
                                                                e,
                                                                categories.find(cat => cat.name === openCategory)!,
                                                                child,
                                                                topic
                                                            )}
                                                        >
                                                            {topic.name}
                                                        </a>
                                                    ))}
                                                    
                                                    {/* Show "more" link if there are more than 4 topics */}
                                                    {child.children.length > 4 && (
                                                        <a
                                                            href={`/categories/${categories.find(cat => cat.name === openCategory)?.slug}/${child.slug}`}
                                                            className="block text-sm text-blue-600 hover:underline py-1"
                                                        >
                                                            + {child.children.length - 4} more
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}