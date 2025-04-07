"use client";

import {useParams} from 'next/navigation';
import {CourseContentHeader} from '@/components/instructor/courses/edit-course-content/CourseContentHeader';
import {CourseContentBody} from '@/components/instructor/courses/edit-course-content/CourseContentBody';
import {CourseContentFooter} from '@/components/instructor/courses/edit-course-content/CourseContentFooter';
import {useCourseContent} from '@/components/instructor/courses/edit-course-content/hooks/useCourseContent';

export default function CourseContentPage() {
    const params = useParams();
    const courseId = params.id as string;

    const {
        sections,
        expandedSections,
        isDragging,
        setIsDragging,
        toggleSection,
        addSection,
        addLecture,
        deleteSection,
        deleteLecture
    } = useCourseContent();

    const handleSaveDraft = () => {
        // Implementation for saving draft
        console.log('Saving draft...');
    };

    const handlePublish = () => {
        // Implementation for publishing course
        console.log('Publishing course...');
    };

    return (
        <div className="py-6">
            {/* Header Component */}
            <CourseContentHeader
                courseId={courseId}
                onAddSection={addSection}
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
            />

            {/* Footer Component */}
            <CourseContentFooter
                onSaveDraft={handleSaveDraft}
                onPublish={handlePublish}
            />
        </div>
    );
}