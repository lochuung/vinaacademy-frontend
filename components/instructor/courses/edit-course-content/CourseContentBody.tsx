// components/CourseContentBody.tsx
import {Section} from '@/types/instructor-course-edit';
import {SectionItem} from './SectionItem';

interface CourseContentBodyProps {
    sections: Section[];
    courseId: string;
    expandedSections: string[];
    isDragging: boolean;
    onDragStart: () => void;
    onDragEnd: () => void;
    toggleSection: (sectionId: string) => void;
    deleteSection: (sectionId: string) => void;
    addLecture: (sectionId: string) => void;
    deleteLecture: (sectionId: string, lectureId: string) => void;
}

export const CourseContentBody = ({
                                      sections,
                                      courseId,
                                      expandedSections,
                                      isDragging,
                                      onDragStart,
                                      onDragEnd,
                                      toggleSection,
                                      deleteSection,
                                      addLecture,
                                      deleteLecture
                                  }: CourseContentBodyProps) => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className={`p-6 space-y-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
                    {sections.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Chưa có nội dung nào. Hãy thêm phần học đầu tiên.</p>
                        </div>
                    ) : (
                        sections.sort((a, b) => a.order - b.order).map((section) => (
                            <SectionItem
                                key={section.id}
                                section={section}
                                courseId={courseId}
                                isExpanded={expandedSections.includes(section.id)}
                                onToggle={toggleSection}
                                onDragStart={onDragStart}
                                onDragEnd={onDragEnd}
                                onDelete={deleteSection}
                                onAddLecture={addLecture}
                                onDeleteLecture={deleteLecture}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};