"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CourseDto, CourseSearchRequest, CourseLevel } from "@/types/course";
import { searchCourses } from "@/services/courseService";
import { useCategories } from "@/context/CategoryContext";
import SearchResults from "@/components/courses/search-course/search/SearchResults";
import FilterSidebar from "@/components/courses/search-course/filters/FilterSidebar";
import MobileFilterToggle from "@/components/courses/search-course/filters/MobileFilterToggle";
import NoResultsFound from "@/components/courses/search-course/ui/NoResultsFound";
import SearchHeader from "@/components/courses/search-course/search/SearchHeader";
import { PaginatedResponse } from "@/types/api-response";
import { Suspense } from "react";

// Types
export type FilterUpdates = {
    [key: string]: string | null;
};

// Loading component for Suspense fallback
function SearchPageLoading() {
    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Kết quả tìm kiếm</h1>
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                </div>
            </div>
        </div>
    );
}

// Actual Search Page Component
function SearchPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { categories: allCategories, getCategoryPath } = useCategories();
    const isFirstLoad = useRef(true);

    // State for search and filter params
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<string[]>([]);
    const [topics, setTopics] = useState<string[]>([]);
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
    const [levels, setLevels] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // API is 0-based
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    // UI state
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Map UI level strings to API CourseLevel enum
    const mapLevelToApiFormat = (level: string | undefined): CourseLevel | undefined => {
        if (!level) return undefined;
        
        const levelMap: Record<string, CourseLevel> = {
            "Cơ bản": "BEGINNER",
            "Trung cấp": "INTERMEDIATE",
            "Nâng cao": "ADVANCED"
        };
        
        return levelMap[level] as CourseLevel || undefined;
    };

    // Initialize state from URL params
    const isParamsReady = useRef(false);
    useEffect(() => {
        setQuery(searchParams.get("q") || "");

        const categoriesParam = searchParams.get("categories") || "";
        setCategories(categoriesParam ? categoriesParam.split(",") : []);

        const subCategoriesParam = searchParams.get("subCategories") || "";
        setSubCategories(subCategoriesParam ? subCategoriesParam.split(",") : []);

        const topicsParam = searchParams.get("topics") || "";
        setTopics(topicsParam ? topicsParam.split(",") : []);
        setSelectedTopics(topicsParam ? topicsParam.split(",") : []);

        const levelsParam = searchParams.get("level") || "";
        setLevels(levelsParam ? levelsParam.split(",") : []);
        
        setMinPrice(searchParams.get("minPrice") || "");
        setMaxPrice(searchParams.get("maxPrice") || "");
        setMinRating(searchParams.get("minRating") || "");

        const pageParam = searchParams.get("page") || "1";
        setCurrentPage(parseInt(pageParam) - 1); // Convert to 0-based for API

        const sortByParam = searchParams.get("sortBy") || "name";
        setSortBy(sortByParam);

        const sortDirParam = searchParams.get("sortDirection") || "asc";
        setSortDirection(sortDirParam as "asc" | "desc");

        setPageSize(9);

        isParamsReady.current = true;
    }, [searchParams]);

    // Use React Query for data fetching
    const { data: coursesData, isLoading, error } = useQuery({
        queryKey: ['courses', 'search', query, categories, minPrice, maxPrice, levels, minRating, currentPage, pageSize, sortBy, sortDirection],
        queryFn: async () => {
            try {
                // Convert UI filters to CourseSearchRequest
                const searchRequest: CourseSearchRequest = {
                    keyword: query || undefined,
                    categorySlug: categories.length > 0 ? categories[0] : undefined,
                    level: mapLevelToApiFormat(levels[0]),
                    minPrice: minPrice ? parseInt(minPrice) * 1000 : undefined,
                    maxPrice: maxPrice ? parseInt(maxPrice) * 1000 : undefined,
                    minRating: minRating ? parseFloat(minRating) : 0
                };
                
                // Call the API
                const data = await searchCourses(
                    searchRequest,
                    currentPage,
                    pageSize,
                    sortBy,
                    sortDirection
                );
                
                if (data) {
                    console.log("Courses data response:", data);
                    return data;
                } else {
                    // Handle API error with empty state
                    return {
                        content: [],
                        totalPages: 0,
                        totalElements: 0,
                        size: pageSize,
                        number: currentPage,
                        first: true,
                        last: true
                    } as PaginatedResponse<CourseDto>;
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                throw error;
            }
        },
        enabled: isParamsReady.current,
        staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    });

    // Ensure we have a valid coursesData object even when the query hasn't run yet
    const normalizedCoursesData: PaginatedResponse<CourseDto> = coursesData || {
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: pageSize,
        number: currentPage,
        first: true,
        last: true
    };

    // Handle category change - used by CategoryFilterTree
    const handleCategoryToggle = (slug: string) => {
        const updatedCategories = categories.includes(slug)
            ? categories.filter(cat => cat !== slug)
            : [...categories, slug];
        
        const params = new URLSearchParams(searchParams.toString());
        
        if (updatedCategories.length > 0) {
            params.set('categories', updatedCategories.join(','));
        } else {
            params.delete('categories');
        }
        
        // Reset to page 1 when changing filters
        params.set('page', '1');
        
        router.push(`/courses/search?${params.toString()}`);
    };

    // Handle sort change
    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        switch(value) {
            case "relevance":
                params.set("sortBy", "name");
                params.set("sortDirection", "asc");
                break;
            case "newest":
                params.set("sortBy", "createdDate");
                params.set("sortDirection", "desc");
                break;
            case "highest-rated":
                params.set("sortBy", "rating");
                params.set("sortDirection", "desc");
                break;
            case "lowest-price":
                params.set("sortBy", "price");
                params.set("sortDirection", "asc");
                break;
            case "highest-price":
                params.set("sortBy", "price");
                params.set("sortDirection", "desc");
                break;
        }
        
        router.push(`/courses/search?${params.toString()}`);
    };

    // Toggle mobile filters visibility
    const toggleMobileFilters = () => {
        setShowMobileFilters(!showMobileFilters);
    };

    // Apply filters by updating URL params
    const applyFilters = (newFilters: FilterUpdates) => {
        const params = new URLSearchParams(searchParams.toString());

        // Update params based on new filters
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        });

        // Reset to page 1 when applying new filters
        params.set("page", "1");

        router.push(`/courses/search?${params.toString()}`);
    };

    // Clear all filters
    const clearAllFilters = () => {
        router.push('/courses/search?page=1');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-6">Kết quả tìm kiếm</h1>

                {/* Search header with query and result count */}
                {query && (
                    <SearchHeader query={query} resultCount={normalizedCoursesData.totalElements} />
                )}

                {/* Main content with sidebar layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Mobile filter toggle */}
                    <MobileFilterToggle
                        toggleMobileFilters={toggleMobileFilters}
                    />

                    {/* Filter sidebar - updated props to match component interface */}
                    <FilterSidebar
                        showMobileFilters={showMobileFilters}
                        toggleMobileFilters={toggleMobileFilters}
                        categories={categories}
                        subCategories={subCategories}
                        topics={topics}
                        selectedTopics={selectedTopics}
                        setSelectedTopics={setSelectedTopics}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        levels={levels}
                        selectedRating={minRating}
                        applyFilters={applyFilters}
                        clearAllFilters={clearAllFilters}
                    />

                    {/* Course results */}
                    <div className="lg:w-3/4">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
                            </div>
                        ) : searchParams.toString() === '' ? (
                            <div className="text-center py-20">
                                <h2 className="text-xl font-semibold mb-2">Bắt đầu tìm kiếm</h2>
                                <p className="text-gray-600">Nhập từ khóa hoặc chọn bộ lọc để tìm khóa học phù hợp</p>
                            </div>
                        ) : normalizedCoursesData.content.length > 0 ? (
                            <SearchResults
                                coursesData={normalizedCoursesData}
                            />
                        ) : (
                            <NoResultsFound />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Export wrapped in Suspense
export default function SearchPage() {
    return (
        <Suspense fallback={<SearchPageLoading />}>
            <SearchPageContent />
        </Suspense>
    );
}