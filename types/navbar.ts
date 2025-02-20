export interface TrendingTopic {
    name: string;
    link: string;
    students: string;
}

export interface SubCategory {
    name: string;
    link: string;
    trendingTopics: TrendingTopic[];
}

export interface Category {
    name: string;
    link: string;
    subCategories: SubCategory[];
}

export interface CartItem {
    id: number;
    name: string;
    price: string;
    image: string;
    instructor?: string;
    originalPrice?: string;
    discount?: number;
}

export interface LearningCourse {
    id: number;
    name: string;
    progress: number;
    image: string;
    instructor?: string;
    lastAccessed?: string;
    totalLessons?: number;
    completedLessons?: number;
    certificateAvailable?: boolean;
}