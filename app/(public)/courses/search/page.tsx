"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { CourseDto, CourseSearchRequest, CourseLevel } from "@/types/course";
import { searchCourses } from "@/services/courseService";
import { useCategories } from "@/context/CategoryContext";
import SearchResults from "@/components/courses/search-course/search/SearchResults";
import FilterSidebar from "@/components/courses/search-course/filters/FilterSidebar";
import MobileFilterToggle from "@/components/courses/search-course/filters/MobileFilterToggle";
import NoResultsFound from "@/components/courses/search-course/ui/NoResultsFound";
import SearchHeader from "@/components/courses/search-course/search/SearchHeader";
import { PaginatedResponse } from "@/types/api-response";

// Types
export type FilterUpdates = {
    [key: string]: string | null;
};

export default function SearchPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { categories: allCategories, getCategoryPath } = useCategories();
    const isFirstLoad = useRef(true);

    // State for search and filter params
    const [query, setQuery] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const [subCategories, setSubCategories] = useState<string[]>([]); // Added for FilterSidebar
    const [topics, setTopics] = useState<string[]>([]); // Added for FilterSidebar
    const [selectedTopics, setSelectedTopics] = useState<string[]>([]); // Added for FilterSidebar
    const [levels, setLevels] = useState<string[]>([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minRating, setMinRating] = useState("");
    const [currentPage, setCurrentPage] = useState(0); // API is 0-based
    const [pageSize, setPageSize] = useState(10);
    const [sortBy, setSortBy] = useState("name");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    // UI state
    const [coursesData, setCoursesData] = useState<PaginatedResponse<CourseDto>>({
        content: [],
        totalPages: 0,
        totalElements: 0,
        size: 0,
        number: 0,
        first: true,
        last: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Initialize state from URL params
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
    }, [searchParams]);

    // Fetch courses when filters change
    useEffect(() => {
        // Skip initial fetch if no search parameters exist
        if (isFirstLoad.current) {
            isFirstLoad.current = false;
            if (searchParams.toString() === '') return;
        }
        
        setIsLoading(true);
        
        const fetchCourses = async () => {
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
                    setCoursesData(data);
                    console.log("Courses data response:", data);
                } else {
                    // Handle API error with empty state
                    setCoursesData({
                        content: [],
                        totalPages: 0,
                        totalElements: 0,
                        size: pageSize,
                        number: currentPage,
                        first: true,
                        last: true
                    });
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                // Set empty state on error
                setCoursesData({
                    content: [],
                    totalPages: 0,
                    totalElements: 0,
                    size: pageSize,
                    number: currentPage,
                    first: true,
                    last: true
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [query, categories, minPrice, maxPrice, levels, minRating, currentPage, pageSize, sortBy, sortDirection, searchParams]);

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
                    <SearchHeader query={query} resultCount={coursesData.totalElements} />
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
                        ) : coursesData.content.length > 0 ? (
                            <SearchResults
                                coursesData={coursesData}
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