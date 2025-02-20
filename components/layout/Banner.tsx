"use client";
import React, { useState, useEffect } from "react";

const slides = [
    "https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp",
    "https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp",
    "https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp",
    "https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
];

const Banner: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Chuyển slide tự động mỗi 4 giây
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const handlePrevClick = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const handleNextClick = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className="relative w-full overflow-hidden">
            <div className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((src, index) => (
                    <div key={index} className="min-w-full">
                        <img src={src} className="w-full" alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* Nút điều hướng */}
            <button onClick={handlePrevClick} className="absolute left-5 top-1/2 transform -translate-y-1/2 btn btn-circle">
                ❮
            </button>
            <button onClick={handleNextClick} className="absolute right-5 top-1/2 transform -translate-y-1/2 btn btn-circle">
                ❯
            </button>

            {/* Chấm chỉ mục */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <span key={index} className={`h-2 w-2 rounded-full ${index === currentSlide ? "bg-white" : "bg-gray-400"}`} />
                ))}
            </div>
        </div>
    );
};

export default Banner;
