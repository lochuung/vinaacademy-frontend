"use client";

import Banner from "@/components/layout/Banner";
import { useInView } from "framer-motion";
import { useRef } from "react";

const BannerSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    return (
        <div 
            ref={sectionRef}
            className="w-full max-w-6xl px-1 sm:px-2"
            style={{
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(15px)',
                transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
            }}
        >
            <Banner/>
            <div className="mt-2 hidden sm:flex items-center justify-center">
                <p className="text-xs text-gray-500 text-center max-w-md">
                    Khám phá hàng ngàn khóa học chất lượng cao từ các chuyên gia hàng đầu
                </p>
            </div>
        </div>
    );
};

export default BannerSection;