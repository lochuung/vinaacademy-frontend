"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingCart, CheckCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCourses } from '@/data/mockCourses';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { checkEnrollment } from '@/services/enrollmentService';

interface CarouselProps {
    title?: string;
    category?: string;
    subCategory?: string;
    featured?: boolean;
    bestSeller?: boolean;
    limit?: number;
    customCourses?: any[]; // Add this prop to accept custom courses
}

const Carousel = ({
    title,
    category,
    subCategory,
    featured,
    bestSeller,
    limit = 8,
    customCourses, // Accept custom courses from the adapter
}: CarouselProps) => {
    const { addToCart, cartItems } = useCart();
    const { toast } = useToast();
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [addingToCartId, setAddingToCartId] = useState<string | null>(null);
    const [enrolledCourses, setEnrolledCourses] = useState<Record<string, boolean>>({});
    const [loadingEnrollment, setLoadingEnrollment] = useState<Record<string, boolean>>({});

    // Use either custom courses or filter mock courses
    const filteredCourses = customCourses || mockCourses.filter(course => {
        if (category && course.category !== category) return false;
        if (subCategory && course.subCategory !== subCategory) return false;
        if (featured === true && !course.featured) return false;
        if (bestSeller === true && !course.bestSeller) return false;
        return true;
    }).slice(0, limit);

    // Kiểm tra trạng thái đăng ký của các khóa học khi component mount hoặc khi xác thực thay đổi
    useEffect(() => {
        const checkCoursesEnrollment = async () => {
            if (!isAuthenticated) {
                setEnrolledCourses({});
                return;
            }

            const enrollmentStatuses: Record<string, boolean> = {};
            const loadingStatuses: Record<string, boolean> = {};

            // Kiểm tra từng khóa học
            for (const course of filteredCourses) {
                const courseId = course.id.toString();
                loadingStatuses[courseId] = true;
                setLoadingEnrollment({ ...loadingStatuses });

                try {
                    const isEnrolled = await checkEnrollment(courseId);
                    enrollmentStatuses[courseId] = isEnrolled;
                } catch (error) {
                    console.error(`Error checking enrollment for course ${courseId}:`, error);
                    enrollmentStatuses[courseId] = false;
                }

                loadingStatuses[courseId] = false;
                setLoadingEnrollment({ ...loadingStatuses });
            }

            setEnrolledCourses(enrollmentStatuses);
        };

        checkCoursesEnrollment();
    }, [isAuthenticated, filteredCourses]);

    // State để theo dõi vị trí hiện tại của carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    // Số lượng card hiển thị cùng một lúc
    const itemsToShow = 4;

    // Hàm xử lý chuyển đến slide tiếp theo
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsToShow >= filteredCourses.length ? 0 : prevIndex + 1
        );
    };

    // Hàm xử lý chuyển đến slide trước đó
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? Math.max(0, filteredCourses.length - itemsToShow) : prevIndex - 1
        );
    };

    // Kiểm tra xem khóa học có trong giỏ hàng không
    const isInCart = (courseId: string) => {
        return cartItems.some(item => item.courseId === courseId);
    };

    // Kiểm tra xem người dùng đã đăng ký khóa học không
    const isEnrolled = (courseId: string) => {
        return enrolledCourses[courseId] || false;
    };

    // Xử lý thêm vào giỏ hàng
    const handleAddToCart = async (e: React.MouseEvent, course: any) => {
        e.preventDefault(); // Ngăn chặn việc chuyển hướng đến trang chi tiết khóa học

        // Kiểm tra đăng nhập
        if (!isAuthenticated) {
            toast({
                title: "Bạn cần đăng nhập",
                description: "Vui lòng đăng nhập để thêm khóa học vào giỏ hàng",
                variant: "destructive",
            });
            router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
        }

        // Kiểm tra nếu khóa học miễn phí
        if (course.price === 0 || parseInt(course.price) === 0) {
            toast({
                title: "Khóa học miễn phí",
                description: "Bạn có thể đăng ký học ngay mà không cần thêm vào giỏ hàng",
            });
            return;
        }

        // Kiểm tra nếu đã đăng ký
        if (isEnrolled(course.id.toString())) {
            toast({
                title: "Đã đăng ký khóa học",
                description: "Bạn đã đăng ký khóa học này, hãy tiếp tục học",
            });
            router.push(`/learning/${course.slug || course.id}`);
            return;
        }

        // Kiểm tra nếu đã có trong giỏ hàng
        if (isInCart(course.id.toString())) {
            toast({
                title: "Đã có trong giỏ hàng",
                description: "Khóa học này đã có trong giỏ hàng của bạn",
            });
            return;
        }

        // Xử lý thêm vào giỏ hàng
        setAddingToCartId(course.id.toString());
        try {
            const success = await addToCart({
                courseId: course.id.toString(),
                price: typeof course.price === 'number' ? course.price : parseInt(course.price)
            });

            if (success) {
                toast({
                    title: "Đã thêm vào giỏ hàng",
                    description: "Khóa học đã được thêm vào giỏ hàng của bạn",
                });
            } else {
                toast({
                    title: "Không thể thêm vào giỏ hàng",
                    description: "Có lỗi xảy ra khi thêm khóa học vào giỏ hàng",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast({
                title: "Không thể thêm vào giỏ hàng",
                description: "Có lỗi xảy ra khi thêm khóa học vào giỏ hàng",
                variant: "destructive",
            });
        } finally {
            setAddingToCartId(null);
        }
    };

    // Xử lý khi nhấn nút tiếp tục học
    const handleContinueLearning = (e: React.MouseEvent, course: any) => {
        e.preventDefault();
        router.push(`/learning/${course.slug || course.id}`);
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 py-6">
            {title && (
                <h3 className="text-xl font-semibold mb-4">{title}</h3>
            )}

            <div className="relative flex items-center">
                {/* Nút điều hướng trái */}
                <button
                    onClick={prevSlide}
                    className="absolute left-[-45px] z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                    disabled={currentIndex === 0}
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Vùng hiển thị các card khóa học */}
                <div className="flex gap-4 overflow-hidden py-4 w-full">
                    {filteredCourses
                        .slice(currentIndex, currentIndex + itemsToShow)
                        .map((course) => {
                            const courseId = course.id.toString();
                            const courseInCart = isInCart(courseId);
                            const courseEnrolled = isEnrolled(courseId);
                            const isAdding = addingToCartId === courseId;
                            const isLoading = loadingEnrollment[courseId];
                            const isFree = course.price === 0 || parseInt(course.price) === 0;

                            return (
                                <Link
                                    href={`/courses/${course.slug || course.id}`}
                                    key={course.id}
                                    className="flex-1 w-[280px]"
                                >
                                    <Card className="flex flex-col h-full w-[280px] hover:shadow-md transition-shadow">
                                        {/* Phần header của card chứa hình ảnh */}
                                        <CardHeader className="p-0 relative">
                                            <div className="relative w-full h-40">
                                                <Image
                                                    src={course.image}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover rounded-t-lg"
                                                />
                                                {course.discount > 0 && (
                                                    <div
                                                        className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                        -{course.discount}%
                                                    </div>
                                                )}
                                                {course.bestSeller && (
                                                    <div
                                                        className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
                                                        Bán chạy
                                                    </div>
                                                )}
                                            </div>
                                        </CardHeader>

                                        {/* Phần nội dung của card */}
                                        <CardContent className="p-4 flex-grow">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                                    {course.category}
                                                </span>
                                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                                    {course.level}
                                                </span>
                                            </div>
                                            <CardTitle className="text-lg mb-2 line-clamp-2 h-16">{course.title}</CardTitle>
                                            <p className="text-gray-600 text-sm mb-2">{course.instructor}</p>
                                            <div className="flex items-center gap-1 mb-2">
                                                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                <span className="text-sm font-medium">{course.rating}</span>
                                                <span className="text-xs text-gray-500">({course.students})</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold">
                                                    {isFree
                                                        ? "Miễn phí"
                                                        : `${parseInt(course.price).toLocaleString()}đ`}
                                                </span>
                                                {course.originalPrice && !isFree && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        {parseInt(course.originalPrice).toLocaleString()}đ
                                                    </span>
                                                )}
                                            </div>
                                        </CardContent>

                                        {/* Phần footer của card */}
                                        <CardFooter className="p-4 pt-0 mt-auto">
                                            {isLoading ? (
                                                <button
                                                    className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg disabled:opacity-70"
                                                    disabled
                                                >
                                                    Đang kiểm tra...
                                                </button>
                                            ) : courseEnrolled ? (
                                                <button
                                                    className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                                    onClick={(e) => handleContinueLearning(e, course)}
                                                >
                                                    <BookOpen className="w-4 h-4" />
                                                    Tiếp tục học
                                                </button>
                                            ) : isFree ? (
                                                <button
                                                    className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.push(`/courses/${course.slug || course.id}`);
                                                    }}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Học miễn phí
                                                </button>
                                            ) : courseInCart ? (
                                                <button
                                                    className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        router.push('/cart');
                                                    }}
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Đã thêm vào giỏ
                                                </button>
                                            ) : (
                                                <button
                                                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400"
                                                    onClick={(e) => handleAddToCart(e, course)}
                                                    disabled={isAdding}
                                                >
                                                    {isAdding ? (
                                                        "Đang xử lý..."
                                                    ) : (
                                                        <>
                                                            <ShoppingCart className="w-4 h-4" />
                                                            Thêm vào giỏ hàng
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </CardFooter>
                                    </Card>
                                </Link>
                            );
                        })}
                </div>

                {/* Nút điều hướng phải */}
                <button
                    onClick={nextSlide}
                    className="absolute right-[-45px] z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                    disabled={currentIndex + itemsToShow >= filteredCourses.length}
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;