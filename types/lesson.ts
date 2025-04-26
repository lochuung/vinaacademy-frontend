import { BaseDto } from "./api-response";
import { LessonType } from "./course";
import { VideoStatus } from "./video";

export interface LessonDto extends BaseDto {
    id: string; // UUID
    title: string;
    type: LessonType;
    free: boolean;
    orderIndex: number;
    sectionId: string; // UUID
    sectionTitle: string;
    authorId: string; // UUID
    authorName: string;
    courseId: string; // UUID
    courseName: string;
    description?: string; // HTML content for reading lessons

    // progress
    currentUserProgress?: LessonProgressDto;

    // For Video lessons
    thumbnailUrl?: string;
    status?: VideoStatus;
    videoUrl?: string;
    videoDuration?: number;

    // For Reading lessons
    content?: string;

    // For Quiz lessons
    passPoint?: number;
    totalPoint?: number;
    duration?: number;
}

export interface LessonRequest {
    title: string;
    sectionId: string; // UUID
    type: LessonType;
    description?: string;
    free?: boolean;
    orderIndex?: number; // Thêm orderIndex

    // For Video lessons
    thumbnailUrl?: string;
    videoUrl?: string;
    videoDuration?: number;
    status?: VideoStatus;

    // For Reading lessons
    content?: string;

    // For Quiz lessons
    passPoint?: number;
    totalPoint?: number;
    duration?: number;
}

export interface LessonProgressDto {
    lessonId: string; // UUID
    completed: boolean;
}
