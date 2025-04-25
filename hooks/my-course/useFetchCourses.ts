import { useState, useEffect } from "react";
import { LearningCourse } from "@/types/navbar";
import { getUserEnrollments, EnrollmentResponse } from "@/services/enrollmentService";
import { mockEnrolledCourses } from "@/data/mockCourseData";

type TabType = "all" | "inProgress" | "completed";

export function useFetchCourses(activeTab: TabType, currentPage: number, pageSize: number = 10) {
    const [courses, setCourses] = useState<LearningCourse[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        // Convert activeTab to API status format
        const getStatusFromTab = (): 'IN_PROGRESS' | 'COMPLETED' | 'PAUSED' | undefined => {
            switch (activeTab) {
                case 'inProgress': return 'IN_PROGRESS';
                case 'completed': return 'COMPLETED';
                default: return undefined;
            }
        };

        // Fetch enrollments from API
        const fetchCourses = async () => {
            setIsLoading(true);
            try {
                const status = getStatusFromTab();
                const response = await getUserEnrollments(currentPage, pageSize, status);

                if (response && response.content) {
                    // Map enrollment data to LearningCourse format
                    const mappedCourses = response.content.map((enrollment: EnrollmentResponse) => ({
                        id: String(enrollment.courseId),
                        name: enrollment.courseName,
                        slug: enrollment.courseSlug,
                        image: enrollment.courseImage || '/images/course-placeholder.jpg',
                        instructor: enrollment.instructorName || enrollment.instructor || '',
                        progress: enrollment.progressPercentage?.toFixed(0) || 0,
                        completedLessons: enrollment.completedLessons || 0,
                        totalLessons: enrollment.totalLessons || 0,
                        category: enrollment.category || '',
                        lastAccessed: enrollment.lastAccessedAt || '',
                        enrollmentId: enrollment.id
                    }));

                    setCourses(mappedCourses);
                    setTotalPages(response.totalPages || 1);
                }
            } catch (err) {
                console.error("Lỗi khi tải danh sách khóa học:", err);
                setError(err instanceof Error ? err : new Error('Lỗi không xác định khi tải khóa học'));
                // Fallback to mock data if API fails
                const mockCoursesWithStringId = mockEnrolledCourses.map(course => ({
                    ...course,
                    id: String(course.id)
                }));
                setCourses(mockCoursesWithStringId as LearningCourse[]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCourses();
    }, [activeTab, currentPage, pageSize]);

    return {
        courses,
        totalPages,
        isLoading,
        error
    };
}