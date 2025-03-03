"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CourseCarousel = () => {
    // Dữ liệu mẫu của các khóa học
    const courses = [
        {
            id: 1,
            title: "Web Development Fundamentals",
            description: "Learn HTML, CSS, and JavaScript basics",
            duration: "8 weeks",
            level: "Beginner"
        },
        {
            id: 2,
            title: "React Mastery",
            description: "Advanced React patterns and best practices",
            duration: "10 weeks",
            level: "Advanced"
        },
        {
            id: 3,
            title: "Python Programming",
            description: "Comprehensive Python from basics to advanced",
            duration: "12 weeks",
            level: "Intermediate"
        },
        {
            id: 4,
            title: "Data Science Essentials",
            description: "Introduction to data analysis and visualization",
            duration: "6 weeks",
            level: "Beginner"
        },
        {
            id: 5,
            title: "Mobile App Development",
            description: "Build iOS and Android apps",
            duration: "14 weeks",
            level: "Intermediate"
        }
    ];

    // State để theo dõi vị trí hiện tại của carousel
    const [currentIndex, setCurrentIndex] = useState(0);
    // Số lượng card hiển thị cùng một lúc
    const itemsToShow = 4;

    // Hàm xử lý chuyển đến slide tiếp theo
    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsToShow >= courses.length ? 0 : prevIndex + 1
        );
    };

    // Hàm xử lý chuyển đến slide trước đó
    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? courses.length - itemsToShow : prevIndex - 1
        );
    };

    return (
        // Container chính của carousel
        <div className="relative w-full max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
                {/* Nút điều hướng trái */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Vùng hiển thị các card khóa học */}
                <div className="flex gap-4 overflow-hidden py-8">
                    {courses
                        .slice(currentIndex, currentIndex + itemsToShow)
                        .map((course) => (
                            // Card khóa học
                            <Card key={course.id} className="w-[300px] flex-shrink-0">
                                {/* Phần header của card chứa hình ảnh */}
                                <CardHeader>
                                    <img
                                        src="/images/courses/react.jpg"  // Đã thay placeholder bằng hình ảnh cục bộ
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                {/* Phần nội dung của card */}
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                                    <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{course.duration}</span>
                                        <span>{course.level}</span>
                                    </div>
                                </CardContent>
                                {/* Phần footer của card chứa nút thêm vào giỏ hàng */}
                                <CardFooter className="p-4 pt-0">
                                    <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                        Thêm vào giỏ hàng
                                    </button>
                                </CardFooter>
                            </Card>
                        ))}
                </div>

                {/* Nút điều hướng phải */}
                <button
                    onClick={nextSlide}
                    className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default CourseCarousel;