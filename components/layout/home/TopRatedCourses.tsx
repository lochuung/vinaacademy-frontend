"use client";

import Carousel from "@/components/layout/Carousel";

const TopRatedCourses = () => {
    return (
        <div className="mt-[-40px] w-full">
            <div className="px-5">
                <h5 className="text-xl font-semibold text-gray-800 mt-6">Được đánh giá cao</h5>
            </div>
            <div className="mt-[-20px] w-full">
                <Carousel />
            </div>
        </div>
    );
};

export default TopRatedCourses;