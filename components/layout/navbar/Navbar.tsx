"use client"; // Chỉ định rằng file này sẽ được render phía client
import { useState } from "react"; // Import hook useState từ react
import Link from "next/link"; // Import component Link từ next/link
import { CartItem, LearningCourse } from '@/types/navbar'; // Import các kiểu dữ liệu CartItem và LearningCourse từ thư mục types/navbar
import { initialCartItems, initialLearningCourses } from '@/data/mockData'; // Import dữ liệu mock ban đầu cho cartItems và learningCourses
import ExploreDropdown from "./ExploreDropdown"; // Import component ExploreDropdown
import SearchBar from "./SearchBar"; // Import component SearchBar
import UserLearning from "./UserLearning"; // Import component UserLearning
import UserMenu from "./UserMenu"; // Import component UserMenu
import ShoppingCart from "./ShoppingCart"; // Import component ShoppingCart
import NavigationLinks from "./NavigationLinks"; // Import component NavigationLinks
import SubNavbar from "./SubNavbar"; // Import component SubNavbar
import { categoriesData } from "@/data/categories"; // Import dữ liệu categories từ thư mục data
import NotificationDropdown from "./NotificationDropdown"; // Import component NotificationDropdown

// Định nghĩa component Navbar
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // Khởi tạo state isLoggedIn với giá trị mặc định là true
    const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems); // Khởi tạo state cartItems với dữ liệu mock ban đầu
    const [learningCourses, setLearningCourses] = useState<LearningCourse[]>(initialLearningCourses); // Khởi tạo state learningCourses với dữ liệu mock ban đầu

    // Định nghĩa hàm handleRemoveFromCart để xử lý khi người dùng xóa một mục khỏi giỏ hàng
    const handleRemoveFromCart = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id)); // Cập nhật state cartItems bằng cách loại bỏ mục có id tương ứng
    };

    return (
        <div>
            <nav className="bg-white text-black shadow-md border-b-2 border-black p-4"> {/* Thanh điều hướng */}
                <div className="max-w-7xl mx-auto flex justify-between items-center"> {/* Container chính của Navbar */}
                    <Link href="/" className="text-2xl font-bold">
                        VINA ACADEMY {/* Liên kết đến trang chủ với tên VINA ACADEMY */}
                    </Link>
                    <div className="hidden md:flex space-x-6"> {/* Dropdown Khám phá, chỉ hiển thị trên màn hình md trở lên */}
                        <ExploreDropdown categories={categoriesData} /> {/* Hiển thị ExploreDropdown với dữ liệu categories */}
                    </div>
                    <SearchBar /> {/* Hiển thị SearchBar */}
                    <NavigationLinks /> {/* Hiển thị NavigationLinks */}
                    <div className="flex items-center space-x-4"> {/* Container cho các mục bên phải của Navbar */}
                        {isLoggedIn && (
                            <> {/* Nếu người dùng đã đăng nhập, hiển thị UserLearning và NotificationDropdown */}
                                <UserLearning courses={learningCourses} /> {/* Hiển thị UserLearning với dữ liệu learningCourses */}
                                <NotificationDropdown /> {/* Hiển thị dropdown thông báo */}
                            </>
                        )}
                        <ShoppingCart items={cartItems} onRemoveItem={handleRemoveFromCart} /> {/* Hiển thị ShoppingCart với dữ liệu cartItems và hàm handleRemoveFromCart */}
                        <UserMenu isLoggedIn={isLoggedIn} /> {/* Hiển thị UserMenu với trạng thái đăng nhập */}
                    </div>
                </div>
            </nav>
            <SubNavbar /> {/* Hiển thị SubNavbar */}
        </div>
    );
};

export default Navbar; // Xuất component Navbar để sử dụng ở nơi khác