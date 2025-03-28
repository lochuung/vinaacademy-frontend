import React from "react";
import Link from "next/link";
import { LearningCourse } from "@/types/navbar";

interface CourseCardProps {
    course: LearningCourse;
}

const CourseCard = ({ course }: CourseCardProps) => {
    const isCompleted = course.progress === 100;
    const title = course.name;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
                <img
                    src={course.image}
                    alt={title}
                    className="w-full h-48 object-cover"
                />
                {course.category && (
                    <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md text-sm font-medium text-gray-700">
                        {course.category}
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                        {course.instructor}
                    </span>
                    <span className={`text-sm font-medium ${isCompleted ? "text-gray-700" : "text-black"
                        }`}>
                        {isCompleted ? "Đã hoàn thành" : `${course.progress}% hoàn thành`}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                        className={`h-2.5 rounded-full transition-all duration-300 ${course.progress === 100
                            ? "bg-black"
                            : course.progress >= 80
                                ? "bg-gray-900"
                                : course.progress >= 60
                                    ? "bg-gray-700"
                                    : course.progress >= 40
                                        ? "bg-gray-500"
                                        : course.progress >= 20
                                            ? "bg-gray-400"
                                            : "bg-gray-300"
                            }`}
                        style={{ width: `${course.progress}%` }}
                    ></div>
                </div>

                {course.completedLessons !== undefined && course.totalLessons !== undefined && (
                    <div className="text-xs text-gray-500 mb-4">
                        {course.completedLessons} / {course.totalLessons} bài học
                    </div>
                )}



                <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                        href={`/learning/${course.id}`}
                        className="text-center py-2 px-3 bg-black hover:bg-gray-900 text-white font-medium rounded-md transition-colors duration-300"
                    >
                        {isCompleted ? "Xem lại" : "Tiếp tục học"}
                    </Link>

                    <Link
                        href={`/my-courses/${course.id}`}
                        className="text-center py-2 px-3 bg-white border border-gray-900 text-gray-900 font-medium rounded-md hover:bg-gray-100 transition-colors duration-300"
                    >
                        Chi tiết tiến độ
                    </Link>

                </div>
            </div>
        </div>
    );
};

export default CourseCard;