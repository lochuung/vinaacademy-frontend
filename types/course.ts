import { BaseDto } from "./api-response";

export type CourseLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type CourseStatus = 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'REJECTED';

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