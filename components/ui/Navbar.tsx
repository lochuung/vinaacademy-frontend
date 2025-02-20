"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSearch, FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { ChevronRight, Flame } from "lucide-react";
import SearchBar from "./SearchBar";
import SubNavbar from "./SubNavbar";


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const categories = [
        {
            name: "Lập trình",
            link: "/categories/programming",
            subCategories: [
                {
                    name: "JavaScript",
                    link: "/categories/programming/javascript",
                    trendingTopics: [
                        { name: "React.js", link: "/topics/reactjs", students: "50K+" },
                        { name: "Next.js", link: "/topics/nextjs", students: "30K+" },
                        { name: "Node.js", link: "/topics/nodejs", students: "40K+" },
                    ]
                },
                {
                    name: "Python",
                    link: "/categories/programming/python",
                    trendingTopics: [
                        { name: "Machine Learning", link: "/topics/ml", students: "45K+" },
                        { name: "Django", link: "/topics/django", students: "25K+" },
                        { name: "Data Science", link: "/topics/data-science", students: "35K+" },
                    ]
                },
                {
                    name: "Java",
                    link: "/categories/programming/java",
                    trendingTopics: [
                        { name: "Spring Boot", link: "/topics/spring", students: "30K+" },
                        { name: "Android Dev", link: "/topics/android", students: "40K+" },
                    ]
                }
            ]
        },
        {
            name: "Thiết kế",
            link: "/categories/design",
            subCategories: [
                {
                    name: "UI/UX Design",
                    link: "/categories/design/ui-ux",
                    trendingTopics: [
                        { name: "Figma Master", link: "/topics/figma", students: "35K+" },
                        { name: "Design System", link: "/topics/design-system", students: "20K+" },
                    ]
                },
                {
                    name: "Graphic Design",
                    link: "/categories/design/graphic",
                    trendingTopics: [
                        { name: "Adobe Photoshop", link: "/topics/photoshop", students: "45K+" },
                        { name: "Illustrator", link: "/topics/illustrator", students: "30K+" },
                    ]
                }
            ]
        }
    ];

    const [cartItems, setCartItems] = useState([
        { id: 1, name: "Khóa học React.js", price: "500K", image: "/images/react-course.jpg" },
        { id: 2, name: "Khóa học Next.js", price: "600K", image: "/images/next-course.jpg" }
    ]);

    const [learningCourses, setLearningCourses] = useState([
        { id: 1, name: "React.js từ A-Z", progress: 70, image: "/images/react-course.jpg" },
        { id: 2, name: "Next.js toàn tập", progress: 50, image: "/images/next-course.jpg" }
    ]);


    return (
        <div>
            <nav className="bg-white text-black shadow-md border-b-2 border-black p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold text-black">
                        VINA ACADEMY
                    </Link>

                    {/* Dropdown Khám phá */}
                    <div className="hidden md:flex space-x-6">
                        <div className="relative group">
                            <button className="hover:text-gray-600 py-2">
                                Khám phá
                            </button>
                            {/* Main dropdown menu */}
                            <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="py-2">
                                    {categories.map((category, index) => (
                                        <div key={index} className="relative group/item">
                                            <a
                                                href={category.link}
                                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                                            >
                                                {category.name}
                                                <ChevronRight className="w-4 h-4" />
                                            </a>
                                            {/* Second level dropdown */}
                                            <div className="absolute left-full top-0 w-56 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 -ml-2 z-50">
                                                <div className="py-2">
                                                    {category.subCategories.map((subCategory, subIndex) => (
                                                        <div key={subIndex} className="relative group/subitem">
                                                            <a
                                                                href={subCategory.link}
                                                                className="flex items-center justify-between px-4 py-2 hover:bg-gray-100"
                                                            >
                                                                {subCategory.name}
                                                                <ChevronRight className="w-4 h-4" />
                                                            </a>
                                                            {/* Third level dropdown - Trending Topics */}
                                                            <div className="absolute left-full top-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover/subitem:opacity-100 group-hover/subitem:visible transition-all duration-300 -ml-2 z-50">
                                                                <div className="p-4">
                                                                    <div className="flex items-center gap-2 mb-3 text-orange-500 font-medium">
                                                                        <Flame className="w-4 h-4" />
                                                                        <span>Chủ đề thịnh hành</span>
                                                                    </div>
                                                                    {subCategory.trendingTopics?.map((topic, topicIndex) => (
                                                                        <a
                                                                            key={topicIndex}
                                                                            href={topic.link}
                                                                            className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 rounded-md"
                                                                        >
                                                                            <span>{topic.name}</span>
                                                                            <span className="text-sm text-gray-500">{topic.students}</span>
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thanh tìm kiếm */}
                    <div className="relative flex items-center w-1/3">
                        <input
                            type="text"
                            placeholder="Tìm khóa học..."
                            className="w-full px-4 py-2 border border-black bg-white text-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
                        />
                        <FaSearch className="absolute right-3 text-black" />
                    </div>

                    {/* Liên kết điều hướng */}
                    <ul className="hidden md:flex space-x-s6">
                        <li><Link href="/blog" className="hover:text-gray-600">Blog</Link></li>
                    </ul>

                    {/* Nút đăng nhập / Menu người dùng / Giỏ hàng */}
                    <div className="flex items-center space-x-4">

                        {/* Dropdown My Learning */}
                        <div className="relative group">
                            <button className="flex items-center space-x-2 hover:text-gray-600">
                                <span>Khóa học của tôi</span>
                            </button>

                            {/* Dropdown nội dung */}
                            <div className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-3">Khóa học của tôi</h3>
                                    {learningCourses.length > 0 ? (
                                        <ul className="space-y-3">
                                            {learningCourses.map((course) => (
                                                <li key={course.id} className="flex items-center space-x-3 border-b pb-2">
                                                    <img src={course.image} alt={course.name} className="w-12 h-12 rounded-md" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold">{course.name}</p>
                                                        <p className="text-sm text-gray-500">{course.progress}% hoàn thành</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-gray-500">Bạn chưa học khóa nào</p>
                                    )}
                                    <div className="mt-4">
                                        <Link href="/my-learning" className="block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800">
                                            Xem tất cả
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Icon giỏ hàng */}
                        <div className="relative group">
                            <button className="relative">
                                <FaShoppingCart size={24} className="text-black hover:text-gray-600" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown giỏ hàng */}
                            <div className="absolute right-0 top-10 w-72 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-3">Giỏ hàng</h3>
                                    {cartItems.length > 0 ? (
                                        <ul className="space-y-3">
                                            {cartItems.map((item) => (
                                                <li key={item.id} className="flex items-center space-x-3 border-b pb-2">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md" />
                                                    <div className="flex-1">
                                                        <p className="text-sm font-semibold">{item.name}</p>
                                                        <p className="text-sm text-gray-500">{item.price}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-center text-gray-500">Giỏ hàng của bạn trống</p>
                                    )}
                                    <div className="mt-4">
                                        <Link href="/cart" className="block w-full text-center bg-black text-white py-2 rounded-md hover:bg-gray-800">
                                            Xem giỏ hàng
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Đăng nhập / Đăng ký */}
                        {isLoggedIn ? (
                            <Link href="/profile" className="flex items-center space-x-2">
                                <FaUserCircle size={24} className="text-black" />
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="px-4 py-2 border border-black text-black rounded hover:bg-gray-200">Đăng nhập</Link>
                                <Link href="/register" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800">Đăng ký</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <SubNavbar />
        </div>
    );
};

export default Navbar;
