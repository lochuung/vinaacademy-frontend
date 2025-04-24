"use client";

import Carousel from "@/components/layout/Carousel";
import { Sparkles } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";

const NewCoursesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
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
                    <p className="text-xs text-gray-600 mb-2 max-w-xl hidden sm:block">
                        Cập nhật với những khóa học mới nhất trên nền tảng. Nội dung luôn đổi mới và cập nhật.
                    </p>
                    <div className="carousel-container">
                        <Carousel/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewCoursesSection;