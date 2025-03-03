import { NavItem } from '../types';

// Định nghĩa kiểu dữ liệu cho một khóa học
export type Course = {
    photo_url: string;     // URL hình ảnh của khóa học
    name: string;          // Tên khóa học
    description: string;   // Mô tả khóa học
    created_at: string;    // Ngày tạo khóa học
    price: number;         // Giá của khóa học
    id: number;            // ID duy nhất của khóa học
    category: string;      // Danh mục khóa học
    updated_at: string;    // Ngày cập nhật khóa học
};

// Info: Dữ liệu dưới đây được sử dụng cho thanh điều hướng (sidebar) 
// và Cmd K bar.

// Mảng chứa các mục điều hướng cho sidebar
export const navItems: NavItem[] = [
    {
        title: 'Dashboard',               // Tiêu đề mục điều hướng
        url: '/dashboard/overview',       // Đường dẫn liên kết khi click vào mục này
        icon: 'dashboard',                // Tên icon đại diện cho mục Dashboard
        isActive: false,                  // Trạng thái hoạt động của mục (mặc định là false)
        shortcut: ['d', 'd'],             // Phím tắt để truy cập nhanh mục Dashboard
        items: []                         // Không có mục con (child items)
    },
    {
        title: 'Courses',                 // Tiêu đề của mục "Courses"
        url: '/dashboard/courses',        // Đường dẫn khi click vào "Courses"
        icon: 'product',                  // Icon đại diện cho "Courses"
        shortcut: ['p', 'p'],             // Phím tắt cho "Courses"
        isActive: false,                  // Trạng thái hoạt động mặc định
        items: []                         // Không có mục con
    },
    {
        title: 'Users',                   // Tiêu đề của mục "Users"
        url: '/dashboard/users',          // Đường dẫn khi click vào "Users"
        icon: 'kanban',                   // Icon đại diện cho "Users"
        shortcut: ['k', 'k'],             // Phím tắt cho "Users"
        isActive: false,                  // Trạng thái mặc định
        items: []                         // Không có mục con
    }
];

// Định nghĩa giao diện cho thông tin người dùng liên quan đến giao dịch bán hàng
export interface SaleUser {
    id: number;       // ID duy nhất của người dùng
    name: string;     // Tên người dùng
    email: string;    // Email của người dùng
    amount: string;   // Số tiền giao dịch (định dạng chuỗi)
    image: string;    // URL hình ảnh đại diện của người dùng
    initials: string; // Chữ viết tắt của tên người dùng
}

// Dữ liệu về giao dịch bán hàng gần đây của người dùng
export const recentSalesData: SaleUser[] = [
    {
        id: 1,
        name: 'Olivia Martin',
        email: 'olivia.martin@email.com',
        amount: '+$1,999.00',
        image: 'https://api.slingacademy.com/public/sample-users/1.png',
        initials: 'OM'
    },
    {
        id: 2,
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        amount: '+$39.00',
        image: 'https://api.slingacademy.com/public/sample-users/2.png',
        initials: 'JL'
    },
    {
        id: 3,
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        amount: '+$299.00',
        image: 'https://api.slingacademy.com/public/sample-users/3.png',
        initials: 'IN'
    },
    {
        id: 4,
        name: 'William Kim',
        email: 'will@email.com',
        amount: '+$99.00',
        image: 'https://api.slingacademy.com/public/sample-users/4.png',
        initials: 'WK'
    },
    {
        id: 5,
        name: 'Sofia Davis',
        email: 'sofia.davis@email.com',
        amount: '+$39.00',
        image: 'https://api.slingacademy.com/public/sample-users/5.png',
        initials: 'SD'
    }
];