import { CartItem, LearningCourse } from '@/types/navbar';

// Mảng chứa các sản phẩm có trong giỏ hàng ban đầu (initial cart items)
export const initialCartItems: CartItem[] = [
    {
        id: 1,                                   // ID duy nhất của khoá học
        name: "Complete React Developer Course", // Tên khoá học
        price: "599K",                           // Giá bán hiện tại
        image: "/images/courses/react.jpg",      // Đường dẫn hình ảnh khoá học
        instructor: "John Doe",                  // Tên giảng viên
        originalPrice: "1,199K",                 // Giá gốc trước khi giảm giá
        discount: 50                             // Phần trăm giảm giá (50%)
    },
    {
        id: 2,
        name: "Advanced TypeScript Masterclass",
        price: "799K",
        image: "/images/courses/typescript.jpg",
        instructor: "Jane Smith",
        originalPrice: "999K",
        discount: 20                             // Giảm giá 20%
    }
];

// Mảng chứa các khoá học đang học ban đầu (initial learning courses)
export const initialLearningCourses: LearningCourse[] = [
    {
        id: 1,                                       // ID khoá học
        name: "JavaScript Fundamentals",             // Tên khoá học
        progress: 75,                                // Tiến độ hoàn thành (%)
        image: "/images/courses/javascript.jpg",     // Đường dẫn hình ảnh khoá học
        instructor: "Alex Johnson",                  // Tên giảng viên
        lastAccessed: "2024-02-19",                    // Ngày truy cập cuối cùng
        totalLessons: 48,                            // Tổng số bài học
        completedLessons: 36,                        // Số bài học đã hoàn thành
        certificateAvailable: true                   // Có chứng chỉ sau khi hoàn thành hay không
    },
    {
        id: 2,
        name: "Node.js Backend Development",
        progress: 30,                                // Tiến độ hoàn thành 30%
        image: "/images/courses/nodejs.jpg",         // Hình ảnh khoá học
        instructor: "Sarah Wilson",                  // Tên giảng viên
        lastAccessed: "2024-02-20",                    // Ngày truy cập cuối cùng
        totalLessons: 56,                            // Tổng số bài học của khoá học
        completedLessons: 17,                        // Số bài học đã hoàn thành
        certificateAvailable: false                  // Không có chứng chỉ sau khi hoàn thành
    }
];