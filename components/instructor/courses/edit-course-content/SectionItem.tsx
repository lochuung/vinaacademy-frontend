// components/SectionItem.tsx
import { Grip, ChevronUp, ChevronDown, Edit, Trash2, Plus } from 'lucide-react';
import { Section } from '@/types/instructor-course-edit';
import { LectureItem } from './LectureItem';

interface SectionItemProps {
    section: Section;
    courseId: string;
    isExpanded: boolean;
    onToggle: (sectionId: string) => void;
    onDragStart: () => void;
    onDragEnd: () => void;
    onDelete: (sectionId: string) => void;
    onAddLecture: (sectionId: string) => void;
    onDeleteLecture: (sectionId: string, lectureId: string) => void;
}

export const SectionItem = ({
    section,
    courseId,
    isExpanded,
    onToggle,
    onDragStart,
    onDragEnd,
    onDelete,
    onAddLecture,
    onDeleteLecture
}: SectionItemProps) => {
    return (
        <div className="border border-gray-200 rounded-md overflow-hidden">
            {/* Section header */}
            <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 mr-2"
                        onMouseDown={onDragStart}
                        onMouseUp={onDragEnd}
                    >
                        <Grip className="h-5 w-5" />
                    </button>
                    <div>
                        <div className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                                Phần {section.order}: {section.title}
                            </span>
                            <span className="ml-2 text-xs text-gray-500">
                                {section.lectures.length} bài giảng
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 p-1"
                        onClick={() => onToggle(section.id)}
                    >
                        {isExpanded ? (
                            <ChevronUp className="h-5 w-5" />
                        ) : (
                            <ChevronDown className="h-5 w-5" />
                        )}
                    </button>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-blue-500 p-1"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        className="text-gray-400 hover:text-red-500 p-1"
                        onClick={() => onDelete(section.id)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Section content */}
            {isExpanded && (
                <div className="bg-white p-4">
                    <div className="space-y-2">
                        {section.lectures.sort((a, b) => a.order - b.order).map((lecture) => (
                            <LectureItem
                                key={lecture.id}
                                lecture={lecture}
                                courseId={courseId}
                                sectionId={section.id}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                onDelete={onDeleteLecture}
                            />
                        ))}
                    </div>
                    <div className="mt-4">
                        <button
                            type="button"
                            onClick={() => onAddLecture(section.id)}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                        >
                            <Plus className="h-3 w-3 mr-1" /> Thêm bài giảng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};