"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, BookOpen } from "lucide-react";
import { Spinner } from "@/components/common/pinner";
import { getInstructorById, getInstructorCourses } from "@/services/instructorService";
import { CourseType } from "@/types/instructor-course";

export default function PublicInstructorPage() {
    const { instructorId } = useParams();
    const [instructor, setInstructor] = useState<any>(null);
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const [instructorData, coursesData] = await Promise.all([
                getInstructorById(instructorId as string),
                getInstructorCourses(instructorId as string),
            ]);
            setInstructor(instructorData);
            setCourses(coursesData || []);
            setLoading(false);
        }
        if (instructorId) fetchData();
    }, [instructorId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spinner size="lg" />
            </div>
        );
    }

    if (!instructor) {
        return (
            <div className="text-center text-gray-500 py-12">
                Không tìm thấy thông tin giảng viên.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8">
            {/* Instructor Info */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                    <Image
                        src={instructor.avatarUrl || "/images/default-avatar.png"}
                        alt={instructor.fullName}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{instructor.fullName}</h1>
                    <p className="text-gray-600 mb-2">{instructor.email}</p>
                </div>
            </div>

            {/* Instructor Description */}
            <div className="mb-10">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Giới thiệu</h2>
                <div className="bg-gray-50 rounded p-4 text-gray-700 min-h-[60px]">
                    {instructor.description ? instructor.description : "Chưa có giới thiệu."}
                </div>
            </div>

            {/* Courses List */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Các khóa học của giảng viên</h2>
                {courses.length === 0 ? (
                    <div className="text-gray-500">Chưa có khóa học nào.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courses.map((course) => (
                            <Link
                                key={course.id}
                                href={`/courses/${course.id}`}
                                className="block bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden border border-gray-100"
                            >
                                <div className="relative h-40 w-full">
                                    <Image
                                        src={course.thumbnail || "/images/course-default.jpg"}
                                        alt={course.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{course.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mb-2">
                                        <BookOpen className="h-4 w-4 mr-1" />
                                        <span>{course.students} học viên</span>
                                        {course.rating > 0 && (
                                            <span className="flex items-center ml-4">
                                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                                {course.rating}
                                            </span>
                                        )}
                                    </div>
                                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                                        Cập nhật: {course.lastUpdated}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}