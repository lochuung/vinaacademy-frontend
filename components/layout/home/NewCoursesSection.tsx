"use client";

import Carousel from "@/components/layout/Carousel";

const NewCoursesSection = () => {
    return (
        <div className="mt-[-20px] w-full">
            <div className="px-5">
                <h2 className="text-3xl font-bold text-black">Khám phá khóa học mới</h2>
            </div>
            <div className="mt-[-20px] w-full">
                <Carousel />
            </div>
        </div>
    );
};

export default NewCoursesSection;