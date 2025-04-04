// Định nghĩa kiểu dữ liệu cho các khóa học
export interface CourseModule {
    id: number;
    title: string;
    totalLessons: number;
    completedLessons: number;
    duration: string;
    lessons: CourseLesson[];
}

export interface CourseLesson {
    id: number;
    title: string;
    duration: string;
    isCompleted: boolean;
    type: "video" | "quiz" | "assignment" | "reading";
}

export interface CourseDetailData {
    id: number;
    name: string;
    instructor: string;
    totalModules: number;
    completedModules: number;
    overallProgress: number;
    lastAccessed: string;
    modules: CourseModule[];
}

// Dữ liệu mẫu cho khóa học
// Dữ liệu mẫu cho trang "Khóa học của tôi"
export const mockEnrolledCourses = [
    {
        id: 1,
        name: "Lập trình React.js cho người mới bắt đầu",
        instructor: "Nguyễn Văn A",
        category: "Lập trình Frontend",
        image: "/images/courses/react.jpg",
        progress: 42,
        lastAccessed: "25/03/2025",
        completedLessons: 12,
        totalLessons: 24
    },
    {
        id: 2,
        name: "Node.js và Express: Xây dựng REST API",
        instructor: "Trần Văn B",
        category: "Lập trình Backend",
        image: "/images/courses/react.jpg",
        progress: 78,
        lastAccessed: "24/03/2025",
        completedLessons: 14,
        totalLessons: 18
    },
    {
        id: 3,
        name: "Machine Learning cơ bản với Python",
        instructor: "Lê Thị C",
        category: "Trí tuệ nhân tạo",
        image: "/images/courses/react.jpg",
        progress: 100,
        lastAccessed: "20/03/2025",
        completedLessons: 16,
        totalLessons: 16
    },
    {
        id: 4,
        name: "UI/UX Design: Từ cơ bản đến nâng cao",
        instructor: "Phạm Thị D",
        category: "UI/UX Design",
        image: "/images/courses/react.jpg",
        progress: 65,
        lastAccessed: "23/03/2025",
        completedLessons: 13,
        totalLessons: 20
    },
    {
        id: 5,
        name: "Lập trình Mobile với Flutter",
        instructor: "Hoàng Văn E",
        category: "Lập trình Mobile",
        image: "/images/courses/react.jpg",
        progress: 25,
        lastAccessed: "22/03/2025",
        completedLessons: 5,
        totalLessons: 20
    },
    {
        id: 6,
        name: "SEO và Digital Marketing cơ bản",
        instructor: "Võ Thị F",
        category: "Digital Marketing",
        image: "/images/courses/react.jpg",
        progress: 100,
        lastAccessed: "15/03/2025",
        completedLessons: 12,
        totalLessons: 12
    }
];

// Dữ liệu mẫu chi tiết của khóa học
export const mockCourseDetail: CourseDetailData = {
    id: 1,
    name: "Lập trình React.js cho người mới bắt đầu",
    instructor: "Nguyễn Văn A",
    totalModules: 5,
    completedModules: 2,
    overallProgress: 42,
    lastAccessed: "25/03/2025 15:30",
    modules: [
        {
            id: 1,
            title: "Module 1: Giới thiệu về React.js",
            totalLessons: 4,
            completedLessons: 4,
            duration: "1h 30m",
            lessons: [
                {
                    id: 101,
                    title: "Bài 1: React.js là gì?",
                    duration: "15m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 102,
                    title: "Bài 2: Cài đặt môi trường phát triển",
                    duration: "20m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 103,
                    title: "Bài 3: JSX và cú pháp cơ bản",
                    duration: "25m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 104,
                    title: "Bài kiểm tra: Kiến thức cơ bản về React",
                    duration: "30m",
                    isCompleted: true,
                    type: "quiz"
                }
            ]
        },
        {
            id: 2,
            title: "Module 2: Components và Props",
            totalLessons: 5,
            completedLessons: 5,
            duration: "2h 15m",
            lessons: [
                {
                    id: 201,
                    title: "Bài 1: Functional Components",
                    duration: "20m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 202,
                    title: "Bài 2: Class Components",
                    duration: "25m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 203,
                    title: "Bài 3: Props và truyền dữ liệu",
                    duration: "30m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 204,
                    title: "Bài tập: Tạo component đơn giản",
                    duration: "45m",
                    isCompleted: true,
                    type: "assignment"
                },
                {
                    id: 205,
                    title: "Bài kiểm tra: Components và Props",
                    duration: "15m",
                    isCompleted: true,
                    type: "quiz"
                }
            ]
        },
        {
            id: 3,
            title: "Module 3: State và Lifecycle",
            totalLessons: 4,
            completedLessons: 3,
            duration: "2h",
            lessons: [
                {
                    id: 301,
                    title: "Bài 1: Giới thiệu về State",
                    duration: "25m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 302,
                    title: "Bài 2: useState Hook",
                    duration: "30m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 303,
                    title: "Bài 3: Lifecycle Methods",
                    duration: "35m",
                    isCompleted: true,
                    type: "video"
                },
                {
                    id: 304,
                    title: "Bài kiểm tra: State và Lifecycle",
                    duration: "30m",
                    isCompleted: false,
                    type: "quiz"
                }
            ]
        },
        {
            id: 4,
            title: "Module 4: Xử lý sự kiện và Forms",
            totalLessons: 4,
            completedLessons: 0,
            duration: "2h 30m",
            lessons: [
                {
                    id: 401,
                    title: "Bài 1: Xử lý sự kiện trong React",
                    duration: "30m",
                    isCompleted: false,
                    type: "video"
                },
                {
                    id: 402,
                    title: "Bài 2: Controlled Components",
                    duration: "35m",
                    isCompleted: false,
                    type: "video"
                },
                {
                    id: 403,
                    title: "Bài 3: Form Validation",
                    duration: "40m",
                    isCompleted: false,
                    type: "video"
                },
                {
                    id: 404,
                    title: "Bài tập: Tạo form đăng ký",
                    duration: "45m",
                    isCompleted: false,
                    type: "assignment"
                }
            ]
        },
        {
            id: 5,
            title: "Module 5: Routing và Navigation",
            totalLessons: 3,
            completedLessons: 0,
            duration: "1h 45m",
            lessons: [
                {
                    id: 501,
                    title: "Bài 1: Giới thiệu React Router",
                    duration: "25m",
                    isCompleted: false,
                    type: "video"
                },
                {
                    id: 502,
                    title: "Bài 2: Routing trong Single Page Applications",
                    duration: "35m",
                    isCompleted: false,
                    type: "video"
                },
                {
                    id: 503,
                    title: "Bài 3: Navigation và Route Params",
                    duration: "45m",
                    isCompleted: false,
                    type: "video"
                }
            ]
        }]
};