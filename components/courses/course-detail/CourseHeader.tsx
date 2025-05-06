"use client";
import React from 'react';
import { CourseDetailsResponse } from '@/types/course';
import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';

interface CourseHeaderProps {
    course: CourseDetailsResponse;
}

const CourseHeader = ({ course }: CourseHeaderProps) => {
    return (
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Course Information - Left Side */}
                <div className="md:w-2/3 space-y-4">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">{course.name}</h1>
                    {/* <p className="text-lg text-gray-200">{course.description}</p> */}

                    {/* Ratings and Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center">
                            <span className="text-yellow-400 font-bold">{course.rating.toFixed(1)}</span>
                            <div className="flex items-center ml-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <span className="ml-1 text-blue-400">({course.totalRating} đánh giá)</span>
                        </div>
                        <span>{course.totalStudent} học viên</span>
                    </div>

                    {/* Instructor Info */}
                    <div className="text-sm">
                        <span className="text-gray-300">Tạo bởi </span>
                        <span className="text-blue-400">
                            {course.instructors.map((instructor, index) => (
                                <React.Fragment key={instructor.id}>
                                    {index > 0 && ', '}
                                    <Link
                                        href={`/instructors/${instructor.id}`}
                                        className="hover:text-blue-500 hover:underline transition-colors"
                                    >
                                        {instructor.fullName}
                                    </Link>
                                </React.Fragment>
                            ))}
                        </span>
                    </div>

                    {/* Additional Info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span>Cập nhật lần cuối {new Date(course.updatedDate!).toLocaleDateString('vi-VN')}</span>
                        <span>{course.language}</span>
                    </div>

                    {/* Course Category */}
                    <div className="text-sm">
                        <span className="text-gray-300">Danh mục: </span>
                        <span className="text-blue-400">{course.categoryName}</span>
                    </div>

                    {/* Course Level */}
                    <div className="text-sm">
                        <span className="text-gray-300">Cấp độ: </span>
                        <span className="text-blue-400">{course.level === 'BEGINNER' ? 'Cơ bản' :
                            course.level === 'INTERMEDIATE' ? 'Trung cấp' : 'Nâng cao'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseHeader;
