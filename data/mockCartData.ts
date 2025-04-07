import {CartItem} from '@/types/navbar';

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

