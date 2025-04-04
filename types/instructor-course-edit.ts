export interface Lecture {
    id: string;
    title: string;
    type: 'video' | 'text' | 'file' | 'quiz';
    duration?: number; // seconds
    isPublished: boolean;
    order: number;
}

export interface Section {
    id: string;
    title: string;
    order: number;
    lectures: Lecture[];
}