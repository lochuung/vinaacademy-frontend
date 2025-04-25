// Adapter for converting between SectionDisplay from useCourseContent 
// and Section from instructor-course-edit types
import { LectureDisplay, SectionDisplay } from '@/components/instructor/courses/edit-course-content/hooks/useCourseContent';
import { Lecture, Section } from '@/types/instructor-course-edit';

/**
 * Converts a LectureDisplay to a Lecture with required isPublished property
 * @param lectureDisplay LectureDisplay from useCourseContent hook
 * @returns Lecture compatible with instructor-course-edit types
 */
export const adaptLectureDisplayToLecture = (lectureDisplay: LectureDisplay): Lecture => {
    return {
        id: lectureDisplay.id,
        title: lectureDisplay.title,
        type: lectureDisplay.type,
        duration: lectureDisplay.duration,
        content: lectureDisplay.content,
        order: lectureDisplay.order,
        isPublished: lectureDisplay.isPublished ?? false // Default to false if not provided
    };
};

/**
 * Converts a SectionDisplay to a Section
 * @param sectionDisplay SectionDisplay from useCourseContent hook
 * @returns Section compatible with instructor-course-edit types
 */
export const adaptSectionDisplayToSection = (sectionDisplay: SectionDisplay): Section => {
    return {
        id: sectionDisplay.id,
        title: sectionDisplay.title,
        order: sectionDisplay.order,
        lectures: sectionDisplay.lectures.map(adaptLectureDisplayToLecture)
    };
};

/**
 * Converts an array of SectionDisplay to an array of Section
 * @param sectionsDisplay Array of SectionDisplay from useCourseContent hook
 * @returns Array of Section compatible with instructor-course-edit types
 */
export const adaptSectionDisplaysToSections = (sectionsDisplay: SectionDisplay[]): Section[] => {
    return sectionsDisplay.map(adaptSectionDisplayToSection);
};