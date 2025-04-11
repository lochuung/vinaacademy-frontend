export type CourseFile = File | null;

export interface CourseData {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: string;
    language: string;
    price: number;
    oldPrice: number;
    thumbnail: CourseFile;
    promo_video: CourseFile;
    discounted: boolean;
    subscription: boolean;
}

export interface Course {
    id: number;
    title: string;
    instructor: string;
    department: string;
    submittedDate: string;
    thumbnail: string;
    status: 'pending' | 'approved' | 'rejected';
    level: CourseLevel;
    slug: string;
}

export enum CourseLevel {
    BEGINNER = 'BEGINNER',
    INTERMEDIATE = 'INTERMEDIATE',
    ADVANCED = 'ADVANCED'
}


export interface PaginationData {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasMore: boolean;
}

export interface CoursesResponse {
    courses: Course[];
    pagination: PaginationData;
}

export type SortOption = 'newest' | 'oldest' | 'normal';

export type CourseSortOption = SortOption | string;

export type CourseSection = 'basic' | 'media' | 'pricing';

