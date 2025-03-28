"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { categoriesData } from "@/data/categories";
import { mockCourses } from "@/data/mockCourses";
import { ChevronRight, Star, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function CategoryPage() {
    const router = useRouter();
    const params = useParams();
    const category = params.category as string;
    const subcategory = params.subcategory as string | undefined;
    const topic = params.topic as string | undefined;

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
    const [categoryData, setCategoryData] = useState<any>(undefined);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [matchingCount, setMatchingCount] = useState(0);
    const [subCategories, setSubCategories] = useState<{ name: string, link: string }[]>([]);
    const [trendingTopics, setTrendingTopics] = useState<{ name: string, link: string, students: string }[]>([]);

    // Phân tích đường dẫn để xác định danh mục
    useEffect(() => {
        if (category) {
            // Tìm thông tin danh mục từ categoriesData dựa trên slug hiện tại
            const foundCategory = categoriesData.find(cat => {
                const categoryPathParts = cat.link.split('/');
                const categorySlug = categoryPathParts[categoryPathParts.length - 1];
                return categorySlug === category;
            });

            if (foundCategory) {
                setCategoryData(foundCategory);

                // Tìm các khóa học thuộc danh mục này
                const matchingCourses = mockCourses.filter(course => {
                    const courseCategory = categoriesData.find(cat => cat.link === course.categoryLink);
                    return courseCategory && courseCategory.link === foundCategory.link;
                });

                setMatchingCount(matchingCourses.length);

                if (matchingCourses.length > 0) {
                    // Thiết lập thông tin danh mục
                    setCategoryInfo({
                        category: foundCategory.name,
                        categoryLink: foundCategory.link,
                        subCategory: undefined,
                        subCategoryLink: undefined,
                        topic: undefined,
                        topicLink: undefined
                    });

                    // Tạo danh sách danh mục con
                    if (foundCategory.subCategories) {
                        setSubCategories(foundCategory.subCategories.map(subCat => ({
                            name: subCat.name,
                            link: subCat.link
                        })));

                        // Kiểm tra xem có danh mục con nào được chọn không
                        if (subcategory) {
                            // Tìm thông tin danh mục con
                            const foundSubCategory = foundCategory.subCategories.find(sub => {
                                const subPathParts = sub.link.split('/');
                                const subSlug = subPathParts[subPathParts.length - 1];
                                return subSlug === subcategory;
                            });

                            if (foundSubCategory) {
                                // Cập nhật thông tin danh mục con được chọn
                                setCategoryInfo(prev => ({
                                    ...prev,
                                    subCategory: foundSubCategory.name,
                                    subCategoryLink: foundSubCategory.link
                                }));

                                // Chỉ hiển thị các chủ đề của danh mục con này
                                if (foundSubCategory.trendingTopics && foundSubCategory.trendingTopics.length > 0) {
                                    setTrendingTopics(foundSubCategory.trendingTopics.map(topic => ({
                                        name: topic.name,
                                        link: topic.link,
                                        students: topic.students
                                    })));
                                } else {
                                    setTrendingTopics([]);
                                }
                            } else {
                                setTrendingTopics([]);
                            }
                        } else {
                            // Nếu không có danh mục con được chọn, hiển thị tất cả các chủ đề từ tất cả danh mục con của danh mục này
                            // Lấy tất cả các chủ đề thịnh hành từ tất cả các danh mục con
                            const allTopics: { name: string, link: string, students: string }[] = [];

                            // Duyệt qua từng danh mục con của danh mục "Lập trình"
                            foundCategory.subCategories.forEach(subCat => {
                                if (subCat.trendingTopics && subCat.trendingTopics.length > 0) {
                                    // Thêm các chủ đề từ danh mục con này vào mảng
                                    subCat.trendingTopics.forEach(topic => {
                                        allTopics.push({
                                            name: topic.name,
                                            link: topic.link,
                                            students: topic.students
                                        });
                                    });
                                }
                            });

                            // Cập nhật state với tất cả các chủ đề từ tất cả danh mục con của danh mục "Lập trình"
                            setTrendingTopics(allTopics);
                        }
                    }
                }
            }
        }
    }, [category, subcategory]);

    // Lọc khóa học khi thông tin danh mục hoặc bộ lọc thay đổi
    useEffect(() => {
        if (!categoryInfo.category) return;

        // Lọc khóa học theo danh mục và danh mục con nếu có
        let filtered = mockCourses.filter((course) => {
            // Nếu có danh mục con được chọn
            if (categoryInfo.subCategory && categoryInfo.subCategoryLink) {
                return course.categoryLink === categoryInfo.categoryLink &&
                    course.subCategoryLink === categoryInfo.subCategoryLink;
            }
            // Nếu chỉ có danh mục chính
            return course.categoryLink === categoryInfo.categoryLink;
        });

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
    }, [categoryInfo, sortBy, selectedLevel, priceRange]);

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

    if (!categoryInfo.category) {
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
                                {/* Hiển thị danh mục hiện tại (danh mục cha) */}
                                <Link
                                    href={categoryData.link}
                                    className="whitespace-nowrap px-4 py-2 text-gray-700 hover:text-purple-700 font-medium border-b-2 border-black"
                                >
                                    {categoryInfo.category}
                                </Link>

                                {/* Mũi tên phân cách lớn giữa danh mục cha và con */}
                                <div className="flex items-center self-stretch h-full mx-1 py-2">
                                    <ChevronRight className="text-gray-400" size={24} strokeWidth={1.5} />
                                </div>

                                {/* Bọc danh mục con trong container để styling */}
                                <div className="flex space-x-6">
                                    {/* Hiển thị tất cả danh mục con */}
                                    {categoryData.subCategories && categoryData.subCategories.map((subCat: { name: string; link: string }, index: number) => (
                                        <Link
                                            key={index}
                                            href={subCat.link}
                                            className={`whitespace-nowrap px-4 py-2 text-gray-700 hover:text-purple-700 ${categoryInfo.subCategory === subCat.name ? "font-medium border-b-2 border-purple-500" : ""
                                                }`}
                                        >
                                            {subCat.name}
                                        </Link>
                                    ))}
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
                        {categoryInfo.subCategory
                            ? `Khóa học về ${categoryInfo.subCategory}`
                            : `Khóa học về ${categoryInfo.category}`}
                    </h1>
                    <p className="text-lg text-gray-700">
                        Học {categoryInfo.subCategory || categoryInfo.category} từ những chuyên gia hàng đầu trong lĩnh vực
                    </p>
                </div>

                {/* Course Grid with Sidebar - New Layout */}
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Filter Panel */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="md:sticky md:top-4 bg-white border rounded-md p-4">
                            <div className="mb-6">
                                <h3 className="font-medium text-lg border-b pb-2 mb-4">Bộ lọc</h3>

                                {/* Subcategories */}
                                <div className="mb-6">
                                    <h4 className="font-medium mb-3">Danh mục con</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-center">
                                            <input
                                                type="radio"
                                                id="all-subcategories"
                                                name="subcategory"
                                                checked={!categoryInfo.subCategory}
                                                onChange={() => {
                                                    if (categoryInfo.categoryLink) {
                                                        router.push(categoryInfo.categoryLink);
                                                    }
                                                }}
                                                className="mr-2"
                                            />
                                            <label htmlFor="all-subcategories" className="text-sm">
                                                Tất cả
                                            </label>
                                        </div>
                                        {subCategories.map((subCategory, index) => (
                                            <div key={index} className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id={`subcategory-${index}`}
                                                    name="subcategory"
                                                    checked={categoryInfo.subCategory === subCategory.name}
                                                    onChange={() => {
                                                        router.push(subCategory.link);
                                                    }}
                                                    className="mr-2"
                                                />
                                                <label htmlFor={`subcategory-${index}`} className="text-sm">
                                                    {subCategory.name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

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
                                {(selectedLevel || priceRange) && (
                                    <div className="mt-6 pt-4 border-t">
                                        <Button
                                            onClick={() => {
                                                setSelectedLevel(undefined);
                                                setPriceRange(undefined);
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
                            <div className="flex items-center gap-6 mb-4">
                                {/* Sort dropdown - left side */}
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

                                {/* Filter tags - right side */}
                                {(selectedLevel || priceRange) && (
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-600">Lọc theo:</span>

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
                                )}
                            </div>
                        </div>

                        {/* Trending Topics Grid - Chỉ hiển thị các chủ đề thuộc danh mục được chọn */}
                        {trendingTopics.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Chủ đề phổ biến</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {trendingTopics.map((topic, index) => {
                                        // Lấy topic slug từ đường dẫn
                                        const topicSlug = topic.link.split('/').pop();

                                        // Xác định đường dẫn dựa trên việc có danh mục con được chọn hay không
                                        let topicUrl;
                                        if (categoryInfo.subCategory && categoryInfo.subCategoryLink) {
                                            // Nếu đang ở trang danh mục con, sử dụng URL với tham số truy vấn topic
                                            const subCategorySlug = categoryInfo.subCategoryLink.split('/').pop();
                                            topicUrl = `/categories/${category}/${subCategorySlug}?topic=${topicSlug}`;
                                        } else {
                                            // Nếu đang ở trang danh mục chính, tìm danh mục con chứa chủ đề này
                                            let targetSubCategory;

                                            // Duyệt qua tất cả danh mục con để tìm chủ đề
                                            if (categoryData && categoryData.subCategories) {
                                                for (const subCat of categoryData.subCategories) {
                                                    if (subCat.trendingTopics) {
                                                        const foundTopic = subCat.trendingTopics.find((t: { name: string }) => t.name === topic.name);
                                                        if (foundTopic) {
                                                            const subCategorySlug = subCat.link.split('/').pop();
                                                            targetSubCategory = subCategorySlug;
                                                            break;
                                                        }
                                                    }
                                                }
                                            }

                                            // Nếu tìm thấy danh mục con chứa chủ đề, tạo URL với tham số truy vấn topic
                                            if (targetSubCategory) {
                                                topicUrl = `/categories/${category}/${targetSubCategory}?topic=${topicSlug}`;
                                            } else {
                                                // Fallback: Sử dụng URL chủ đề nếu không tìm thấy danh mục con
                                                topicUrl = topic.link;
                                            }
                                        }

                                        return (
                                            <Link
                                                key={index}
                                                href={topicUrl}
                                                className="flex flex-col items-center p-4 border rounded-md hover:bg-gray-50"
                                            >
                                                <div className="text-center">
                                                    <h3 className="font-medium">{topic.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{topic.students} học viên</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

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