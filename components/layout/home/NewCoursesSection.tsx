"use client";

import { Sparkles } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCourses } from "@/hooks/useCourses";
import CourseCarouselAdapter from "@/components/layout/CourseCarouselAdapter";

const NewCoursesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    // Fetch newest courses
    const { courses, loading, error } = useCourses({
        sortBy: 'createdDate',
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
                <div className="bg-purple-100 p-1.5 rounded-md shadow-sm">
                    <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    Khám phá khóa học mới
                </h2>
            </div>
            
            <div className="w-full px-1">
                <div className="bg-gradient-to-br from-white to-purple-50 rounded-md sm:rounded-lg p-2 sm:p-3 shadow-sm">
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

export default NewCoursesSection;