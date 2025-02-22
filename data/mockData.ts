import { CartItem, LearningCourse } from '@/types/navbar';

export const initialCartItems: CartItem[] = [
    {
        id: 1,
        name: "Complete React Developer Course",
        price: "599K",
        image: "/images/courses/react.jpg",
        instructor: "John Doe",
        originalPrice: "1,199K",
        discount: 50
    },
    {
        id: 2,
        name: "Advanced TypeScript Masterclass",
        price: "799K",
        image: "/images/courses/typescript.jpg",
        instructor: "Jane Smith",
        originalPrice: "999K",
        discount: 20
    }
];

export const initialLearningCourses: LearningCourse[] = [
    {
        id: 1,
        name: "JavaScript Fundamentals",
        progress: 75,
        image: "/images/courses/javascript.jpg",
        instructor: "Alex Johnson",
        lastAccessed: "2024-02-19",
        totalLessons: 48,
        completedLessons: 36,
        certificateAvailable: true
    },
    {
        id: 2,
        name: "Node.js Backend Development",
        progress: 30,
        image: "/images/courses/nodejs.jpg",
        instructor: "Sarah Wilson",
        lastAccessed: "2024-02-20",
        totalLessons: 56,
        completedLessons: 17,
        certificateAvailable: false
    }
];