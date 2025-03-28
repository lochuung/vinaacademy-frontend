"use client";

import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoriesData } from "@/data/categories";
import { mockCourses } from "@/data/mockCourses";
import { Star, ChevronRight, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SubCategoryPage() {
    const router = useRouter();
    const params = useParams();
    const searchParams = useSearchParams();

    const category = params.category as string;
    const subcategory = params.subcategory as string;
    const topicParam = searchParams.get('topic');

    const [categoryInfo, setCategoryInfo] = useState<{
        category: string | undefined;
        categoryLink: string | undefined;
        subCategory: string | undefined;
        subCategoryLink: string | undefined;
        topic: string | undefined;
        topicLink: string | undefined;
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

    // Phân tích đường dẫn để xác định danh mục và danh mục con
    useEffect(() => {
        if (category && subcategory) {
            // Tìm khóa học thuộc danh mục và danh mục con này
            const matchingCourses = mockCourses.filter(course => {
                // Trích xuất slug từ link thay vì tạo từ tên
                const categoryPathParts = course.categoryLink.split('/');
                const categorySlug = categoryPathParts[categoryPathParts.length - 1];

                const subCategoryPathParts = course.subCategoryLink.split('/');
                const subCategorySlug = subCategoryPathParts[subCategoryPathParts.length - 1];

                return categorySlug === category && subCategorySlug === subcategory;
            });

            setMatchingCount(matchingCourses.length);
            console.log("Matching courses:", matchingCourses.length); // Thêm log để debug

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

                // Tìm categoryData từ categoriesData
                const foundCategory = categoriesData.find(cat =>
                    cat.link === firstCourse.categoryLink
                );

                if (foundCategory) {
                    setCategoryData(foundCategory);
                }

                // Lấy danh sách chủ đề không trùng lặp
                const uniqueTopics = Array.from(
                    new Set(matchingCourses.map(course => course.topic))
                );
                setTopics(uniqueTopics);

                // Nếu có topic trong URL, kiểm tra và cập nhật selectedTopic
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

    // Cập nhật URL khi chọn topic
    useEffect(() => {
        if (selectedTopic) {
            const topicSlug = selectedTopic.toLowerCase().replace(/ /g, '-');
            const newUrl = `/categories/${category}/${subcategory}?topic=${topicSlug}`;
            router.replace(newUrl, { scroll: false });
        } else if (topicParam && selectedTopic === null) {
            // Nếu đã có topic trên URL nhưng người dùng chọn "Tất cả"
            router.replace(`/categories/${category}/${subcategory}`, { scroll: false });
        }
    }, [selectedTopic, category, subcategory, router, topicParam]);

    // Lọc khóa học khi thông tin danh mục hoặc bộ lọc thay đổi
    useEffect(() => {
        if (!categoryInfo.category || !categoryInfo.subCategory) return;

        // Lọc khóa học theo danh mục và danh mục con
        let filtered = mockCourses.filter(
            (course) => course.category === categoryInfo.category &&
                course.subCategory === categoryInfo.subCategory
        );

        // Lọc theo chủ đề nếu có
        if (selectedTopic) {
            filtered = filtered.filter((course) => course.topic === selectedTopic);
        }

        // Lọc theo cấp độ
        if (selectedLevel) {
            filtered = filtered.filter((course) => course.level === selectedLevel);
        }

        // Lọc theo giá
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

        // Sắp xếp khóa học
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

    // Xử lý lỗi không tìm thấy danh mục
    if (matchingCount === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center">
                <div className="text-center p-8 max-w-2xl">
                    <h1 className="text-3xl font-bold mb-4">Danh mục không tồn tại</h1>
                    <p className="text-gray-600 mb-8">
                        Rất tiếc, chúng tôi không thể tìm thấy danh mục bạn đang tìm kiếm.
                        Vui lòng kiểm tra lại URL hoặc khám phá các danh mục khác.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button
                            onClick={() => router.push('/categories')}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            Xem tất cả danh mục
                        </Button>
                        <Button
                            onClick={() => router.push('/')}
                            variant="outline"
                        >
                            Về trang chủ
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Xử lý lỗi không tìm thấy thông tin danh mục
    if (!categoryInfo.category || !categoryInfo.subCategory) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-xl text-gray-600">Đang tải...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation tabs - Hiển thị danh mục cha, mũi tên lớn, và các danh mục con */}
            <div className="border-b">
                <div className="container mx-auto px-4">
                    <div className="flex overflow-x-auto scrollbar-hide py-2 space-x-2 items-center">
                        {categoryData && categoryInfo.category ? (
                            <>
                                {/* Hiển thị danh mục cha */}
                                <Link
                                    href={`/categories/${category}`}
                                    className={`whitespace-nowrap px-4 py-2 text-gray-700 hover:text-purple-700 ${!subcategory ? 'font-medium border-b-2 border-black' : ''
                                        }`}
                                >
                                    {categoryInfo.category}
                                </Link>

                                {/* Mũi tên phân cách lớn giữa danh mục cha và con */}
                                <div className="flex items-center self-stretch mx-1 py-2">
                                    <ChevronRight className="text-gray-400" size={24} strokeWidth={1.5} />
                                </div>

                                {/* Danh mục con container */}
                                <div className="flex space-x-6">
                                    {/* Hiển thị tất cả danh mục con của cùng danh mục cha */}
                                    {categoryData.subCategories && categoryData.subCategories.map((subCat: { name: string; link: string }, index: number) => {
                                        const subCatSlug = subCat.link.split('/').pop();
                                        return (
                                            <Link
                                                key={index}
                                                href={subCat.link}
                                                className={`whitespace-nowrap px-4 py-2 text-gray-700 hover:text-purple-700 ${subcategory && subcategory === subCatSlug ? 'font-medium border-b-2 border-black' : ''
                                                    }`}
                                            >
                                                {subCat.name}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            // Fallback khi không có dữ liệu
                            <div className="text-gray-500 py-2">Không có dữ liệu danh mục</div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Title - Udemy style */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        {selectedTopic ?
                            `Khóa học về ${selectedTopic}` :
                            `Khóa học về ${categoryInfo.subCategory}`
                        }
                    </h1>
                    <p className="text-lg text-gray-700">
                        {selectedTopic ?
                            `Khóa học về ${selectedTopic} từ giảng viên hàng đầu` :
                            `Học ${categoryInfo.subCategory} từ những chuyên gia hàng đầu trong lĩnh vực`
                        }
                    </p>
                </div>

                {/* Course Grid with Sidebar - New Layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filter Panel */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="md:sticky md:top-4 bg-white border rounded-md p-4">
                            <div className="mb-6">
                                <h3 className="font-medium text-lg border-b pb-2 mb-4">Bộ lọc</h3>

                                {/* Sibling Subcategories */}
                                <div className="mb-6">
                                    <h4 className="font-medium mb-3">Các danh mục con khác</h4>
                                    <div className="space-y-2">
                                        {categoryData && categoryData.subCategories && categoryData.subCategories
                                            .filter((sub: any) => {
                                                // Only show other subcategories (siblings), not the current one
                                                const subSlug = sub.link.split('/').pop();
                                                return subSlug !== subcategory;
                                            })
                                            .map((sub: any) => {
                                                const subSlug = sub.link.split('/').pop();
                                                return (
                                                    <div key={sub.name} className="flex items-center">
                                                        <input
                                                            type="radio"
                                                            id={`subcategory-${subSlug}`}
                                                            name="subcategory"
                                                            // Compare using slugs for consistency
                                                            checked={subcategory === subSlug}
                                                            onChange={() => {
                                                                router.push(`/categories/${category}/${subSlug}`);
                                                            }}
                                                            className="mr-2"
                                                        />
                                                        <label htmlFor={`subcategory-${subSlug}`} className="text-sm">
                                                            {sub.name}
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>

                                {/* Topics */}
                                {topics.length > 0 && (
                                    <div className="mb-6">
                                        <h4 className="font-medium mb-3">Chủ đề</h4>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="all-topics"
                                                    name="topic"
                                                    checked={selectedTopic === null}
                                                    onChange={() => setSelectedTopic(null)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor="all-topics" className="text-sm">
                                                    Tất cả
                                                </label>
                                            </div>
                                            {topics.map((topic) => (
                                                <div key={topic} className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        id={`topic-${topic}`}
                                                        name="topic"
                                                        checked={selectedTopic === topic}
                                                        onChange={() => setSelectedTopic(topic)}
                                                        className="mr-2"
                                                    />
                                                    <label htmlFor={`topic-${topic}`} className="text-sm">
                                                        {topic}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Level */}
                                <div className="mb-6">
                                    <h4 className="font-medium mb-3">Cấp độ</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="all-levels"
                                                name="level"
                                                checked={selectedLevel === undefined}
                                                onChange={() => setSelectedLevel(undefined)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="all-levels" className="text-sm">
                                                Tất cả
                                            </label>
                                        </div>
                                        {["Cơ bản", "Trung cấp", "Nâng cao"].map((level) => (
                                            <div key={level} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`level-${level}`}
                                                    name="level"
                                                    checked={selectedLevel === level}
                                                    onChange={() => setSelectedLevel(level)}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`level-${level}`} className="text-sm">
                                                    {level}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Price */}
                                <div>
                                    <h4 className="font-medium mb-3">Giá</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="all-prices"
                                                name="price"
                                                checked={priceRange === undefined}
                                                onChange={() => setPriceRange(undefined)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="all-prices" className="text-sm">
                                                Tất cả
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="price-free"
                                                name="price"
                                                checked={priceRange === "free"}
                                                onChange={() => setPriceRange("free")}
                                                className="mr-2"
                                            />
                                            <label htmlFor="price-free" className="text-sm">
                                                Miễn phí
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="price-low"
                                                name="price"
                                                checked={priceRange === "low"}
                                                onChange={() => setPriceRange("low")}
                                                className="mr-2"
                                            />
                                            <label htmlFor="price-low" className="text-sm">
                                                &lt; 500,000đ
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="price-medium"
                                                name="price"
                                                checked={priceRange === "medium"}
                                                onChange={() => setPriceRange("medium")}
                                                className="mr-2"
                                            />
                                            <label htmlFor="price-medium" className="text-sm">
                                                500,000đ - 1,000,000đ
                                            </label>
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="price-high"
                                                name="price"
                                                checked={priceRange === "high"}
                                                onChange={() => setPriceRange("high")}
                                                className="mr-2"
                                            />
                                            <label htmlFor="price-high" className="text-sm">
                                                &gt; 1,000,000đ
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Clear filters button */}
                                {(selectedLevel || priceRange || selectedTopic) && (
                                    <div className="mt-6 pt-4 border-t">
                                        <Button
                                            onClick={() => {
                                                setSelectedLevel(undefined);
                                                setPriceRange(undefined);
                                                setSelectedTopic(null);
                                                if (topicParam) {
                                                    router.replace(`/categories/${category}/${subcategory}`, { scroll: false });
                                                }
                                            }}
                                            variant="outline"
                                            className="w-full"
                                        >
                                            Xóa tất cả bộ lọc
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-grow">
                        {/* Sort dropdown and applied filters */}
                        <div className="mb-4">
                            <div className="flex items-center gap-6">
                                {/* Sort dropdown */}
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger className="w-[180px] bg-white">
                                            <SelectValue placeholder="Phổ biến nhất" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="popular">Phổ biến nhất</SelectItem>
                                            <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                                            <SelectItem value="newest">Mới nhất</SelectItem>
                                            <SelectItem value="price-low">Giá: Thấp đến cao</SelectItem>
                                            <SelectItem value="price-high">Giá: Cao đến thấp</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Filter tags - on the same line */}
                                {(selectedLevel || priceRange || selectedTopic) && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Lọc theo:</span>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedTopic && (
                                                <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
                                                    <span>Chủ đề: {selectedTopic}</span>
                                                    <button
                                                        className="ml-2"
                                                        onClick={() => setSelectedTopic(null)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}

                                            {selectedLevel && (
                                                <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
                                                    <span>Cấp độ: {selectedLevel}</span>
                                                    <button
                                                        className="ml-2"
                                                        onClick={() => setSelectedLevel(undefined)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}

                                            {priceRange && (
                                                <div className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm">
                                                    <span>Giá: {
                                                        priceRange === "free" ? "Miễn phí" :
                                                            priceRange === "low" ? "< 500,000đ" :
                                                                priceRange === "medium" ? "500,000đ - 1,000,000đ" :
                                                                    "> 1,000,000đ"
                                                    }</span>
                                                    <button
                                                        className="ml-2"
                                                        onClick={() => setPriceRange(undefined)}
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Course Tabs */}
                        <div className="mb-8 border-b">
                            <div className="flex space-x-8">
                                <button className="py-3 border-b-2 border-black font-medium">Phổ biến nhất</button>
                                <button className="py-3 text-gray-600 hover:text-black">Mới</button>
                                <button className="py-3 text-gray-600 hover:text-black">Xu hướng</button>
                            </div>
                        </div>

                        {/* Course Grid */}
                        {courses.length > 0 ? (
                            <div>
                                <p className="text-gray-600 text-sm mb-6">Hiển thị {courses.length} khóa học</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {courses.map(course => (
                                        <Link href={`/courses/${course.id}`} key={course.id}>
                                            <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow">
                                                <div className="relative aspect-video">
                                                    <Image
                                                        src={course.image}
                                                        alt={course.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="p-3">
                                                    <h3 className="font-bold text-base mb-1 line-clamp-2">{course.title}</h3>
                                                    <p className="text-sm text-gray-600 mb-1">{course.instructor}</p>
                                                    <div className="flex items-center gap-1 mb-1">
                                                        <span className="text-amber-700 font-bold">{course.rating}</span>
                                                        <div className="flex">
                                                            {Array(5).fill(0).map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    size={14}
                                                                    className={i < Math.floor(course.rating) ? "text-amber-500 fill-amber-500" : "text-gray-300 fill-gray-300"}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-gray-600">({course.students})</span>
                                                    </div>
                                                    <div className="font-bold">
                                                        {parseInt(course.price).toLocaleString()}₫
                                                        {course.originalPrice && (
                                                            <span className="text-sm text-gray-500 line-through ml-2">
                                                                {parseInt(course.originalPrice).toLocaleString()}₫
                                                            </span>
                                                        )}
                                                    </div>
                                                    {course.bestSeller && (
                                                        <span className="inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 mt-1">
                                                            Bán chạy nhất
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white p-8 text-center border rounded-md">
                                <p className="text-xl text-gray-600 mb-4">Không tìm thấy khóa học phù hợp</p>
                                <p className="text-gray-500 mb-6">Vui lòng điều chỉnh bộ lọc</p>
                                <Button
                                    onClick={() => {
                                        setSelectedLevel(undefined);
                                        setPriceRange(undefined);
                                        setSelectedTopic(null);
                                        if (topicParam) {
                                            router.replace(`/categories/${category}/${subcategory}`, { scroll: false });
                                        }
                                    }}
                                    variant="outline"
                                >
                                    Xóa bộ lọc
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}