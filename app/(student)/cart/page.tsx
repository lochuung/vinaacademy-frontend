import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Star, StarHalf, Tag } from 'lucide-react';

export default function Cart() {
    const cartItems = [
        {
            id: 1,
            name: "ReactJS cùng Hữu Lộc",
            price: 250000,
            originalPrice: 500000,
            instructor: "Hữu Lộc",
            rating: 4.5,
            totalStudents: 1234,
            totalHours: 12.5,
            lectures: 120,
            level: "Trung cấp",
            image: "/images/courses/react.jpg"
        },
        {
            id: 2,
            name: "NextJS cùng Trí Hùng",
            price: 450000,
            originalPrice: 900000,
            instructor: "Trí Hùng",
            rating: 4.7,
            totalStudents: 2345,
            totalHours: 15,
            lectures: 150,
            level: "Nâng cao",
            image: "/images/courses/react.jpg"
        },
        {
            id: 3,
            name: "Spring cùng Mỹ Linh",
            price: 650000,
            originalPrice: 1300000,
            instructor: "Mỹ Linh",
            rating: 4.8,
            totalStudents: 3456,
            totalHours: 20,
            lectures: 200,
            level: "Sơ cấp",
            image: "/images/courses/react.jpg"
        }
    ];

    return (
        <div className="container mx-auto py-6 px-4">
            <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>

            {cartItems.length === 0 ? (
                // Empty Cart Message
                <div className="min-h-[0px] flex items-center justify-center w-full">
                    <div className="bg-white p-28 rounded-lg text-center w-full max-w shadow-xl">
                        <p className="text-gray-600 text-2xl mb-4">Giỏ hàng của bạn đang trống</p>
                        <Button
                            className="bg-black hover:bg-gray-900 text-white text-sm px-8 py-3"
                            asChild
                        >
                            <Link href="/courses">
                                Tiếp tục mua sắm
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
                // Cart with Items Layout
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Cart Content */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
                                    <div className="flex-shrink-0 w-32 h-32 relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="rounded object-cover"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <Link href={`/courses/${item.id}`}>
                                            <h3 className="font-semibold text-lg hover:underline">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-gray-600">Giảng viên: {item.instructor}</p>

                                        {/* Rating and Stars Row */}
                                        <div className="flex items-center text-sm text-gray-600 mt-1">
                                            <div className="flex items-center">
                                                <span>{item.rating}</span>
                                                {[...Array(5)].map((_, index) => {
                                                    const starValue = index + 1;
                                                    return (
                                                        <span key={index} className="text-yellow-400 ml-1">
                                                            {starValue <= item.rating ? (
                                                                <Star className="w-4 h-4 fill-current" />
                                                            ) : starValue - 0.5 <= item.rating ? (
                                                                <StarHalf className="w-4 h-4 fill-current" />
                                                            ) : (
                                                                <Star className="w-4 h-4" />
                                                            )}
                                                        </span>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Students Count Row */}
                                        <div className="text-sm text-gray-600 mt-1">
                                            <span>{item.totalStudents.toLocaleString()} học viên</span>
                                        </div>

                                        {/* Course Details Row */}
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                            <span>{item.totalHours} giờ học</span>
                                            <span>•</span>
                                            <span>{item.lectures} bài giảng</span>
                                            <span>•</span>
                                            <span>{item.level}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons Column */}
                                    <div className="flex flex-col gap-2 min-w-[120px]">
                                        <button className="text-red-600 hover:text-red-800 hover:underline text-sm text-left w-fit">
                                            Xóa
                                        </button>
                                        <button className="text-black hover:text-gray-700 hover:underline text-sm text-left w-fit">
                                            Lưu lại sau
                                        </button>
                                        <button className="text-black hover:text-gray-700 hover:underline text-sm text-left w-fit">
                                            Thêm vào yêu thích
                                        </button>
                                    </div>

                                    {/* Price Column */}
                                    <div className="text-right min-w-[120px]">
                                        <div className="font-bold text-lg flex items-center justify-end gap-1">
                                            <span>{item.price.toLocaleString()}đ</span>
                                            <Tag className="w-4 h-4" />
                                        </div>
                                        <div className="text-sm text-gray-500 line-through">
                                            {item.originalPrice.toLocaleString()}đ
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
                            <h2 className="font-semibold mb-4">Tổng cộng:</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span>Giá gốc:</span>
                                    <span className="line-through text-gray-500">
                                        {cartItems.reduce((total, item) => total + item.originalPrice, 0).toLocaleString()}đ
                                    </span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Giá ưu đãi:</span>
                                    <span>
                                        {cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()}đ
                                    </span>
                                </div>
                                <Button className="w-full bg-black hover:bg-gray-900 text-white py-3 rounded-lg mt-4">
                                    Thanh toán
                                </Button>
                                <div className="text-xs text-center text-gray-500 mt-4">
                                    Đảm bảo hoàn tiền trong 30 ngày
                                </div>

                                {/* Promotions Section */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <h3 className="font-semibold text-sm mb-3">Khuyến mãi</h3>
                                    <div className="flex flex-col gap-3">
                                        <input
                                            type="text"
                                            placeholder="Nhập mã giảm giá"
                                            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm 
                                            focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                                        />
                                        <Button
                                            className="w-full bg-white hover:bg-gray-50 text-black border border-black text-sm py-2"
                                        >
                                            Áp dụng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}