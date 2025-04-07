"use client";

import {useParams, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {categoriesData} from "@/data/categories";
import {mockCourses} from "@/data/mockCourses";

// Import components
import {LoadingState} from "@/components/categories/ui/LoadingState";
import {NotFoundState} from "@/components/categories/ui/NotFoundState";
import {SubCategoryNavigation} from "@/components/categories/sub-category/SubCategoryNavigation";
import {SubCategoryHeader} from "@/components/categories/sub-category/SubCategoryHeader";
import {SubCategoryFilterSidebar} from "@/components/categories/sub-category/SubCategoryFilterSidebar";
import {SubCategorySortingControls} from "@/components/categories/sub-category/SubCategorySortingControls";
import {CourseTabs} from "@/components/categories/ui/CourseTabs";
import {CourseGrid} from "@/components/categories/ui/CourseGrid";
import {SubCategoryEmptyState} from "@/components/categories/sub-category/SubCategoryEmptyState";

export default function SubCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const category = params.category as string;
    const subcategory = params.subcategory as string;
    const topicParam = searchParams.get('topic');

    const [categoryInfo, setCategoryInfo] = useState<{
        category?: string;
        categoryLink?: string;
        subCategory?: string;
        subCategoryLink?: string;
        topic?: string;
        topicLink?: string;
    }>({
        category: undefined,
        categoryLink: undefined,
        subCategory: undefined,
        subCategoryLink: undefined,
        topic: undefined,
        topicLink: undefined
    });

    const [courses, setCourses] = useState<any[]>([]);
    const [sortBy, setSortBy] = useState("popular");
    const [selectedLevel, setSelectedLevel] = useState<string | undefined>(undefined);
    const [priceRange, setPriceRange] = useState<string | undefined>(undefined);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(topicParam);
    const [categoryData, setCategoryData] = useState<any>(undefined);
    const [topics, setTopics] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [matchingCount, setMatchingCount] = useState(0);
    const [activeTab, setActiveTab] = useState("popular");

    // Analyze path to determine category and subcategory
    useEffect(() => {
        if (category && subcategory) {
            // Find courses in this category and subcategory
            const matchingCourses = mockCourses.filter(course => {
                // Extract slugs from links
                const categoryPathParts = course.categoryLink.split('/');
                const categorySlug = categoryPathParts[categoryPathParts.length - 1];

                const subCategoryPathParts = course.subCategoryLink.split('/');
                const subCategorySlug = subCategoryPathParts[subCategoryPathParts.length - 1];

                return categorySlug === category && subCategorySlug === subcategory;
            });

            setMatchingCount(matchingCourses.length);

            if (matchingCourses.length > 0) {
                const firstCourse = matchingCourses[0];
                setCategoryInfo({
                    category: firstCourse.category,
                    categoryLink: firstCourse.categoryLink,
                    subCategory: firstCourse.subCategory,
                    subCategoryLink: firstCourse.subCategoryLink,
                    topic: undefined,
                    topicLink: undefined
                });

                // Find categoryData from categoriesData
                const foundCategory = categoriesData.find(cat =>
                    cat.link === firstCourse.categoryLink
                );

                if (foundCategory) {
                    setCategoryData(foundCategory);
                }

                // Get unique list of topics
                const uniqueTopics = Array.from(
                    new Set(matchingCourses.map(course => course.topic))
                );
                setTopics(uniqueTopics);

                // If there's a topic in the URL, check and update selectedTopic
                if (topicParam) {
                    const matchingTopic = matchingCourses.find(course => {
                        const topicPathParts = course.topicLink.split('/');
                        const topicSlug = topicPathParts[topicPathParts.length - 1];
                        return topicSlug === topicParam;
                    });

                    if (matchingTopic) {
                        setSelectedTopic(matchingTopic.topic);
                    }
                }
            }
        }
    }, [category, subcategory, topicParam]);

    // Update URL when topic is selected
    useEffect(() => {
        if (selectedTopic) {
            const topicSlug = selectedTopic.toLowerCase().replace(/ /g, '-');
            const newUrl = `/categories/${category}/${subcategory}?topic=${topicSlug}`;
            router.replace(newUrl, {scroll: false});
        } else if (topicParam && selectedTopic === null) {
            // If there was a topic in the URL but user selected "All"
            router.replace(`/categories/${category}/${subcategory}`, {scroll: false});
        }
    }, [selectedTopic, category, subcategory, router, topicParam]);

    // Filter courses when category info or filters change
    useEffect(() => {
        if (!categoryInfo.category || !categoryInfo.subCategory) return;

        // Filter courses by category and subcategory
        let filtered = mockCourses.filter(
            (course) => course.category === categoryInfo.category &&
                course.subCategory === categoryInfo.subCategory
        );

        // Filter by topic if any
        if (selectedTopic) {
            filtered = filtered.filter((course) => course.topic === selectedTopic);
        }

        // Filter by level
        if (selectedLevel) {
            filtered = filtered.filter((course) => course.level === selectedLevel);
        }

        // Filter by price
        if (priceRange) {
            switch (priceRange) {
                case "free":
                    filtered = filtered.filter((course) => parseInt(course.price) === 0);
                    break;
                case "low":
                    filtered = filtered.filter((course) =>
                        parseInt(course.price) > 0 && parseInt(course.price) <= 500000
                    );
                    break;
                case "medium":
                    filtered = filtered.filter((course) =>
                        parseInt(course.price) > 500000 && parseInt(course.price) <= 1000000
                    );
                    break;
                case "high":
                    filtered = filtered.filter((course) => parseInt(course.price) > 1000000);
                    break;
            }
        }

        // Sort courses
        switch (sortBy) {
            case "popular":
                filtered.sort((a, b) => b.students - a.students);
                break;
            case "rating":
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case "newest":
                filtered.sort((a, b) => b.id - a.id);
                break;
            case "price-low":
                filtered.sort((a, b) => parseInt(a.price) - parseInt(b.price));
                break;
            case "price-high":
                filtered.sort((a, b) => parseInt(b.price) - parseInt(a.price));
                break;
        }

        setCourses(filtered);
    }, [categoryInfo, sortBy, selectedLevel, priceRange, selectedTopic]);

    // Reset all filters
    const resetFilters = () => {
        setSelectedLevel(undefined);
        setPriceRange(undefined);
        setSelectedTopic(null);
        if (topicParam) {
            router.replace(`/categories/${category}/${subcategory}`, {scroll: false});
        }
    };

    // Handle error when category not found
    if (matchingCount === 0) {
        return <NotFoundState/>;
    }

    // Loading state
    if (!categoryInfo.category || !categoryInfo.subCategory) {
        return <LoadingState/>;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation tabs */}
            <SubCategoryNavigation
                categoryData={categoryData}
                categoryInfo={categoryInfo}
                category={category}
                subcategory={subcategory}
            />

            <div className="container mx-auto px-4 py-8">
                {/* Title section */}
                <SubCategoryHeader
                    category={categoryInfo.category}
                    subCategory={categoryInfo.subCategory}
                    selectedTopic={selectedTopic}
                />

                {/* Course Grid with Sidebar */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filter Panel */}
                    <SubCategoryFilterSidebar
                        categoryData={categoryData}
                        category={category}
                        subcategory={subcategory}
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        selectedTopic={selectedTopic}
                        setSelectedTopic={setSelectedTopic}
                        topics={topics}
                        topicParam={topicParam}
                        router={router}
                    />

                    {/* Main Content Area */}
                    <div className="flex-grow">
                        {/* Sort dropdown and applied filters */}
                        <SubCategorySortingControls
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                            selectedLevel={selectedLevel}
                            setSelectedLevel={setSelectedLevel}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            selectedTopic={selectedTopic}
                            setSelectedTopic={setSelectedTopic}
                        />

                        {/* Course Tabs */}
                        <CourseTabs
                            activeTab={activeTab}
                            onTabChange={setActiveTab}
                        />

                        {/* Course Grid */}
                        {courses.length > 0 ? (
                            <div>
                                <CourseGrid
                                    courses={courses}
                                    resetFilters={resetFilters}
                                />
                            </div>
                        ) : (
                            <SubCategoryEmptyState resetFilters={resetFilters}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}