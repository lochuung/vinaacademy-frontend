export type CourseFile = File | null;

export interface CourseData {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: string;
    language: string;
    price: string;
    thumbnail: CourseFile;
    promo_video: CourseFile;
    discounted: boolean;
    subscription: boolean;
}

export type CourseSection = 'basic' | 'media' | 'pricing';