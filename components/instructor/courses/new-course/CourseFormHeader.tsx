// components/course-creator/CourseFormHeader.tsx
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import {Progress} from '@/components/ui/progress';

interface CourseFormHeaderProps {
    progress: number;
}

export default function CourseFormHeader({progress}: CourseFormHeaderProps) {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
                <Link href="/instructor/courses">
                    <div className="p-2 mr-2 rounded-full hover:bg-gray-200 transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-600"/>
                    </div>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Tạo khóa học mới</h1>
            </div>
            <div className="flex items-center text-sm font-medium text-gray-500">
                <span className="mr-2">Tiến trình:</span>
                <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <Progress value={progress} className="h-full"/>
                </div>
                <span className="ml-2">{progress}%</span>
            </div>
        </div>
    );
}