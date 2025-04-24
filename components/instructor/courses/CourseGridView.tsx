import { useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { CourseType } from '@/types/instructor-course';
import { getInstructorCourses } from '@/services/courseService';
import { mapCoursesToUiModels } from '@/utils/courseMapper';

interface CourseGridViewProps {
    courses: CourseType[];
}

export default function CourseGridView({ courses: coursesFromProps }: CourseGridViewProps) {
    const [localCourses, setLocalCourses] = useState<CourseType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [usePropsData, setUsePropsData] = useState(false);

    useEffect(() => {
        // Nếu nhận được courses từ props, sử dụng chúng trực tiếp
        if (coursesFromProps && coursesFromProps.length > 0) {
            setUsePropsData(true);
            setLoading(false);
            return;
        }

        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await getInstructorCourses();

                if (response && response.content) {
                    // Chuyển đổi dữ liệu API để phù hợp với mô hình UI
                    const transformedCourses = mapCoursesToUiModels(response.content);
                    setLocalCourses(transformedCourses);
                } else {
                    throw new Error('Không thể lấy danh sách khóa học');
                }
            } catch (err) {
                console.error('Lỗi khi lấy danh sách khóa học:', err);
                setError('Không thể tải khóa học. Vui lòng thử lại sau.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [coursesFromProps]);

    if (loading) {
        return <div className="flex justify-center py-10">Đang tải khóa học...</div>;
    }

    if (error) {
        return <div className="text-red-500 py-10 text-center">{error}</div>;
    }

    // Xác định sử dụng dữ liệu từ props hay dữ liệu được tải từ API
    const coursesToDisplay = usePropsData ? coursesFromProps : localCourses;

    if (coursesToDisplay.length === 0) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">Không tìm thấy khóa học nào. Hãy tạo khóa học đầu tiên của bạn!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {coursesToDisplay.map((course) => (
                <CourseCard key={course.id} course={course} />
            ))}
        </div>
    );
}