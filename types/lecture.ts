// types/lecture.ts

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

export interface QuizQuestion {
    id: string;
    text: string;
    type: 'multiple_choice' | 'single_choice' | 'true_false' | 'text';
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
}

export interface Quiz {
    questions: QuizQuestion[];
    settings: QuizSettings;
    totalPoints?: number;
}

export interface Lecture {
    id: string;
    title: string;
    type: 'video' | 'text' | 'quiz' | 'assignment';
    description: string;
    videoUrl?: string;
    textContent?: string;
    duration?: number; // seconds
    isPublished: boolean;
    isPreviewable: boolean;
    isDownloadable: boolean;
    isRequired: boolean;
    resources: Resource[];
    quiz?: Quiz; // Added for quiz type lectures
}

// Mẫu dữ liệu bài giảng để phát triển UI
export const mockLecture: Lecture = {
    id: "l3",
    title: "Biến và kiểu dữ liệu trong JavaScript",
    type: "video",
    description: "Trong bài giảng này, chúng ta sẽ tìm hiểu về các loại biến và kiểu dữ liệu trong JavaScript. Bạn sẽ học cách khai báo biến với let, const, và var, cũng như hiểu về các kiểu dữ liệu cơ bản như string, number, boolean, null, undefined, object và symbol.",
    videoUrl: "https://example.com/video.mp4",
    textContent: "",
    duration: 745, // seconds
    isPublished: false,
    isPreviewable: false,
    isDownloadable: false,
    isRequired: true,
    resources: [
        {
            id: "r1",
            title: "Slide bài giảng",
            type: "pdf",
            url: "https://example.com/slides.pdf"
        },
        {
            id: "r2",
            title: "Code mẫu",
            type: "zip",
            url: "https://example.com/code.zip"
        }
    ]
};

// Sample quiz data
export const sampleQuiz: Quiz = {
    questions: [
        {
            id: "q1",
            text: "JavaScript là ngôn ngữ lập trình hướng đối tượng đúng không?",
            type: "true_false",
            options: [
                { id: "o1", text: "Đúng", isCorrect: true },
                { id: "o2", text: "Sai", isCorrect: false }
            ],
            explanation: "JavaScript là ngôn ngữ lập trình hướng đối tượng dựa trên prototype.",
            points: 1,
            isRequired: true
        },
        {
            id: "q2",
            text: "Đâu là cách khai báo biến hằng số trong JavaScript?",
            type: "single_choice",
            options: [
                { id: "o3", text: "var name = 'John'", isCorrect: false },
                { id: "o4", text: "let name = 'John'", isCorrect: false },
                { id: "o5", text: "const name = 'John'", isCorrect: true },
                { id: "o6", text: "static name = 'John'", isCorrect: false }
            ],
            explanation: "const được sử dụng để khai báo hằng số trong JavaScript, giá trị của nó không thể thay đổi sau khi gán.",
            points: 2,
            isRequired: true
        },
        {
            id: "q3",
            text: "Những kiểu dữ liệu nào là kiểu nguyên thủy (primitive) trong JavaScript?",
            type: "multiple_choice",
            options: [
                { id: "o7", text: "String", isCorrect: true },
                { id: "o8", text: "Number", isCorrect: true },
                { id: "o9", text: "Array", isCorrect: false },
                { id: "o10", text: "Object", isCorrect: false },
                { id: "o11", text: "Boolean", isCorrect: true },
                { id: "o12", text: "Function", isCorrect: false }
            ],
            explanation: "JavaScript có 7 kiểu dữ liệu nguyên thủy: String, Number, Boolean, null, undefined, Symbol, và BigInt. Array, Object, và Function là các kiểu dữ liệu tham chiếu.",
            points: 3,
            isRequired: true
        },
        {
            id: "q4",
            text: "Giải thích sự khác nhau giữa let và var trong JavaScript.",
            type: "text",
            options: [],
            explanation: "var có phạm vi function-scoped, trong khi let có phạm vi block-scoped. Biến được khai báo với var sẽ bị hoisted lên đầu phạm vi, còn let thì không.",
            points: 5,
            isRequired: false
        }
    ],
    settings: {
        randomizeQuestions: false,
        showCorrectAnswers: true,
        allowRetake: true,
        requirePassingScore: true,
        passingScore: 70
    },
    totalPoints: 11
};

// Sample quiz lecture
export const quizLectureSample: Lecture = {
    id: "l4",
    title: "Kiểm tra kiến thức về JavaScript cơ bản",
    type: "quiz",
    description: "Bài kiểm tra nhanh để đánh giá hiểu biết của bạn về biến và kiểu dữ liệu trong JavaScript.",
    isPublished: false,
    isPreviewable: false,
    isDownloadable: false,
    isRequired: true,
    resources: [],
    quiz: sampleQuiz
};