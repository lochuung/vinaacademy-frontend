import { BaseDto } from "./api-response";
import { LessonType, VideoStatus } from "./course";

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
    free: boolean;
    orderIndex: number;

    // For Video lessons
    thumbnailUrl?: string;

    // For Reading lessons
    content?: string;

    // For Quiz lessons
    passPoint?: number;
    totalPoint?: number;
    duration?: number;
}
