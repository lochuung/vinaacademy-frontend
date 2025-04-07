interface CourseStatsProps {
    totalStudents: number;
    totalHours: number;
    lectures: number;
    level: string;
    className?: string;
}

export default function CourseStats({
                                        totalStudents,
                                        totalHours,
                                        lectures,
                                        level,
                                        className = ''
                                    }: CourseStatsProps) {
    return (
        <div className={className}>
            {/* Students Count */}
            <div className="text-sm text-gray-600">
                <span>{totalStudents.toLocaleString()} học viên</span>
            </div>

            {/* Course Details */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <span>{totalHours} giờ học</span>
                <span>•</span>
                <span>{lectures} bài giảng</span>
                <span>•</span>
                <span>{level}</span>
            </div>
        </div>
    );
}