import { Section } from '@/types/instructor-course-edit';

// Giả lập dữ liệu nội dung khóa học
export const mockSections: Section[] = [
    {
        id: "s1",
        title: "Giới thiệu",
        order: 1,
        lectures: [
            {
                id: "l1",
                title: "Giới thiệu về khóa học",
                type: "video",
                duration: 320, // seconds
                isPublished: true,
                order: 1
            },
            {
                id: "l2",
                title: "Cài đặt môi trường phát triển",
                type: "text",
                isPublished: true,
                order: 2
            }
        ]
    },
    {
        id: "s2",
        title: "JavaScript cơ bản",
        order: 2,
        lectures: [
            {
                id: "l3",
                title: "Biến và kiểu dữ liệu",
                type: "video",
                duration: 745, // seconds
                isPublished: true,
                order: 1
            },
            {
                id: "l4",
                title: "Cấu trúc điều khiển",
                type: "video",
                duration: 830, // seconds
                isPublished: true,
                order: 2
            },
            {
                id: "l5",
                title: "Bài tập thực hành",
                type: "file",
                isPublished: true,
                order: 3
            }
        ]
    },
    {
        id: "s3",
        title: "ES6 và JavaScript hiện đại",
        order: 3,
        lectures: [
            {
                id: "l6",
                title: "Arrow functions",
                type: "video",
                duration: 520, // seconds
                isPublished: false,
                order: 1
            },
            {
                id: "l7",
                title: "Destructuring",
                type: "video",
                duration: 635, // seconds
                isPublished: false,
                order: 2
            }
        ]
    }
];