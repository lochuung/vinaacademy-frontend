import CourseCard from './CourseCard';
import {CourseType} from '@/types/instructor-course';

interface CourseGridViewProps {
    courses: CourseType[];
}

export default function CourseGridView({courses}: CourseGridViewProps) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
                <CourseCard key={course.id} course={course}/>
            ))}
        </div>
    );
}