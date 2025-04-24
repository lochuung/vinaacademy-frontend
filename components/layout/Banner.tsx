"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced banner images with better quality and relevant content
const slides = [
    {
        image: "https://img.freepik.com/free-photo/e-learning-education-student-university-concept_31965-6535.jpg",
        title: "Trở thành chuyên gia với khóa học trực tuyến",
        description: "Tiếp cận kiến thức mới từ các giảng viên hàng đầu"
    },
    {
        image: "https://img.freepik.com/free-photo/modern-equipped-computer-lab_23-2149241213.jpg",
        title: "Học từ mọi nơi với nền tảng học tập hiện đại",
        description: "Truy cập không giới hạn với các khóa học đa dạng"
    },
    {
        image: "https://img.freepik.com/free-photo/concentrated-young-student-taking-online-course_23-2149239437.jpg",
        title: "Phát triển sự nghiệp của bạn",
        description: "Nâng cao kỹ năng với các chứng chỉ được công nhận"
    },
    {
        image: "https://img.freepik.com/free-photo/group-diverse-people-having-business-meeting_53876-25060.jpg",
        title: "Học cùng cộng đồng",
        description: "Kết nối với học viên và giảng viên từ khắp nơi"
    }
];

const Banner: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAuto, setIsAuto] = useState(true);

    // Auto-advance slides when isAuto is true
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAuto) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % slides.length);
            }, 6000); // Longer duration for better readability
        }
        return () => clearInterval(interval);
    }, [isAuto]);

    // Pause auto-rotation when hovering
    const handleMouseEnter = () => setIsAuto(false);
    const handleMouseLeave = () => setIsAuto(true);

    const handlePrevClick = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setIsAuto(false);
        setTimeout(() => setIsAuto(true), 5000); // Resume auto after interaction
    };

    const handleNextClick = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAuto(false);
        setTimeout(() => setIsAuto(true), 5000); // Resume auto after interaction
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAuto(false);
        setTimeout(() => setIsAuto(true), 5000); // Resume auto after interaction
    };

    return (
        <div 
            className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                >
                    <div className="relative w-full h-full">
                        {/* Image */}
                        <img 
                            src={slides[currentSlide].image} 
                            className="w-full h-full object-cover object-center" 
                            alt={`Banner ${currentSlide + 1}`}
                        />
                        
                        {/* Gradient overlay for better text visibility */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                        
                        {/* Text content */}
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
                            <motion.h2 
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2"
                            >
                                {slides[currentSlide].title}
                            </motion.h2>
                            <motion.p 
                                initial={{ y: 15, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-xs sm:text-sm md:text-base opacity-90 hidden xs:block"
                            >
                                {slides[currentSlide].description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation buttons */}
            <button 
                onClick={handlePrevClick}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1 sm:p-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Previous slide"
            >
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            
            <button 
                onClick={handleNextClick}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-1 sm:p-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Next slide"
            >
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Indicator dots */}
            <div className="absolute bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-300 
                            ${index === currentSlide 
                                ? "bg-white scale-110" 
                                : "bg-white/40 hover:bg-white/70"}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;
