"use client";

import { useParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';
import { CourseContentHeader } from '@/components/instructor/courses/edit-course-content/CourseContentHeader';
import { CourseContentBody } from '@/components/instructor/courses/edit-course-content/CourseContentBody';
import { CourseContentFooter } from '@/components/instructor/courses/edit-course-content/CourseContentFooter';
import { useCourseContent } from '@/components/instructor/courses/edit-course-content/hooks/useCourseContent';
import { SectionEditModal } from '@/components/instructor/courses/SectionEditModal';
import { adaptSectionDisplaysToSections } from '@/utils/adapters/courseContentAdapter';

export default function CourseContentPage() {
    const params = useParams();
    const courseId = params.id as string;
    const [isSaving, setIsSaving] = useState(false);
    const [isAddSectionModalOpen, setAddSectionModalOpen] = useState(false);

    const {
        sections: sectionsDisplay,
        expandedSections,
        isDragging,
        isLoading,
        setIsDragging,
        toggleSection,
        addSection,
        deleteSection,
        addLecture,
        deleteLecture,
        saveAllChanges,
        fetchSections
    } = useCourseContent(courseId);

    // Convert SectionDisplay[] to Section[] using the adapter
    const sections = adaptSectionDisplaysToSections(sectionsDisplay);

    const handleSaveDraft = async () => {
        setIsSaving(true);
        try {
            const success = await saveAllChanges();
            if (success) {
                toast.success('Đã lưu thay đổi thành công');
            }
        } catch (error) {
            console.error('Lỗi khi lưu thay đổi:', error);
            toast.error('Không thể lưu thay đổi. Vui lòng thử lại sau.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddSection = () => {
        setAddSectionModalOpen(true);
    };

    const handleSectionAdded = () => {
        fetchSections();
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-black" />
                <span className="ml-2 text-lg">Đang tải nội dung khóa học...</span>
            </div>
        );
    }

    return (
        <div className="py-6">
            {/* Header Component */}
            <CourseContentHeader
                courseId={courseId}
                onAddSection={handleAddSection}
            />

            {/* Main Content Component */}
            <CourseContentBody
                sections={sections}
                courseId={courseId}
                expandedSections={expandedSections}
                isDragging={isDragging}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={() => setIsDragging(false)}
                toggleSection={toggleSection}
                deleteSection={deleteSection}
                addLecture={addLecture}
                deleteLecture={deleteLecture}
                onSectionUpdated={fetchSections}
                onLectureUpdated={fetchSections}
            />

            {/* Footer Component */}
            <CourseContentFooter
                onSaveDraft={handleSaveDraft}
                isSaving={isSaving}
            />

            {/* Modal thêm phần học mới */}
            <SectionEditModal
                courseId={courseId}
                isOpen={isAddSectionModalOpen}
                onClose={() => setAddSectionModalOpen(false)}
                onSave={handleSectionAdded}
            />
        </div>
    );
}