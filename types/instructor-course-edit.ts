// Kế thừa từ useCourseContent.ts để đảm bảo tính nhất quán
export interface Lecture {
    id: string;
    title: string;
    type: string; // Sử dụng lowercase của LessonType ('video', 'reading', 'quiz')
    duration?: number;
    content?: string;
    order: number; // Tương đương với orderIndex trong backend
}

export interface Section {
    id: string;
    title: string;
    order: number; // Tương đương với orderIndex trong backend
    lectures: Lecture[];
}