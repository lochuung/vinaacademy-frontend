"use client";

import { useState } from 'react';
import CourseGridView from '@/components/instructor/courses/CourseGridView';
import CourseListView from '@/components/instructor/courses/CourseListView';
import SearchAndFilterBar from '@/components/instructor/courses/SearchAndFilterBar';
import { mockCourses } from '@/data/mockInstructorCourse';

export default function InstructorCoursesPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [courses, setCourses] = useState(mockCourses);
    const [searchTerm, setSearchTerm] = useState('');

    // Lọc khóa học theo từ khóa tìm kiếm
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Khóa học của tôi</h1>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                    <SearchAndFilterBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />

                    {viewMode === 'grid' ? (
                        <CourseGridView courses={filteredCourses} />
                    ) : (
                        <CourseListView courses={filteredCourses} />
                    )}
                </div>
            </div>
        </div>
    );
}