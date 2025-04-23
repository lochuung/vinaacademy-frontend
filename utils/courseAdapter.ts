import { CourseDto } from '@/types/course';
import { CourseType } from '@/types/instructor-course';

export function adaptCourseToUi(course: CourseDto): CourseType {
    return {
        id: course.id,
        title: course.name,
        students: course.totalStudent || 0,
        rating: course.rating || 0,
        income: course.price || 0, // Hoặc sử dụng logic khác nếu cần
        lastUpdated: course.updatedDate,
        published: course.status === 'PUBLISHED',
        thumbnail: course.image || '/placeholder-course.jpg'
    };
}

export function adaptCoursesToUi(courses: CourseDto[]): CourseType[] {
    return courses.map(adaptCourseToUi);
}