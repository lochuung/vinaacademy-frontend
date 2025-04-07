"use client";

import Link from "next/link";
import Image from "next/image";

interface CourseType {
    id: number;
    name: string;
    instructor: string;
    category?: string;
    image: string;
    progress: number;
    lastAccessed?: string;
    completedLessons: number;
    totalLessons: number;
}

interface CourseCardProps {
    course: CourseType;
}

const CourseCard = ({course}: CourseCardProps) => {
    // Hàm lấy màu thanh tiến độ dựa vào phần trăm hoàn thành
    const getProgressColor = (progress: number) => {
        if (progress >= 100) return "bg-black";
        if (progress >= 80) return "bg-gray-800";
        if (progress >= 40) return "bg-gray-600";
        if (progress >= 20) return "bg-gray-400";
        return "bg-gray-300";
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Phần ảnh */}
                <div className="md:w-1/3 w-full">
                    <div className="relative w-full h-32 md:h-full">
                        {course.image ? (
                            <Image
                                src={course.image}
                                alt={course.name}
                                fill
                                className="rounded-lg object-cover"
                            />
                        ) : (
                            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No image</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Phần thông tin */}
                <div className="md:w-2/3 w-full flex flex-col justify-between">
                    <div>
                        <Link href={`/learning/${course.id}`}>
                            <h3 className="text-lg font-semibold text-black hover:text-gray-700 transition-colors">
                                {course.name}
                            </h3>
                        </Link>

                        <p className="text-gray-600 text-sm mt-1">
                            Giảng viên: {course.instructor}
                        </p>
                    </div>

                    <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                            <span
                                className="text-gray-600">{course.completedLessons}/{course.totalLessons} bài học</span>
                            <span className="font-medium">{course.progress}%</span>
                        </div>

                        <div className="w-full bg-gray-100 h-2 rounded-full">
                            <div
                                className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                                style={{width: `${course.progress}%`}}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;