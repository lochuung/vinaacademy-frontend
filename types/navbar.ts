// Định nghĩa interface TrendingTopic cho các chủ đề thịnh hành trong một danh mục con
export interface TrendingTopic {
    name: string;      // Tên chủ đề thịnh hành
    link: string;      // Đường dẫn đến chủ đề
    students: string;  // Số lượng học viên hoặc mức độ quan tâm (ví dụ: "50K+")
}

// Định nghĩa interface SubCategory cho danh mục con, chứa thông tin và các chủ đề thịnh hành
export interface SubCategory {
    name: string;                    // Tên danh mục con
    link: string;                    // Đường dẫn đến danh mục con
    trendingTopics: TrendingTopic[]; // Danh sách các chủ đề thịnh hành trong danh mục con
}

// Định nghĩa interface Category cho danh mục, chứa tên, đường dẫn và danh sách các danh mục con
export interface Category {
    name: string;                   // Tên danh mục (ví dụ: "Lập trình", "Thiết kế")
    link: string;                   // Đường dẫn đến trang danh mục
    subCategories: SubCategory[];   // Danh sách các danh mục con bên trong danh mục
}

// Định nghĩa interface CartItem cho các sản phẩm trong giỏ hàng
export interface CartItem {
    id: number;              // ID duy nhất của khoá học
    name: string;            // Tên khoá học
    price: string;           // Giá bán hiện tại (ví dụ: "599K")
    image: string;           // Đường dẫn hình ảnh của khoá học
    instructor?: string;     // Tên giảng viên (tùy chọn)
    originalPrice?: string;  // Giá gốc trước giảm giá (tùy chọn)
    discount?: number;       // Phần trăm giảm giá (tùy chọn, ví dụ: 20, 50)
}

// Định nghĩa interface LearningCourse cho khoá học đang học, chứa thông tin tiến độ cũng như các chi tiết khác
export interface LearningCourse {
    id: number;                // ID khoá học
    name: string;              // Tên khoá học
    progress: number;          // Tiến độ hoàn thành (%)
    image: string;             // Đường dẫn hình ảnh của khoá học
    instructor?: string;       // Tên giảng viên (tùy chọn)
    lastAccessed?: string;     // Ngày truy cập cuối cùng (tùy chọn)
    totalLessons?: number;     // Tổng số bài học trong khoá học (tùy chọn)
    completedLessons?: number; // Số bài học đã hoàn thành (tùy chọn)
    certificateAvailable?: boolean; // Cho biết liệu có chứng chỉ sau khi hoàn thành khoá học hay không (tùy chọn)
}