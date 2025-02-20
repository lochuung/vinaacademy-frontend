"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const CourseCarousel = () => {
    // Sample course data
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

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = 4; // Number of cards to show at once

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + itemsToShow >= courses.length ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? courses.length - itemsToShow : prevIndex - 1
        );
    };

    return (
        <div className="relative w-full max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between">
                <button
                    onClick={prevSlide}
                    className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex gap-4 overflow-hidden py-8">
                    {courses
                        .slice(currentIndex, currentIndex + itemsToShow)
                        .map((course) => (
                            <Card key={course.id} className="w-[300px] flex-shrink-0">
                                <CardHeader>
                                    <img
                                        src={`/api/placeholder/300/200`}
                                        alt={course.title}
                                        className="w-full h-40 object-cover rounded-t-lg"
                                    />
                                </CardHeader>
                                <CardContent className="p-4">
                                    <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                                    <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                                    <div className="flex justify-between text-sm text-gray-500">
                                        <span>{course.duration}</span>
                                        <span>{course.level}</span>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors">
                                        Thêm vào giỏ hàng
                                    </button>
                                </CardFooter>
                            </Card>
                        ))}
                </div>

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