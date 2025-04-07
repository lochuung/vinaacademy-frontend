import {BaseDto} from "./api-response";

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED';
export type LessonType = 'VIDEO' | 'READING' | 'QUIZ';
export type VideoStatus = 'PROCESSING' | 'READY' | 'FAILED';

export interface CourseDto extends BaseDto {
    id: string;
    image: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    level: CourseLevel;
    status: CourseStatus;
    language: string;
    categoryName: string;
    rating: number;
    totalRating: number;
    totalStudent: number;
    totalSection: number;
    totalLesson: number;
}

export interface Role {
    id: number;
    name: string;
    code: string;
}

export interface UserDto extends BaseDto {
    id: string;
    fullName: string;
    email: string;
    username: string;
    phone?: string;
    avatarUrl?: string;
    description?: string;
    isCollaborator: boolean;
    birthday?: string;
    roles: Role[];
    isActive: boolean;
}

export interface LessonDto extends BaseDto {
    id: string;
    title: string;
    type: LessonType;
    free: boolean;
    orderIndex: number;
    sectionId: string;
    sectionTitle: string;
    authorId: string;
    authorName: string;
    courseId: string;
    courseName: string;
    
    // Fields specific to lesson types
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

export interface SectionDto {
    id: string;
    title: string;
    orderIndex: number;
    lessonCount: number;
    courseId: string;
    courseName: string;
    lessons?: LessonDto[];
}

export interface CourseReviewDto {
    id: number;
    courseId: string;
    courseName: string;
    rating: number;
    review: string;
    userId: string;
    userFullName: string;
    createdDate: string;
    updatedDate: string;
}

export interface CourseDetailsResponse extends BaseDto {
    id: string;
    image: string;
    name: string;
    description: string;
    slug: string;
    price: number;
    level: CourseLevel;
    status: CourseStatus;
    language: string;
    categorySlug: string;
    categoryName: string;
    rating: number;
    totalRating: number;
    totalStudent: number;
    totalSection: number;
    totalLesson: number;
    
    // Additional fields for detailed view
    instructors: UserDto[];
    ownerInstructor: UserDto;
    sections: SectionDto[];
    reviews: CourseReviewDto[];
}

export interface CourseRequest {
    image?: string;
    name: string;
    description?: string;
    slug?: string;
    price?: number;
    level?: CourseLevel;
    status?: CourseStatus;
    language?: string;
    categoryId?: number;
    rating?: number;
    totalRating?: number;
    totalStudent?: number;
    totalSection?: number;
    totalLesson?: number;
}

export interface CourseSearchRequest {
    keyword?: string;
    categorySlug?: string;
    level?: CourseLevel;
    language?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    status?: CourseStatus;
}