import { useState, useEffect, useCallback } from 'react';
import { getInstructorCourses } from '@/services/courseService';
import { PaginatedResponse } from '@/types/api-response';
import { CourseDto } from '@/types/course';
import { CourseType } from '@/types/instructor-course';
import { useAuth } from '@/context/AuthContext';
import { adaptCoursesToUi } from '@/utils/courseAdapter';

export function useInstructorCourses(initialPage = 0, initialSize = 10) {
    const { isAuthenticated } = useAuth();
    const [courses, setCourses] = useState<CourseType[]>([]);
    const [pagination, setPagination] = useState<Omit<PaginatedResponse<CourseDto>, 'content'> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(initialPage);
    const [size, setSize] = useState<number>(initialSize);
    const [sortBy, setSortBy] = useState<string>('createdDate');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    const fetchCourses = useCallback(async () => {
        if (!isAuthenticated) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await getInstructorCourses(page, size, sortBy, sortDirection);

            if (response) {
                // Chuyển đổi dữ liệu CourseDto sang CourseType
                const adaptedCourses = adaptCoursesToUi(response.content);
                setCourses(adaptedCourses);

                // Lưu thông tin phân trang
                const { content, ...paginationInfo } = response;
                setPagination(paginationInfo);
            } else {
                setCourses([]);
                setPagination(null);
                setError('Không thể tải danh sách khóa học');
            }
        } catch (err) {
            console.error('Error fetching instructor courses:', err);
            setError('Đã xảy ra lỗi khi tải danh sách khóa học');
        } finally {
            setLoading(false);
        }
    }, [isAuthenticated, page, size, sortBy, sortDirection]);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleSizeChange = (newSize: number) => {
        setSize(newSize);
        setPage(0); // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    const handleSortChange = (newSortBy: string, newSortDirection: 'asc' | 'desc') => {
        setSortBy(newSortBy);
        setSortDirection(newSortDirection);
    };

    const refreshCourses = () => {
        fetchCourses();
    };

    return {
        courses,
        pagination,
        loading,
        error,
        page,
        size,
        sortBy,
        sortDirection,
        handlePageChange,
        handleSizeChange,
        handleSortChange,
        refreshCourses
    };
}