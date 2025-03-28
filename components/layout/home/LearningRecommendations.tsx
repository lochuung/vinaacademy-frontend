"use client";

import Carousel from "@/components/layout/Carousel";

const LearningRecommendations = () => {
    return (
        <div className="mt-4 w-full">
            <div className="px-5">
                <h2 className="text-3xl font-bold text-black">Học gì tiếp theo?</h2>
                <h5 className="text-xl font-semibold text-gray-800 mt-1">Gợi ý cho bạn</h5>
            </div>
            <div className="mt-[-20px] w-full">
                <Carousel />
            </div>
        </div>
    );
};

export default LearningRecommendations;