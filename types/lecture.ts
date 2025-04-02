// Cập nhật interface Lecture

export interface Resource {
    id: string;
    title: string;
    type: string;
    url: string;
}

// Quiz related types
export interface QuizOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

export type QuestionType = 'single_choice' | 'multiple_choice' | 'true_false' | 'text';

export interface QuizQuestion {
    id: string;
    text: string;
    type: QuestionType;
    options: QuizOption[];
    explanation?: string;
    points: number;
    isRequired: boolean;
}

export interface QuizSettings {
    randomizeQuestions: boolean;
    showCorrectAnswers: boolean;
    allowRetake: boolean;
    requirePassingScore: boolean;
    passingScore: number; // Percentage
    timeLimit?: number; // Minutes
}

export interface Quiz {
    questions: QuizQuestion[];
    settings: QuizSettings;
    totalPoints: number;
}

// Cập nhật LectureType và Lesson để đảm bảo bao gồm tất cả các field cần thiết
export type LectureType = 'video' | 'reading' | 'quiz' | 'assignment';

export interface Lecture {
    id: string;
    title: string;
    type: LectureType;
    description: string;
    duration: string;

    // Các trường tùy chọn cho mọi loại bài học
    isCompleted?: boolean;
    isCurrent?: boolean;
    resources?: Resource[];

    // Các trường cho video
    videoUrl?: string;
    transcript?: string;

    // Các trường cho reading
    textContent?: string;

    // Các trường cho quiz
    quiz?: Quiz;

    // Các trường cho assignment
    assignmentDetails?: {
        instructions: string;
        deadline: string;
        maxPoints: number;
        submissionType: string;
        allowedFileTypes: string[];
        resources: Resource[];
    };
}

// Phần (Section) trong khóa học
export interface Section {
    id: string;
    title: string;
    lectures: Lecture[];
}

// Course structure
export interface Course {
    id: string;
    title: string;
    currentLecture: Lecture;
    sections: Section[];
    progress: number; // Phần trăm hoàn thành khóa học
}