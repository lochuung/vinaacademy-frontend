"use client";

import { useAuth } from "@/context/AuthContext";
import { Star } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCourses } from "@/hooks/useCourses";
import CourseCarouselAdapter from "@/components/layout/CourseCarouselAdapter";

const TopRatedCourses = () => {
    const { isAuthenticated } = useAuth();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    // Fetch top rated courses
    const { courses, loading, error } = useCourses({
        // minRating: 4,
        sortBy: 'rating',
        sortDirection: 'desc',
        size: 8
    });
    
    return (
        <div 
            ref={sectionRef}
            className="w-full transform transition-all duration-500 ease-out"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? "translateY(0)" : "translateY(15px)"
            }}
        >
            <div className="flex items-center gap-2 mb-2 sm:mb-3 px-1 sm:px-2">
                <div className="bg-blue-100 p-1.5 rounded-md shadow-sm">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 fill-blue-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    Khóa học được đánh giá cao
                </h2>
            </div>
            
            <div className="w-full px-1">
                <div className="bg-gradient-to-br from-white to-blue-50 rounded-md sm:rounded-lg p-2 sm:p-3 shadow-sm">
                    <div className="carousel-container">
                        <CourseCarouselAdapter 
                            courses={courses} 
                            loading={loading} 
                            error={error}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopRatedCourses;