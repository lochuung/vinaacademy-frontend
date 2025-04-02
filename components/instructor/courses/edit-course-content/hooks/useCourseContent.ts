// hooks/useCourseContent.ts
import { useState } from 'react';
import { Section, Lecture } from '@/types/instructor-course-edit';
import { mockSections } from '@/data/mockCourseContent';

export const useCourseContent = () => {
    const [sections, setSections] = useState<Section[]>(mockSections);
    const [expandedSections, setExpandedSections] = useState<string[]>(mockSections.map(s => s.id));
    const [isDragging, setIsDragging] = useState(false);

    // Toggle section expansion
    const toggleSection = (sectionId: string) => {
        if (expandedSections.includes(sectionId)) {
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        } else {
            setExpandedSections([...expandedSections, sectionId]);
        }
    };

    // Add new section
    const addSection = () => {
        const newSection: Section = {
            id: `s${Date.now()}`,
            title: "Phần mới",
            order: sections.length + 1,
            lectures: []
        };
        setSections([...sections, newSection]);
        setExpandedSections([...expandedSections, newSection.id]);
    };

    // Add new lecture to section
    const addLecture = (sectionId: string) => {
        const updatedSections = sections.map(section => {
            if (section.id === sectionId) {
                const newLecture: Lecture = {
                    id: `l${Date.now()}`,
                    title: "Bài giảng mới",
                    type: "video",
                    duration: 0,
                    isPublished: false,
                    order: section.lectures.length + 1
                };
                return {
                    ...section,
                    lectures: [...section.lectures, newLecture]
                };
            }
            return section;
        });
        setSections(updatedSections);
    };

    // Delete section
    const deleteSection = (sectionId: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phần này?")) {
            setSections(sections.filter(section => section.id !== sectionId));
            setExpandedSections(expandedSections.filter(id => id !== sectionId));
        }
    };

    // Delete lecture
    const deleteLecture = (sectionId: string, lectureId: string) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa bài giảng này?")) {
            const updatedSections = sections.map(section => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        lectures: section.lectures.filter(lecture => lecture.id !== lectureId)
                    };
                }
                return section;
            });
            setSections(updatedSections);
        }
    };

    return {
        sections,
        expandedSections,
        isDragging,
        setIsDragging,
        toggleSection,
        addSection,
        addLecture,
        deleteSection,
        deleteLecture
    };
};