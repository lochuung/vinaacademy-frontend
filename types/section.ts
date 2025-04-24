import { LessonDto } from './lesson';

/**
 * DTO cho Section từ backend
 */
export interface SectionDto {
    id: string;
    title: string;
    orderIndex: number;
    lessonCount: number;
    courseId: string;
    courseName: string;
    lessons?: LessonDto[];
}

/**
 * Request để tạo hoặc cập nhật Section
 */
export interface SectionRequest {
    title: string;
    courseId: string;
    orderIndex: number;
}