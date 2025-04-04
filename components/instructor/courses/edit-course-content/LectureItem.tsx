// components/LectureItem.tsx
import Link from 'next/link';
import { Grip, Edit, Trash2 } from 'lucide-react';
import { Lecture } from '@/types/instructor-course-edit';
import { formatDuration, getLectureTypeIcon } from './formatters';

interface LectureItemProps {
    lecture: Lecture;
    courseId: string;
    sectionId: string;
    onDragStart: () => void;
    onDragEnd: () => void;
    onDelete: (sectionId: string, lectureId: string) => void;
}

export const LectureItem = ({
    lecture,
    courseId,
    sectionId,
    onDragStart,
    onDragEnd,
    onDelete
}: LectureItemProps) => {
    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
            <div className="flex items-center">
                <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 mr-2"
                    onMouseDown={onDragStart}
                    onMouseUp={onDragEnd}
                >
                    <Grip className="h-4 w-4" />
                </button>
                <div className="flex items-center mr-2">
                    {getLectureTypeIcon(lecture.type)}
                </div>
                <div>
                    <div className="text-sm font-medium text-gray-900">
                        {lecture.title}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                        {lecture.type === 'video' && (
                            <span>{formatDuration(lecture.duration)}</span>
                        )}
                        {!lecture.isPublished && (
                            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                                Bản nháp
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Link href={`/instructor/courses/${courseId}/lectures/${lecture.id}`}>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-blue-500 p-1"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                </Link>
                <button
                    type="button"
                    className="text-gray-400 hover:text-red-500 p-1"
                    onClick={() => onDelete(sectionId, lecture.id)}
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};