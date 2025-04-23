import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { CourseType } from '@/types/instructor-course';
import { getInstructorCourses } from '@/services/courseService';
import { mapCoursesToUiModels } from '@/utils/courseMapper';

export default function CourseGridView() {
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await getInstructorCourses();

                if (response && response.content) {
                    // Transform the API response to match our UI model
                    const transformedCourses = mapCoursesToUiModels(response.content);
                    setCourses(transformedCourses);
                } else {
                    throw new Error('Failed to fetch courses');
                }
            } catch (err) {
                console.error('Error fetching courses:', err);
                setError('Failed to load courses. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) {
        return <div className="flex justify-center py-10">Loading courses...</div>;
    }

    if (error) {
        return <div className="text-red-500 py-10 text-center">{error}</div>;
    }

    if (courses.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">No courses found. Create your first course!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}